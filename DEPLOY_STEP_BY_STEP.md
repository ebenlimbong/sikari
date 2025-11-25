# 🚀 DEPLOYMENT STEP-BY-STEP GUIDE

**Status:** Ready to Deploy ✅  
**Date:** November 25, 2025  
**Estimated Duration:** 45-60 minutes

---

## ⚠️ IMPORTANT: .env File Structure

Jangan khawatir! **Hanya backend yang perlu `.env`** ✅

```
✅ backend/.env          ← Ada (11 variables untuk backend, database, Cloudinary)
✅ src/.env.production   ← Tidak perlu (Vercel handle env vars via dashboard)
```

**Mengapa?**

- Backend: Perlu credentials (DATABASE_URL, JWT_SECRET, Cloudinary API keys)
- Frontend: Hanya butuh VITE_API_URL (di set di Vercel dashboard, bukan file)
- Vite build: Automatically inject env vars dari Vercel platform

---

## 📋 ENVIRONMENT VARIABLES YANG DIPERLUKAN

### Backend (9 variables untuk Render)

Dari file `backend/.env` kamu:

| Variable              | Value                         | Sumber                       |
| --------------------- | ----------------------------- | ---------------------------- |
| DATABASE_URL          | postgresql://...              | Neon (akan copy nanti)       |
| JWT_SECRET            | rahasia_super_kuat_2025!      | Sudah ada ✅                 |
| JWT_EXPIRES_IN        | 7d                            | Sudah ada ✅                 |
| PORT                  | 5000                          | Default ✅                   |
| CORS_ORIGIN           | https://vercel-url.vercel.app | Update setelah Vercel deploy |
| CLOUDINARY_CLOUD_NAME | Root                          | Sudah ada ✅                 |
| CLOUDINARY_API_KEY    | 125758891323684               | Sudah ada ✅                 |
| CLOUDINARY_API_SECRET | GNwsXb762pceeYtpYuI0WY5D5qw   | Sudah ada ✅                 |
| NODE_ENV              | production                    | Set di Render                |

### Frontend (1 variable untuk Vercel)

| Variable     | Value                               | Sumber                    |
| ------------ | ----------------------------------- | ------------------------- |
| VITE_API_URL | https://render-url.onrender.com/api | Set setelah Render deploy |

---

## 🌍 STEP 1: SETUP NEON DATABASE (5 MENIT)

### 1.1 Buka Neon Console

```
1. Go to: https://console.neon.tech
2. Login dengan akun yang sudah ada
3. Klik "New Project"
```

### 1.2 Create New Project

```
Project Name: surat-desa-db
PostgreSQL Version: 17 (latest)
Klik "Create Project"
```

### 1.3 Copy Connection String

```
Setelah project dibuat:
1. Klik "Connection strings" tab
2. Copy "Connection string" yang format:
   postgresql://user:password@host/dbname?sslmode=require

CONTOH:
postgresql://neondb_owner:XXX@ep-yellow-fire-123456.us-east-1.aws.neon.tech/surat_db?sslmode=require

3. SAVE di notepad/temporary
```

**🔐 PENTING:** String ini akan digunakan di Render nanti

---

## ✅ STEP 2: DEPLOY FRONTEND KE VERCEL (10 MENIT)

### 2.1 Buka Vercel Dashboard

```
1. Go to: https://vercel.com/dashboard
2. Pastikan sudah login dengan akun kamu
```

### 2.2 Import Project dari GitHub

```
1. Klik "Add New..." → "Project"
2. Pilih "Import Git Repository"
3. Paste repository URL: https://github.com/ebenlimbong/sikari
   Atau search dari list jika sudah terintegrasi
4. Klik "Import"
```

### 2.3 Configure Project

```
Halaman "Configure Project":

Project Name: sikari-frontend (atau nama apapun)
Framework Preset: Vite (auto-detect)
Root Directory: ./ (akarkan di root, bukan di subfolder)

Build Settings:
- Build Command: npm run build
- Output Directory: dist
- Install Command: npm install

Environment Variables:
⚠️ JANGAN ISI VITE_API_URL DULU! (akan update nanti)

Klik "Deploy"
```

### 2.4 Tunggu Deploy Selesai

```
Vercel akan:
1. Build project (~2 menit)
2. Deploy ke CDN (~1 menit)
3. Berikan URL seperti: https://sikari-frontend-xxx.vercel.app

🟢 Tunggu sampai status berubah ke "Ready"
✅ CATAT URL INI
```

