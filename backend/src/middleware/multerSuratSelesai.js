// /backend/src/middleware/multerSuratSelesai.js
// ✅ UPDATED: Now uses Cloudinary just like admin uploads
// This ensures user uploads are stored in cloud (not ephemeral Railway filesystem)

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// ✅ Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Setup Cloudinary storage for user dokumen uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'surat-desa/dokumen-warga', // Different folder from admin uploads
    format: async (req, file) => 'pdf',
    public_id: (req, file) => {
      const suratId = req.params.id;
      const timestamp = Date.now();
      return `dokumen-warga-${suratId}-${timestamp}`;
    },
  },
});

// ✅ File filter - only accept PDF
const fileFilter = (req, file, cb) => {
  console.log(`📄 File upload attempt (warga): ${file.originalname} (${file.mimetype})`);

  if (file.mimetype === 'application/pdf') {
    console.log('✅ File format accepted (PDF)');
    cb(null, true);
  } else {
    console.log('❌ File format rejected (not PDF)');
    cb(new Error('❌ Hanya file PDF yang diizinkan untuk dokumen'), false);
  }
};

// ✅ Export multer middleware using Cloudinary storage
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
}).single('fileSuratSelesai');
