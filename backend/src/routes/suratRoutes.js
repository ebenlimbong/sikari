const express = require('express');
const { createSurat, getMySurat } = require('../controllers/suratController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createSurat);
router.get('/me', protect, getMySurat);

module.exports = router;