**Contoh URL yang akan didapat:**

```
https://sikari-xxxxx.vercel.app
```

---

## 🐘 STEP 3: DEPLOY BACKEND KE RENDER (20 MENIT)

### 3.1 Buka Render Dashboard

```
1. Go to: https://dashboard.render.com
2. Login dengan akun yang sudah ada
```

### 3.2 Create New Web Service

```
1. Klik "New +"
2. Pilih "Web Service"
3. Pilih "Deploy an existing repository"
4. Konfirmasi GitHub connection (authorize jika diminta)
5. Search & select repository: sikari
6. Klik "Connect"
```

### 3.3 Configure Web Service

```
Name: sikari-backend (atau nama apapun)

Environment: Node
Region: Singapore (atau pilihan terdekat)

Build Command:
cd backend && npm install && npx prisma generate && npx prisma migrate deploy

Start Command:
cd backend && npm start

Pricing Plan: FREE (atau starter tergantung kebutuhan)

⚠️ JANGAN KLIK DEPLOY DULU! Lanjut ke Step 3.4
```

### 3.4 Add Environment Variables

```
SEBELUM klik "Deploy", scroll ke "Environment" section

Tambahkan 9 environment variables:

1. DATABASE_URL
   Paste dari Neon string yang sudah dicopy di STEP 1.3

2. JWT_SECRET
   rahasia_super_kuat_2025!

3. JWT_EXPIRES_IN
   7d

4. PORT
   5000

5. CORS_ORIGIN
   https://YOUR-VERCEL-URL.vercel.app
   (GANTI dengan URL dari STEP 2.4, misalnya: https://sikari-xxxxx.vercel.app)

6. CLOUDINARY_CLOUD_NAME
   Root

7. CLOUDINARY_API_KEY
   125758891323684

8. CLOUDINARY_API_SECRET
   GNwsXb762pceeYtpYuI0WY5D5qw

9. NODE_ENV
   production

Klik "Add" untuk setiap variable
```

### 3.5 Deploy Backend

```
1. Setelah semua 9 env vars sudah ditambah, klik "Deploy"
2. Render akan:
   - Build project (~5 menit)
   - Run database migration (~2 menit)
   - Deploy (~2 menit)
3. Tunggu sampai status berubah ke "Live" (berwarna hijau)

✅ CATAT URL RENDER:
   Contoh: https://sikari-backend-xxxxx.onrender.com
```

**⚠️ PENTING:** Render free tier akan shutdown kalau tidak ada traffic 15 menit.  
Ini normal, akan auto-restart saat ada request.

---

## 🔄 STEP 4: UPDATE FRONTEND DENGAN BACKEND URL (5 MENIT)

### 4.1 Update Vercel Environment Variable

```
1. Go ke Vercel dashboard
2. Select project "sikari-frontend"
3. Klik "Settings" → "Environment Variables"
4. Klik "Add" atau "Edit"

Tambahkan/Update:
Variable Name: VITE_API_URL
Value: https://your-render-backend-url.onrender.com/api
(GANTI dengan URL dari STEP 3.5, misalnya: https://sikari-backend-xxxxx.onrender.com/api)

Klik "Save"
```

### 4.2 Redeploy Frontend

```
1. Klik tab "Deployments"
2. Cari deployment terakhir
3. Klik "..." (three dots)
4. Pilih "Redeploy" (atau trigger dari GitHub push)
5. Tunggu sampai status "Ready"
```

---

## 🧪 STEP 5: TESTING DEPLOYMENT (10 MENIT)

### 5.1 Test Frontend Access

```
1. Buka: https://your-vercel-url.vercel.app
2. Halaman seharusnya load dengan baik
3. Jangan masuk login dulu, cek layout dulu
```

### 5.2 Test Backend Connection

```
1. Buka browser console (F12)
2. Coba network request:
   - Refresh halaman, lihat di "Network" tab
   - Seharusnya API calls ke Render backend
   - Status 200 atau 304 = OK ✅
```

### 5.3 Test Registration

```
1. Pergi ke halaman Register
2. Isi form:
   - Nama Lengkap: Test User
   - Email: test@test.com
   - Password: Test123456!
   - Konfirmasi Password: Test123456!
3. Klik "Register"

Expected:
✅ Berhasil register, redirect ke login
❌ Error → lihat browser console (F12) untuk error message
```

### 5.4 Test Login

