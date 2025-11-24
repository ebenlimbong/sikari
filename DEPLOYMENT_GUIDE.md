# 📦 Panduan Deploy Project Administrasi Surat Desa

> **Status**: PostgreSQL ✅ | Backend Ready ✅ | Frontend Ready ✅

---

## 📋 Daftar Isi

1. [Ringkasan Strategi](#ringkasan-strategi)
2. [Frontend ke Vercel](#-frontend-ke-vercel)
3. [Backend ke Render.com](#-backend-ke-rendercom-gratis)
4. [Solusi File Upload](#-solusi-file-upload-surat)
5. [Troubleshooting](#troubleshooting)
6. [Cost Estimation](#-cost-estimation)

---

## 📌 Ringkasan Strategi

| Komponen         | Solusi                         | Alasan                                                        |
| ---------------- | ------------------------------ | ------------------------------------------------------------- |
| **Frontend**     | Vercel                         | Build otomatis, SPA support, gratis, super cepat              |
| **Backend**      | Render.com (Native/Paid tier)  | PostgreSQL support, file storage, always-on, gratis tier baru |
| **Database**     | Railway/Neon PostgreSQL        | Managed, backup otomatis, gratis tier cukup                   |
| **File Uploads** | Cloudinary (gratis 25GB/bulan) | CDN, otomatis optimize, gratis tier generous                  |

**Cost Total (Realistis)**:

- Frontend: **$0** (Vercel gratis)
- Backend: **$7/bulan** (Render Pro, atau $5-10 Railway)
- Database: **$0-5/bulan** (Neon/Railway gratis tier bagus)
- File Storage: **$0** (Cloudinary gratis 25GB)
- **Total: ~$5-10/bulan**

---

# 🎯 FRONTEND KE VERCEL

## Step 1: Persiapan Frontend Lokal

### 1.1 Update API Base URL dengan Environment Variable

Buka `src/api.js` dan ubah hardcoded URL menjadi env variable:

```javascript
import axios from "axios";

// ✅ PENTING: Gunakan env variable, dengan fallback ke production URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.yourdomain.com/api",
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

### 1.2 Buat file `.env.example` (jangan commit secret values)

```bash
VITE_API_URL=http://localhost:5000/api
```

### 1.3 Buat file `.env.local` (local development, gitignored)

```bash
# .env.local (untuk dev lokal)
VITE_API_URL=http://localhost:5000/api
```

### 1.4 Pastikan `.gitignore` ada (sudah ada di Vite project)

```
.env.local
.env.*.local
```

## Step 2: Push ke GitHub

```bash
git add .
git commit -m "Setup: prepare frontend for deployment with env vars"
git push origin main
```

## Step 3: Deploy ke Vercel

### 3.1 Buka Vercel Dashboard

- Kunjungi https://vercel.com
- Login dengan GitHub account (jika belum, buat akun gratis)

### 3.2 Import Repository

1. Klik **"Add New..."** → **"Project"**
2. Pilih repository `sistem-administrasi-karangsari`
3. Vercel akan auto-detect Vite setup ✅

### 3.3 Setup Environment Variables

1. Di halaman deployment, scroll ke **"Environment Variables"**
2. Tambahkan:
   ```
   Name: VITE_API_URL
   Value: https://backend-production-url.com/api
   (kami update ini nanti setelah backend ready)
   ```
3. Opsional: bisa set per environment (Preview/Production)

### 3.4 Deploy

1. Klik **"Deploy"**
2. Tunggu ~2-3 menit
3. Dapatkan URL: `https://administrasi-surat-desa.vercel.app` (atau custom domain)

### 3.5 Update Domain di Backend CORS

Setelah dapat URL Vercel, catat domainnya untuk nanti dikonfigurasi di backend.

---

# 🖥️ BACKEND KE RENDER.COM (GRATIS)

## Mengapa Render.com?

- ✅ Tier gratis terbaru support Node.js + PostgreSQL
- ✅ Deploy otomatis dari GitHub
- ✅ Environment variables management
- ✅ Persistent storage untuk uploads (pada tier paid)
- ✅ Always-on (minimal tier, jangan free tier yang sleep)

## Step 1: Setup Render Account

1. Buka https://render.com
2. Sign up dengan GitHub
3. Authorize akses ke repository Anda

## Step 2: Persiapkan Backend untuk Production

### 2.1 Update `backend/.env.production` (baru, jangan commit)

Ini hanya untuk referensi lokal. Di production akan di-set di Render dashboard.

```bash
# backend/.env.production (untuk testing lokal, jangan commit)
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=your_super_secret_key_prod_2025!
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://administrasi-surat-desa.vercel.app
```

### 2.2 Update `backend/src/app.js` dengan CORS dinamis

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ✅ PENTING: CORS yang benar untuk production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Backend Surat Online: OK ✅",
    env: process.env.NODE_ENV,
  });
});

app.use("/api/auth", require("./routes/auth/authRoutes"));
app.use("/api/surat", require("./routes/suratRoutes"));
app.use("/api/admin", require("./routes/admin/adminRoutes"));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🟢 Backend jalan di port ${PORT} (${
      process.env.NODE_ENV || "development"
    })`
  );
});

module.exports = app;
```

### 2.3 Update `backend/package.json` dengan production script

```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "seed": "node scripts/seedAdmin.js"
  }
}
```

### 2.4 Buat `backend/.gitignore` (jika belum ada)

```
node_modules/
.env
.env.local
.env.production
uploads/
*.log
```

## Step 3: Push Code ke GitHub

```bash
cd backend
git add .
git commit -m "Setup: backend production ready with env vars and CORS"
git push origin main
```

## Step 4: Create Render Service

### 4.1 Buka Render Dashboard & Buat Web Service

1. Klik **"New +"** → **"Web Service"**
2. Pilih repository `sistem-administrasi-karangsari`
3. Set konfigurasi:
   - **Name**: `administrasi-surat-desa-api`
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `cd backend && npm start`
   - **Region**: Singapore (atau terdekat)

### 4.2 Setup Environment Variables di Render

Di halaman service, scroll ke **"Environment"** dan tambahkan:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres:password@your-db-host:5432/surat_db
JWT_SECRET=your_super_secret_key_prod_2025!
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://administrasi-surat-desa.vercel.app
```

### 4.3 Deploy

1. Klik **"Create Web Service"**
2. Tunggu build (biasanya 5-10 menit pertama kali)
3. Dapatkan URL: `https://administrasi-surat-desa-api.onrender.com`

---

# 🗄️ DATABASE POSTGRES DI CLOUD

## Opsi 1: Neon.tech (Recommended)

**Keuntungan**:

- PostgreSQL managed ✅
- Free tier generous (3 projects, 1 branch free)
- Auto backup
- Instant branching untuk dev/test

### Setup Neon:

1. Kunjungi https://neon.tech
2. Sign up (gratis)
3. Create project → get `DATABASE_URL`
4. Copy ke Render environment variable

**Database URL format**:

```
postgresql://user:password@ep-xxx-yyy.neon.tech/surat_db
```

## Opsi 2: Railway

**Keuntungan**:

- PostgreSQL + Redis available
- Gratis tier masih ada
- Simple UI

**Cost**: ~$5/bulan untuk production-grade

---

# 📁 SOLUSI FILE UPLOAD SURAT

## Masalah dengan Folder Uploads di Server

Ketika deploy ke Render/Railway:

- 🚨 **Render ephemeral filesystem** → file hilang saat redeploy
- 🚨 **Tidak ada persistent storage** di tier gratis
- ✅ **Solusi**: Gunakan cloud storage (Cloudinary, AWS S3, atau MinIO)

## ✅ SOLUSI RECOMMENDED: Cloudinary (Gratis)

### Step 1: Setup Cloudinary Account

1. Buka https://cloudinary.com
2. Sign up (gratis, 25GB/bulan)
3. Dapatkan credentials dari dashboard:
   - Cloud Name
   - API Key
   - API Secret

### Step 2: Install Cloudinary SDK

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

### Step 3: Update Multer Config

Buat file baru `backend/src/middleware/multerCloudinary.js`:

```javascript
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "surat-desa/surat-selesai",
    format: async (req, file) => "pdf",
    public_id: (req, file) => {
      const suratId = req.params.id;
      const timestamp = Date.now();
      return `surat-${suratId}-${timestamp}`;
    },
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Hanya file PDF yang diizinkan"), false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("fileSuratSelesai");
```

### Step 4: Update Admin Routes untuk Cloudinary

Di `backend/src/routes/admin/adminRoutes.js`, ganti multer:

```javascript
const multerCloudinary = require("../../middleware/multerCloudinary"); // ganti dari multerSuratSelesai
const {
  uploadSuratSelesai,
} = require("../../controllers/admin/suratAdminController");

router.post("/surat/:id/upload-selesai", multerCloudinary, uploadSuratSelesai);
```

### Step 5: Update Controller untuk Handle Cloudinary Response

Di `backend/src/controllers/admin/suratAdminController.js`:

```javascript
exports.uploadSuratSelesai = async (req, res) => {
  try {
    const suratId = req.params.id;

    // Dari Cloudinary upload, file path adalah public URL
    const filePath = req.file.path; // ini URL Cloudinary
    const uploadedAt = new Date();
    const uploadedBy = req.user.username; // dari auth middleware

    // Update database
    const surat = await prisma.surat.update({
      where: { id: suratId },
      data: {
        fileSuratSelesai: filePath, // simpan URL, bukan path lokal
        uploadedAt,
        uploadedBy,
      },
    });

    res.json({
      success: true,
      message: "Surat selesai berhasil diupload",
      surat,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload gagal" });
  }
};
```

### Step 6: Add Env Variables

Di Render environment variables:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 7: Update Frontend untuk Cloudinary URL

Di `src/components/...` yang display surat selesai:

```javascript
// Sebelum (local path)
// const fileUrl = `http://localhost:5000/uploads/surat-selesai/${filename}`;

// Sesudah (Cloudinary URL langsung)
const fileUrl = surat.fileSuratSelesai; // sudah URL penuh
```

---

## ❌ ALTERNATIVE: Local Storage + Backup (Tidak Recommended)

Jika ingin tetap pakai folder lokal (risky):

- Render ephemeral → **file akan hilang**
- Solusi: backup ke S3 secara berkala (kompleks)
- **NOT recommended untuk production**

---

# 🔧 KONFIGURASI AKHIR CHECKLIST

## Frontend (Vercel)

- [ ] API base URL pakai `VITE_API_URL` env var
- [ ] `.env.example` documented di repo
- [ ] CORS domain di backend setup ke Vercel URL
- [ ] Build command: `npm run build` (auto di Vercel)
- [ ] Deploy & testing

## Backend (Render)

- [ ] `backend/package.json` punya `start` script
- [ ] `src/app.js` punya CORS config dinamis
- [ ] Environment variables set di Render dashboard
- [ ] Build command: `cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start command: `cd backend && npm start`
- [ ] Database URL terhubung ke Neon/Railway
- [ ] Deploy & testing

## Database (Neon/Railway)

- [ ] PostgreSQL instance created
- [ ] DATABASE_URL tersedia
- [ ] Backup enabled
- [ ] Connection string tested lokal

## File Storage (Cloudinary)

- [ ] Account created & credentials obtained
- [ ] `multer-storage-cloudinary` installed
- [ ] `multerCloudinary.js` middleware created
- [ ] Routes updated untuk pakai cloudinary
- [ ] Env vars set di Render
- [ ] Testing upload

---

# 🧪 TESTING POST-DEPLOY

## Test 1: Frontend Access

```bash
# Dari browser
https://administrasi-surat-desa.vercel.app
# Harus loading page login
```

## Test 2: Backend API

```bash
curl -i https://administrasi-surat-desa-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123!"}'

# Response: token JWT
```

## Test 3: Login & Register

- [ ] Register warga baru → harus bisa
- [ ] Login admin → harus dapat token
- [ ] Login user baru → harus dapat token

## Test 4: Upload Surat

- [ ] Admin upload file PDF
- [ ] Harus tersimpan di Cloudinary
- [ ] URL file muncul di database
- [ ] User bisa download/view dari Cloudinary URL

---

# 📊 COST ESTIMATION

| Layanan    | Tier           | Harga/Bulan  | Notes                                   |
| ---------- | -------------- | ------------ | --------------------------------------- |
| Vercel     | Hobby (Gratis) | $0           | Unlimited, tapi no serverless functions |
| Render     | Starter ($7)   | $7           | Recommended, bukan free tier yg sleep   |
| Neon       | Free           | $0           | 3 projects free                         |
| Cloudinary | Free           | $0           | 25GB/month, generous for small app      |
| **Total**  |                | **$7/month** | Very reasonable untuk small startup     |

**Alternative Budget Setup**:

- Railway Backend: $5-10/month
- Railway Database: included
- Cloudinary: $0
- **Total: $5-10/month**

---

# 🆘 TROUBLESHOOTING

## Error: "CORS error from frontend"

**Penyebab**: Backend CORS_ORIGIN tidak sesuai dengan Vercel URL

**Fix**:

```javascript
// Di backend/src/app.js
const corsOptions = {
  origin: "https://administrasi-surat-desa.vercel.app", // pastikan exact URL
  credentials: true,
};
```

## Error: "Database connection timeout"

**Penyebab**: DATABASE_URL salah atau connection string incomplete

**Fix**:

```bash
# Test lokal dulu
npx prisma db push

# Jika error, cek DATABASE_URL format:
postgresql://user:password@host:5432/database_name
```

## Error: "Build command failed"

**Penyebab**: Build command tidak sesuai struktur

**Fix**: Render build command harus:

```
cd backend && npm install && npx prisma generate && npx prisma migrate deploy
```

## Error: "File upload gagal / undefined filename"

**Penyebab**: Cloudinary credentials tidak set di Render env

**Fix**: Pastikan 3 env var ada:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## File hilang setelah redeploy

**Penyebab**: Render ephemeral filesystem

**Fix**: Wajib pakai Cloudinary atau persistent storage tier bayar

---

# ✅ SUMMARY - QUICK START DEPLOY

### Langkah Cepat (30 menit):

1. **Frontend ke Vercel**

   ```bash
   # Update src/api.js → env variable
   # Commit & push ke GitHub
   # Di Vercel: import repo → deploy
   # Copy frontend URL
   ```

2. **Backend ke Render**

   ```bash
   # Update backend/src/app.js → CORS dinamic
   # Set Render env vars (DATABASE_URL, JWT_SECRET, CORS_ORIGIN)
   # Deploy via GitHub sync
   # Copy backend URL
   ```

3. **Database ke Neon**

   ```bash
   # Create PostgreSQL instance
   # Copy DATABASE_URL
   # Update Render env var
   ```

4. **File Storage Cloudinary** (Optional tapi recommended)

   ```bash
   # Create Cloudinary account
   # Install multer-storage-cloudinary
   # Update controller & middleware
   # Set Render env vars
   ```

5. **Test & Go Live** ✅

---

**Good luck! 🚀 Hubungi saya jika ada yang perlu diclarify!**
