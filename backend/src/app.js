// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ PENTING: Serve static files SEBELUM routes
// Path harus ke folder uploads yang BENAR
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend Surat Online: OK ✅' });
});

// ✅ Routes
app.use('/api/auth', require('./routes/auth/authRoutes'));
app.use('/api/surat', require('./routes/suratRoutes'));
app.use('/api/admin', require('./routes/admin/adminRoutes'));

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🟢 Backend jalan di http://localhost:${PORT}`);
});

module.exports = app;