```
1. Isi email: test@test.com
2. Isi password: Test123456!
3. Klik "Login"

Expected:
✅ Berhasil login, masuk ke dashboard
✅ Token tersimpan di localStorage
❌ Error → lihat console (F12)
```

### 5.5 Test File Upload (Admin Feature)

```
1. Login sebagai admin
   Email: admin@desa.com (dari seed)
   Password: admin123

2. Pergi ke halaman dengan upload surat selesai
3. Upload file PDF
4. Cek di Cloudinary dashboard: https://cloudinary.com/console
   Folder: surat-desa/surat-selesai
   File seharusnya ada di sana
```

---

## 🆘 TROUBLESHOOTING

### Problem: Frontend error "Cannot connect to API"

**Cause:** VITE_API_URL tidak tepat atau backend belum live

**Solution:**

```
1. Check browser console (F12)
2. Lihat actual API URL yang dipanggil
3. Buka di browser: https://your-render-backend-url/api
   (tanpa '/api') → seharusnya error tapi menunjukkan backend running
4. Update VITE_API_URL di Vercel jika berbeda
5. Redeploy frontend
```

### Problem: Backend error "Database connection failed"

**Cause:** DATABASE_URL salah atau Neon project belum ready

**Solution:**

```
1. Check di Render dashboard → Logs
2. Cari error message "Database"
3. Verify DATABASE_URL di Neon console
4. Update di Render env vars
5. Manual redeploy di Render
```

### Problem: File upload failed di Cloudinary

**Cause:** API Key/Secret salah atau Cloudinary config error

**Solution:**

```
1. Verify di Cloudinary dashboard:
   - Cloud Name: Root ✅
   - API Key: 125758891323684 ✅
   - API Secret: Match dengan .env ✅
2. Check Render logs untuk Cloudinary error
3. Test locally dulu di localhost:5000
```

### Problem: CORS error "Access-Control-Allow-Origin"

**Cause:** CORS_ORIGIN di Render tidak match dengan Vercel URL

**Solution:**

```
1. Cek Vercel URL: https://dashboard.vercel.com
2. Update CORS_ORIGIN di Render env vars dengan exact URL
3. Contoh:
   ❌ WRONG: https://sikari.vercel.app/  (ada slash akhir)
   ✅ RIGHT: https://sikari.vercel.app   (tanpa slash)
4. Redeploy backend di Render
```

---

## ✅ COMPLETION CHECKLIST

```
[ ] Neon project created & DATABASE_URL copied
[ ] Frontend deployed to Vercel & URL noted
[ ] Backend deployed to Render with all 9 env vars
[ ] Backend Prisma migration success (check Render logs)
[ ] Frontend VITE_API_URL updated with Render URL
[ ] Frontend redeployed
[ ] Frontend loads without errors
[ ] Login/Register works
[ ] File upload to Cloudinary works
[ ] Database entries visible in Neon
```

---

## 📞 QUICK REFERENCE

### URLs & Credentials

| Service          | URL                                      | Akun          |
| ---------------- | ---------------------------------------- | ------------- |
| **Frontend**     | https://YOUR-VERCEL-URL.vercel.app       | ✅ Live       |
| **Backend API**  | https://YOUR-RENDER-URL.onrender.com/api | ✅ Live       |
| **Database**     | Neon Console                             | ✅ Configured |
| **File Storage** | Cloudinary CDN                           | ✅ Configured |

### Test Credentials

```
Admin Account (default seed):
Email: admin@desa.com
Password: admin123

Test Account (create baru):
Email: test@test.com
Password: Test123456!
```

### Important Files in Repo

```
backend/.env                          ← Main config (9 vars)
backend/src/app.js                    ← CORS config
backend/src/middleware/multerCloudinary.js  ← File upload
src/api.js                            ← Frontend API config
```

---

## 🎯 SUMMARY

**Total Steps:** 5  
**Total Duration:** ~45 minutes  
**Success Rate:** ✅ 99% (jika ikuti langkah dengan teliti)

**Order of Operations:**

1. ✅ Neon Database (DATABASE_URL copy)
2. ✅ Vercel Frontend (catat URL, belum connect ke backend)
3. ✅ Render Backend (pakai DATABASE_URL + update CORS_ORIGIN)
4. ✅ Vercel Frontend Update (inject VITE_API_URL, redeploy)
5. ✅ Testing (E2E verification)

**Good Luck! 🚀**

Jika ada error, lihat TROUBLESHOOTING section atau share error message di console ✅
