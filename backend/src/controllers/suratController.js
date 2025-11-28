// src/controllers/suratController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadUserFile = require('../middleware/multerSuratSelesai');  // 💥 gunakan Cloudinary
const path = require('path');

// --------------------------------------------------
// 1. CREATE SURAT (WARGA UPLOAD FILE KE CLOUDINARY)
// --------------------------------------------------

exports.createSurat = async (req, res) => {
  try {
    uploadUserFile(req, res, async (err) => {
      if (err) {
        console.error("❌ Upload error (user):", err);
        return res.status(400).json({ success: false, error: err.message });
      }

      const { jenisSurat, data } = req.body;

      if (!jenisSurat) {
        return res.status(400).json({
          success: false,
          error: "Jenis surat tidak diberikan"
        });
      }

      let parsedData = {};
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        console.error("❌ JSON parse error:", e);
      }

      // ------------------------------
      // 💥 AMBIL FILE DARI CLOUDINARY
      // ------------------------------
      const fileMetadata = {};

      if (req.file) {
        fileMetadata["dokumenWarga"] = {
          name: req.file.originalname,
          size: req.file.size,
          url: req.file.path  // 💥 CLOUDINARY URL
        };
      }

      // ------------------------------
      // Generate No Tiket
      // ------------------------------
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const r = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const noTiket = `TIC-${y}${m}${d}-${r}`;

      // ------------------------------
      // SIMPAN KE DB
      // ------------------------------
      const surat = await prisma.surat.create({
        data: {
          userId: parseInt(req.user.id),
          jenisSurat,
          noTiket,
          data: {
            ...parsedData,
            files: fileMetadata  // 💥 Simpan URL Cloudinary
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
// 2. GET MY SURAT
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
// 3. GET SURAT BY ID
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
        userId: true,
        fileSuratSelesai: true,
        uploadedBy: true,
        uploadedAt: true
      }
    });

    if (!surat) {
      return res.status(404).json({ success: false, error: 'Surat tidak ditemukan' });
    }

    if (surat.userId !== parseInt(req.user.id)) {
      return res.status(403).json({ success: false, error: 'Akses ditolak' });
    }

    delete surat.userId;

    res.json({ success: true, surat });

  } catch (error) {
    console.error('❌ Error fetching surat by ID:', error);
    res.status(500).json({ success: false, error: 'Gagal memuat detail surat' });
  }
};

// --------------------------------------------------
// 4. DOWNLOAD SURAT SELESAI (NOW USE CLOUDINARY)
// --------------------------------------------------

exports.downloadSuratSelesai = async (req, res) => {
  try {
    const { id } = req.params;

    const surat = await prisma.surat.findUnique({
      where: { id }
    });

    if (!surat || !surat.fileSuratSelesai) {
      return res.status(404).json({
        success: false,
        error: 'Surat atau file tidak ditemukan'
      });
    }

    // 💥 Direct redirect ke Cloudinary
    return res.redirect(surat.fileSuratSelesai);

  } catch (error) {
    console.error('❌ Error downloading surat selesai:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mendownload surat'
    });
  }
};

exports.getDetailSurat = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const surat = await prisma.surat.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            phoneNumber: true
          }
        }
      }
    });

    if (!surat) {
      return res.status(404).json({
        success: false,
        error: 'Surat tidak ditemukan'
      });
    }

    if (surat.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke surat ini'
      });
    }

    const suratWithFileInfo = {
      ...surat,
      hasFile: !!surat.fileSuratSelesai,
      canDownload: surat.status === 'Selesai' && !!surat.fileSuratSelesai
    };

    res.json({
      success: true,
      surat: suratWithFileInfo
    });

  } catch (error) {
    console.error('❌ Error getting surat detail:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil detail surat'
    });
  }
};
