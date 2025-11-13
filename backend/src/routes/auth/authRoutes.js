// src/routes/auth/authRoutes.js
const express = require('express');
const { register } = require('../../controllers/auth/registerController');
const { login } = require('../../controllers/auth/loginController');
const { getProfile } = require('../../controllers/auth/profileController');
const { protect } = require('../../middleware/authMiddleware');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router;