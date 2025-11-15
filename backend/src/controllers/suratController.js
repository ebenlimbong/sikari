// src/controllers/suratController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createSurat = async (req, res) => {
  try {
    const { jenisSurat, data } = req.body;

    if (!jenisSurat || !data) {
      return res.status(400).json({
        success: false,
        error: 'Data surat tidak lengkap'
      });
    }

    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const r = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const noTiket = `TIC-${y}${m}${d}-${r}`;

    const surat = await prisma.surat.create({
    data: {
      userId: parseInt(req.user.id),
      jenisSurat,
      noTiket,
      data,
      status: 'Belum Dikerjakan'
    }
  });

    res.status(201).json({
      success: true,
      message: 'Surat berhasil diajukan',
      surat: {
        noTiket: surat.noTiket,
        jenisSurat: surat.jenisSurat,
        tanggalPengajuan: surat.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Error creating surat:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengajukan surat'
    });
  }
};

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


exports.getSuratById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query paling cepat: findUnique berdasarkan PRIMARY KEY
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
