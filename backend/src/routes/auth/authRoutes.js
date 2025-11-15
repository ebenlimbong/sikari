const express = require('express');
const { register } = require('../../controllers/auth/registerController');
const { login } = require('../../controllers/auth/loginController');
const { getProfile, updateProfile } = require('../../controllers/auth/profileController'); // ✅ Tambahkan updateProfile
const { protect } = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
module.exports = router;
