// /backend/src/controllers/admin/suratAdminController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSuratList = async (req, res) => {
  try {
    // Ambil semua surat, urutkan descending berdasarkan createdAt
    const suratList = await prisma.surat.findMany({
      orderBy: { createdAt: 'desc' },
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

    // Kelompokkan berdasarkan status
    const belumDikerjakan = suratList.filter(s => s.status === 'Belum Dikerjakan');
    const sedangDiproses = suratList.filter(s => s.status === 'Sedang Diproses');
    const selesai = suratList.filter(s => s.status === 'Selesai');

    res.json({
      success: true,
      total: suratList.length,
      belumDikerjakan: {
        count: belumDikerjakan.length,
        list: belumDikerjakan
      },
      sedangDiproses: {
        count: sedangDiproses.length,
        list: sedangDiproses
      },
      selesai: {
        count: selesai.length,
        list: selesai
      }
    });

  } catch (error) {
    console.error('❌ Error fetching surat list:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil data surat'
    });
  }
};

exports.updateSuratStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, catatanAdmin } = req.body;

    // Validasi status
    const validStatus = ['Belum Dikerjakan', 'Sedang Diproses', 'Selesai'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Status tidak valid'
      });
    }

    const updatedSurat = await prisma.surat.update({
      where: { id },
      data: {
        status,
        catatanAdmin: catatanAdmin || undefined,
        waktuSelesai: status === 'Selesai' ? new Date() : undefined
      }
    });

    res.json({
      success: true,
      message: 'Status surat berhasil diperbarui',
      surat: updatedSurat
    });

  } catch (error) {
    console.error('❌ Error updating surat status:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal memperbarui status surat'
    });
  }
};

exports.deleteSurat = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.surat.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Surat berhasil dihapus'
    });

  } catch (error) {
    console.error('❌ Error deleting surat:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal menghapus surat'
    });
  }
};

