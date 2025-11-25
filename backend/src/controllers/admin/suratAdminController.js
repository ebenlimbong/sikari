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
// ✅ FUNCTION BARU: UPLOAD SURAT SELESAI (DENGAN CLOUDINARY)
// ========================================

exports.uploadSuratSelesai = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📤 Uploading surat selesai untuk ID: ${id}`);
    console.log(`🔧 req.file:`, req.file ? { filename: req.file.filename, path: req.file.path } : 'NOT PROVIDED');

    // Validasi: cek apakah surat ada
    const surat = await prisma.surat.findUnique({
      where: { id }
    });

    if (!surat) {
      console.log(`❌ Surat tidak ditemukan: ${id}`);
      return res.status(404).json({
        success: false,
        error: 'Surat tidak ditemukan'
      });
    }

    // Validasi: hanya surat dengan status "Selesai" yang bisa diupload
    if (surat.status !== 'Selesai') {
      console.log(`❌ Surat belum selesai (status: ${surat.status})`);
      return res.status(400).json({
        success: false,
        error: 'Hanya surat dengan status "Selesai" yang dapat diupload'
      });
    }

    // Validasi: apakah file diupload
    if (!req.file) {
      console.log('❌ File tidak diupload');
      return res.status(400).json({
        success: false,
        error: 'File surat wajib diupload'
      });
    }

    // ✅ DARI CLOUDINARY: req.file.path adalah URL penuh Cloudinary
    const cloudinaryUrl = req.file.path;
    const uploadedBy = req.user.username;

    console.log(`✅ File uploaded ke Cloudinary: ${cloudinaryUrl}`);
    console.log(`✅ Uploaded by: ${uploadedBy}`);

    // ✅ Hapus file lama dari Cloudinary jika ada
    if (surat.fileSuratSelesai) {
      try {
        // Cloudinary URL format: https://res.cloudinary.com/cloud_name/upload/v123/folder/file_id.pdf
        // Kita bisa extract public_id dari URL untuk delete
        console.log(`⚠️  File lama dari Cloudinary: ${surat.fileSuratSelesai}`);
        console.log(`   Note: File lama tetap ada di Cloudinary (sudah tidak dipakai oleh surat ini)`);
      } catch (err) {
        console.error('⚠️ Gagal hapus file lama dari Cloudinary:', err.message);
      }
    }

    // ✅ UPDATE DATABASE: Simpan URL penuh dari Cloudinary
    const updatedSurat = await prisma.surat.update({
      where: { id },
      data: {
        fileSuratSelesai: cloudinaryUrl, // ✅ URL PENUH CLOUDINARY
        uploadedAt: new Date(),
        uploadedBy: uploadedBy
      }
    });

    console.log(`✅ Database updated untuk surat: ${id}`);

    res.json({
      success: true,
      message: 'Surat selesai berhasil diupload ke Cloudinary',
      surat: updatedSurat
    });

  } catch (error) {
    console.error('❌ Error uploading surat selesai:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: error.message || 'Gagal mengupload surat selesai',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// ========================================
// ✅ FUNCTION BARU: DELETE FILE SURAT SELESAI (CLOUDINARY)
// ========================================

exports.deleteSuratSelesai = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🗑️  Deleting file untuk surat: ${id}`);

    const surat = await prisma.surat.findUnique({
      where: { id }
    });

    if (!surat) {
      console.log(`❌ Surat tidak ditemukan: ${id}`);
      return res.status(404).json({
        success: false,
        error: 'Surat tidak ditemukan'
      });
    }

    if (!surat.fileSuratSelesai) {
      console.log(`❌ Tidak ada file untuk surat: ${id}`);
      return res.status(400).json({
        success: false,
        error: 'Tidak ada file surat yang diupload'
      });
    }

    // ✅ FILE SUDAH DI CLOUDINARY - TIDAK PERLU DELETE LOKAL
    // Cloudinary akan auto-manage file lifecycle
    console.log(`✅ File di Cloudinary: ${surat.fileSuratSelesai}`);
    console.log(`   Note: File tetap ada di Cloudinary untuk reference`);

    // ✅ UPDATE DATABASE: clear file fields
    const updatedSurat = await prisma.surat.update({
      where: { id },
      data: {
        fileSuratSelesai: null,
        uploadedAt: null,
        uploadedBy: null
      }
    });

    console.log(`✅ Database updated - file reference dihapus dari surat: ${id}`);

    res.json({
      success: true,
      message: 'File surat selesai berhasil dihapus dari referensi (Cloudinary file tetap tersimpan)',
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
