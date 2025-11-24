// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ✅ CORS Configuration - Dynamic and permissive for local dev
// Allow multiple origins via env (comma separated), and always permit localhost:5173 (Vite)
const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173';
const allowedOrigins = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow non-browser requests (like curl, Postman) which have no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    console.warn('Blocked CORS request from origin:', origin);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Middleware
app.use(cors(corsOptions));
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
