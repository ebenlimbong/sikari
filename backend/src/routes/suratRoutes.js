const express = require('express');
const { createSurat, getMySurat, getSuratById } = require('../controllers/suratController');
const { protect } = require('../middleware/authMiddleware');
const { downloadSuratSelesai, getDetailSurat } = require('../controllers/suratController');
const uploadUserFileMiddleware = require('../middleware/multerSuratSelesai'); // ✅ CLOUDINARY MIDDLEWARE

const router = express.Router();

// ✅ Routes untuk surat
router.post('/', protect, uploadUserFileMiddleware, createSurat);        // POST /api/surat dengan upload file ke Cloudinary
router.get('/me', protect, getMySurat);        // GET /api/surat/me
router.get('/:id', protect, getSuratById);     // GET /api/surat/:id

router.get('/:id/download', protect, downloadSuratSelesai); // Untuk download PDF
router.get('/:id/detail', protect, getDetailSurat);         // Untuk detail + info file

module.exports = router;
