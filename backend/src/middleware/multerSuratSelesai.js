// /backend/src/middleware/multerSuratSelesai.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder uploads/surat-selesai ada
const uploadDir = 'uploads/surat-selesai';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Folder uploads/surat-selesai dibuat');
}

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const suratId = req.params.id;
    const timestamp = Date.now();
    // Gunakan ekstensi asli (meski PDF, biar aman)
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `surat-${suratId}-${timestamp}${ext}`);
  }
});

// Filter hanya PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file PDF yang diizinkan untuk surat selesai'), false);
  }
};

// ✅ INI YANG KRUSIAL: Export middleware .single('fileSuratSelesai')
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('fileSuratSelesai'); // ← HARUS ADA .single()
