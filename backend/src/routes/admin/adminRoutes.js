// /backend/src/routes/admin/adminRoutes.js
const express = require('express');
const { getSuratList, updateSuratStatus, deleteSurat } = require('../../controllers/admin/suratAdminController');
const adminOnly = require('../../middleware/adminMiddleware');
const { protect } = require('../../middleware/authMiddleware'); // ✅ DESTRUCTURE protect

const router = express.Router();

// ✅ URUTAN YANG BENAR: protect -> adminOnly
router.get('/surat', protect, adminOnly, getSuratList);
router.put('/surat/:id', protect, adminOnly, updateSuratStatus);
router.delete('/surat/:id', protect, adminOnly, deleteSurat);

module.exports = router;
