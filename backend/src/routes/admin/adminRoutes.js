// /backend/src/routes/admin/adminRoutes.js
const express = require('express');
const {
  getSuratList,
  updateSuratStatus,
  deleteSurat,
  uploadSuratSelesai,      // ✅ FUNCTION BARU
  deleteSuratSelesai       // ✅ FUNCTION BARU
} = require('../../controllers/admin/suratAdminController');
const adminOnly = require('../../middleware/adminMiddleware');
const { protect } = require('../../middleware/authMiddleware');
const uploadSuratSelesaiMiddleware = require('../../middleware/multerCloudinary'); // ✅ USE CLOUDINARY

const router = express.Router();

// ========================================
// ROUTES YANG SUDAH ADA (TIDAK DIUBAH)
// ========================================
router.get('/surat', protect, adminOnly, getSuratList);
router.put('/surat/:id', protect, adminOnly, updateSuratStatus);
router.delete('/surat/:id', protect, adminOnly, deleteSurat);

// ========================================
// ✅ ROUTES BARU: UPLOAD & DELETE SURAT SELESAI (DENGAN CLOUDINARY)
// ========================================

// Upload surat selesai (PDF) - langsung ke Cloudinary
router.post(
  '/surat/:id/upload',
  protect,
  adminOnly,
  uploadSuratSelesaiMiddleware,  // ✅ CLOUDINARY MIDDLEWARE
  uploadSuratSelesai
);

// Hapus file surat selesai
router.delete(
  '/surat/:id/upload',
  protect,
  adminOnly,
  deleteSuratSelesai
);

module.exports = router;
