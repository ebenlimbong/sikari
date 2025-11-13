// src/controllers/suratController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ CREATE SURAT
exports.createSurat = async (req, res) => {
  try {
    const { jenisSurat, data } = req.body;

    // ✅ Validasi input
    if (!jenisSurat || !data) {
      return res.status(400).json({
        success: false,
        error: 'Data surat tidak lengkap'
      });
    }

    // Generate nomor tiket
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const r = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const noTiket = `TIC-${y}${m}${d}-${r}`;

    // Buat surat di database
    const surat = await prisma.surat.create({
      data: {
        userId: parseInt(req.user.id),
        jenisSurat,
        noTiket,
        data, // Prisma auto-handle JSON → langsung objek
        status: 'Belum Dikerjakan'
      }
    });

    // ✅ Response sesuai ekspektasi frontend Anda
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

// ✅ GET MY SURAT
exports.getMySurat = async (req, res) => {
  try {
    const suratList = await prisma.surat.findMany({
      where: { userId: parseInt(req.user.id) },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        noTiket: true,
        jenisSurat: true,
        data: true,
        status: true,
        catatanAdmin: true,
        waktuSelesai: true,
        createdAt: true,
      }
    });

    // ✅ Format data sesuai frontend Anda (tanggalPengajuan = createdAt)
    const formattedList = suratList.map(surat => ({
      id: surat.id,
      noTiket: surat.noTiket,
      jenisSurat: surat.jenisSurat,
      data: surat.data, // Sudah objek, tidak perlu JSON.parse
      status: surat.status,
      catatanAdmin: surat.catatanAdmin,
      waktuSelesai: surat.waktuSelesai,
      tanggalPengajuan: surat.createdAt, // ✅ Kompatibel dengan DetailSuratModal.vue
    }));

    // ✅ Struktur response sesuai frontend Anda
    res.json({
      success: true,
      suratList: formattedList
    });

  } catch (error) {
    console.error('❌ Error fetching surat:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil data surat'
    });
  }
};