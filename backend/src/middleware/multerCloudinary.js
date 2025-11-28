// backend/src/middleware/multerCloudinary.js
// ✅ Cloudinary storage configuration for file uploads
// Handles PDFs uploaded for "surat selesai" (completed letter files)

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// ✅ Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Debug: Log Cloudinary config on startup with validation
console.log('🔧 Cloudinary Configuration:');
console.log(`   ├─ Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ NOT SET'}`);
console.log(`   ├─ API Key: ${process.env.CLOUDINARY_API_KEY ? '✅ SET' : '❌ NOT SET'}`);
console.log(`   └─ API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✅ SET' : '❌ NOT SET'}`);

// ✅ Validasi: Cloudinary config harus lengkap
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ CRITICAL: Cloudinary environment variables tidak lengkap!');
  console.error('   Pastikan env var berikut sudah di-set di Railway/deployment:');
  console.error('   - CLOUDINARY_CLOUD_NAME');
  console.error('   - CLOUDINARY_API_KEY');
  console.error('   - CLOUDINARY_API_SECRET');
}

// If CLOUDINARY_URL exists and its parsed cloud name looks wrong (eg. 'Root'),
// prefer explicit env vars and reconfigure cloudinary accordingly.
if (process.env.CLOUDINARY_URL) {
  try {
    // CLOUDINARY_URL format: cloudinary://<api_key>:<api_secret>@<cloud_name>
    const match = process.env.CLOUDINARY_URL.match(/@([^/\s]+)$/);
    const urlCloudName = match ? match[1] : null;
    if (urlCloudName) {
      console.log(`🔍 Detected CLOUDINARY_URL cloud_name: ${urlCloudName}`);
      if (urlCloudName.toLowerCase() === 'root' && process.env.CLOUDINARY_CLOUD_NAME) {
        console.warn('⚠️ CLOUDINARY_URL contains cloud_name "Root" (likely API key name). Overriding with CLOUDINARY_CLOUD_NAME env var.');
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log(`✅ cloudinary reconfigured to cloud_name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
      }
    }
  } catch (err) {
    console.error('❌ Error while parsing CLOUDINARY_URL:', err.message);
  }
}

// ✅ Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'surat-desa/surat-selesai', // Folder in Cloudinary
    format: async (req, file) => 'pdf',
    public_id: (req, file) => {
      const suratId = req.params.id;
      const timestamp = Date.now();
      return `surat-${suratId}-${timestamp}`;
    },
  },
});

// ✅ File filter - only accept PDF
const fileFilter = (req, file, cb) => {
  console.log(`📄 File upload attempt: ${file.originalname} (${file.mimetype})`);

  if (file.mimetype === 'application/pdf') {
    console.log('✅ File format accepted (PDF)');
    cb(null, true);
  } else {
    console.log('❌ File format rejected (not PDF)');
    cb(new Error('❌ Hanya file PDF yang diizinkan untuk surat selesai'), false);
  }
};

// ✅ Export multer middleware
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
}).single('fileSuratSelesai');
