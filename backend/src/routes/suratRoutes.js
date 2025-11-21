const express = require('express');
const { createSurat, getMySurat, getSuratById } = require('../controllers/suratController');
const { protect } = require('../middleware/authMiddleware');
const { downloadSuratSelesai, getDetailSurat } = require('../controllers/suratController');


const router = express.Router();

// ✅ Routes untuk surat
router.post('/', protect, createSurat);        // POST /api/surat
router.get('/me', protect, getMySurat);        // GET /api/surat/me
router.get('/:id', protect, getSuratById);     // GET /api/surat/:id

router.get('/:id/download', protect, downloadSuratSelesai); // Untuk download PDF
router.get('/:id/detail', protect, getDetailSurat);         // Untuk detail + info file
// ❌ HAPUS BARIS INI (duplikat dan salah):
// router.post('/surat', protect, upload.any(), createSurat);

module.exports = router;
