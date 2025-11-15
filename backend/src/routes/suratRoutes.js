const express = require('express');
const { createSurat, getMySurat, getSuratById } = require('../controllers/suratController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Ajukan surat
router.post('/', protect, createSurat);

// Ambil semua surat milik user
router.get('/me', protect, getMySurat);

// Detail surat berdasarkan ID
router.get('/:id', protect, getSuratById);

module.exports = router;
