// src/controllers/suratController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const multer = require('multer');
const path = require('path');

// --------------------------------------------------
// 1. KONFIGURASI MULTER
// --------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // ✅ Ekstrak nama field yang bersih (tanpa "files[...]")
    const cleanFieldname = file.fieldname.replace(/files\[|\]/g, '');
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    // ✅ Format: ktp-1234567890-123456.png
    cb(null, cleanFieldname + '-' + unique + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|png|jpg|jpeg/i;
    if (!allowed.test(path.extname(file.originalname))) {
      return cb(new Error("Format file harus PDF/JPG/PNG"));
    }
    cb(null, true);
  }
}).any();

// --------------------------------------------------
// 2. CREATE SURAT
// --------------------------------------------------

exports.createSurat = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(400).json({ success: false, error: err.message });
      }

      const { jenisSurat, data } = req.body;

      if (!jenisSurat) {
        return res.status(400).json({
          success: false,
          error: "Jenis surat tidak diberikan"
        });
      }

      // Parse data JSON dari frontend
      let parsedData = {};
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        console.error("JSON parse error:", e);
      }

      // --------------------------------------------------
      // 🔥 AMBIL SEMUA FILE YANG DIUPLOAD SECARA DINAMIS
      // --------------------------------------------------
      const fileMetadata = {};

      req.files.forEach(file => {
        // file.fieldname = "files[ktpAyah]" → kita potong jadi "ktpAyah"
        const key = file.fieldname.replace("files[", "").replace("]", "");

        fileMetadata[key] = {
          name: file.originalname,
          size: file.size,
          path: file.filename  // ✅ Sudah bersih: ktp-123456.png
        };
      });

      
      // --------------------------------------------------
      // Generate No Tiket
      // --------------------------------------------------
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const r = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const noTiket = `TIC-${y}${m}${d}-${r}`;

      // --------------------------------------------------
      // SIMPAN SEMUANYA KE DB
      // --------------------------------------------------
      const surat = await prisma.surat.create({
        data: {
          userId: parseInt(req.user.id),
          jenisSurat,
          noTiket,
          data: {
            ...parsedData,
            files: fileMetadata
          },
          status: "Belum Dikerjakan"
        }
      });

      return res.status(201).json({
        success: true,
        surat: {
          id: surat.id,
          jenisSurat: surat.jenisSurat,
          noTiket: surat.noTiket,
          tanggalPengajuan: surat.createdAt
        }
      });
    });

  } catch (err) {
    console.error("❌ Error createSurat:", err);
    res.status(500).json({ success: false, error: "Gagal mengajukan surat" });
  }
};

// --------------------------------------------------
// 3. GET MY SURAT
// --------------------------------------------------

exports.getMySurat = async (req, res) => {
  try {
    const suratList = await prisma.surat.findMany({
      where: { userId: parseInt(req.user.id) },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        noTiket: true,
        jenisSurat: true,
        status: true,
        catatanAdmin: true,
        waktuSelesai: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      suratList,
      total: suratList.length
    });

  } catch (error) {
    console.error('❌ Error fetching surat:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil data surat'
    });
  }
};

// --------------------------------------------------
// 4. GET SURAT BY ID
// --------------------------------------------------

exports.getSuratById = async (req, res) => {
  try {
    const { id } = req.params;

    const surat = await prisma.surat.findUnique({
      where: { id },
      select: {
        id: true,
        noTiket: true,
        jenisSurat: true,
        data: true,
        status: true,
        catatanAdmin: true,
        waktuSelesai: true,
        createdAt: true,
        updatedAt: true,
        userId: true
      }
    });

    if (!surat) {
      return res.status(404).json({ success: false, error: 'Surat tidak ditemukan' });
    }

    // Cek apakah surat milik user login
    if (surat.userId !== parseInt(req.user.id)) {
      return res.status(403).json({ success: false, error: 'Akses ditolak' });
    }

    // Hapus userId agar tidak tampil di frontend
    delete surat.userId;

    res.json({ success: true, surat });

  } catch (error) {
    console.error('❌ Error fetching surat by ID:', error);
    res.status(500).json({ success: false, error: 'Gagal memuat detail surat' });
  }
};
