// /backend/src/controllers/admin/suratAdminController.js
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs').promises;
const prisma = new PrismaClient();

// ========================================
// FUNCTION YANG SUDAH ADA (TIDAK DIUBAH)
// ========================================

exports.getSuratList = async (req, res) => {
  try {
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

    // ✅ Hapus file jika ada sebelum delete record
    const surat = await prisma.surat.findUnique({
      where: { id }
    });

    if (surat && surat.fileSuratSelesai) {
      // Pastikan kita hanya menggunakan nama file dan hapus dari folder uploads/surat-selesai
      const filename = path.basename(surat.fileSuratSelesai);
      const filePath = path.join(__dirname, '../../../uploads/surat-selesai', filename);
      try {
        await fs.unlink(filePath);
        console.log('✅ File surat selesai dihapus:', filePath);
      } catch (err) {
        console.error('⚠️ Gagal hapus file:', err.message);
      }
    }

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

// ========================================
// ✅ FUNCTION BARU: UPLOAD SURAT SELESAI
// ========================================

exports.uploadSuratSelesai = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi: cek apakah surat ada
    const surat = await prisma.surat.findUnique({
      where: { id }
    });

    if (!surat) {
      return res.status(404).json({
        success: false,
        error: 'Surat tidak ditemukan'
      });
    }

    // Validasi: hanya surat dengan status "Selesai" yang bisa diupload
    if (surat.status !== 'Selesai') {
      return res.status(400).json({
        success: false,
        error: 'Hanya surat dengan status "Selesai" yang dapat diupload'
      });
    }

    // Validasi: apakah file diupload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'File surat wajib diupload'
      });
    }

    // Hapus file lama jika ada
    if (surat.fileSuratSelesai) {
      // Hapus file lama dari folder uploads/surat-selesai
      const oldFilename = path.basename(surat.fileSuratSelesai);
      const oldFilePath = path.join(__dirname, '../../../uploads/surat-selesai', oldFilename);
      try {
        await fs.unlink(oldFilePath);
        console.log('✅ File lama dihapus:', oldFilePath);
      } catch (err) {
        console.error('⚠️ Gagal hapus file lama:', err.message);
      }
    }

    // Simpan path file baru ke database
    const fileName = path.basename(req.file.path); // ✅ HANYA NAMA FILE, contoh: surat-xxx.pdf

    const updatedSurat = await prisma.surat.update({
      where: { id },
      data: {
        // Simpan hanya nama file. Frontend akan membentuk URL: VITE_API_URL + '/uploads/surat-selesai/' + fileSuratSelesai
        fileSuratSelesai: fileName,
        uploadedAt: new Date(),
        uploadedBy: req.user.username // Dari middleware auth
      }
    });

    res.json({
      success: true,
      message: 'Surat selesai berhasil diupload',
      surat: updatedSurat
    });

  } catch (error) {
    console.error('❌ Error uploading surat selesai:', error);

    // Hapus file jika ada error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (err) {
        console.error('⚠️ Gagal hapus file setelah error:', err.message);
      }
    }

    res.status(500).json({
      success: false,
      error: 'Gagal mengupload surat selesai'
    });
  }
};

// ========================================
// ✅ FUNCTION BARU: DELETE FILE SURAT SELESAI
// ========================================

exports.deleteSuratSelesai = async (req, res) => {
  try {
    const { id } = req.params;

    const surat = await prisma.surat.findUnique({
      where: { id }
    });

    if (!surat) {
      return res.status(404).json({
        success: false,
        error: 'Surat tidak ditemukan'
      });
    }

    if (!surat.fileSuratSelesai) {
      return res.status(400).json({
        success: false,
        error: 'Tidak ada file surat yang diupload'
      });
    }

    // Hapus file dari storage
    const filename = path.basename(surat.fileSuratSelesai);
    const filePath = path.join(__dirname, '../../../uploads/surat-selesai', filename);
    try {
      await fs.unlink(filePath);
      console.log('✅ File surat selesai dihapus:', filePath);
    } catch (err) {
      console.error('⚠️ Gagal hapus file:', err.message);
    }

    // Update database: clear file fields
    const updatedSurat = await prisma.surat.update({
      where: { id },
      data: {
        fileSuratSelesai: null,
        uploadedAt: null,
        uploadedBy: null
      }
    });

    res.json({
      success: true,
      message: 'File surat selesai berhasil dihapus',
      surat: updatedSurat
    });

  } catch (error) {
    console.error('❌ Error deleting surat selesai:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal menghapus file surat selesai'
    });
  }
};
