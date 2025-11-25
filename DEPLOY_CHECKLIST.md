# ✅ DEPLOYMENT CHECKLIST - READY TO COPY-PASTE

---

## PHASE 1: NEON DATABASE SETUP ⏱️ ~5 menit

### Step 1.1: Go to Neon Console

```
Open browser: https://console.neon.tech
Login dengan akun kamu
```

### Step 1.2: Create Project

```
Click "New Project"
- Project Name: surat-desa-db
- PostgreSQL: 17
- Click "Create Project"
```

### Step 1.3: Get Connection String

```
Setelah project created:
1. Klik tab "Connection strings"
2. Copy full string (format PostgreSQL)
3. Paste ke Notepad untuk sementara

Format: postgresql://user:password@host/dbname?sslmode=require

⭐ SAVE INI UNTUK RENDER NANTI
```

---

## PHASE 2: DEPLOY FRONTEND VERCEL ⏱️ ~10 menit

### Step 2.1: Open Vercel Dashboard

```
Go to: https://vercel.com/dashboard
Login dengan akun kamu
```

### Step 2.2: Import Project

```
Click "Add New" → "Project"
Click "Import Git Repository"
Paste: https://github.com/ebenlimbong/sikari
Click "Import"
```

### Step 2.3: Configure (IMPORTANT!)

```
Project Name: sikari-frontend
Framework: Vite (auto-detect)
Root Directory: . (dot - root directory)

Build Command: npm run build
Output Directory: dist
Install Command: npm install

Environment Variables:
⚠️ SKIP VITE_API_URL UNTUK SEKARANG

Click "Deploy"
```

### Step 2.4: Wait for Deployment

```
Status harus berubah ke "Ready" (hijau) ✅
Bisa memakan waktu 3-5 menit

⭐ COPY URL yang diberikan Vercel:
   https://sikari-xxxxx.vercel.app
```

**Save URL ini untuk Step 3.4 dan Step 4.1!**

---

## PHASE 3: DEPLOY BACKEND RENDER ⏱️ ~20 menit

### Step 3.1: Open Render Dashboard

```
Go to: https://dashboard.render.com
Login dengan akun kamu
```

### Step 3.2: Create Web Service

```
Click "New +"
Select "Web Service"
Select "Deploy an existing repository"

Search for: sikari
Select the one from: ebenlimbong/sikari
Click "Connect"
```

### Step 3.3: Configure Basic Settings

```
Name: sikari-backend
Environment: Node
Region: Singapore (atau terdekat)

Build Command:
cd backend && npm install && npx prisma generate && npx prisma migrate deploy

Start Command:
cd backend && npm start

Pricing Plan: Free

⚠️ JANGAN KLIK DEPLOY! Lanjut ke Step 3.4 DULU
```

### Step 3.4: Add Environment Variables (CRITICAL!)

```
⚠️ SEMUA 9 VARIABLES HARUS BENAR ⚠️

1. DATABASE_URL
   VALUE: [PASTE STRING DARI NEON - STEP 1.3]

2. JWT_SECRET
   VALUE: rahasia_super_kuat_2025!

3. JWT_EXPIRES_IN
   VALUE: 7d

4. PORT
   VALUE: 5000

5. CORS_ORIGIN
   VALUE: https://sikari-xxxxx.vercel.app
   (GANTI dengan Vercel URL dari STEP 2.4)
   ⚠️ TANPA /api di belakang!
   ⚠️ TANPA slash akhir!

6. CLOUDINARY_CLOUD_NAME
   VALUE: Root

7. CLOUDINARY_API_KEY
   VALUE: 125758891323684

8. CLOUDINARY_API_SECRET
   VALUE: GNwsXb762pceeYtpYuI0WY5D5qw

9. NODE_ENV
   VALUE: production

Click "Add" untuk setiap variable

DOUBLE CHECK sebelum Deploy!
```

### Step 3.5: Deploy Backend

```
Setelah semua env vars ditambah:
Click "Deploy"

Expected flow:
- Building... (~5 menit)
- Running migrations... (~2 menit)
- Deployed ✅

Status harus "Live" (hijau)

⭐ COPY URL RENDER yang diberikan:
   https://sikari-backend-xxxxx.onrender.com
```

**Save URL ini untuk Step 4.1!**

### Step 3.6: Verify Backend Health (Optional)

```
Buka di browser (akan error, tapi OK):
https://sikari-backend-xxxxx.onrender.com/api

Expected:
❌ 404 Not Found atau similar (normal! karena /api blm ada route)
✅ Berarti backend sudah running

Jika ❌ error berbeda atau timeout:
- Check Render logs (ada tab "Logs")
- Cari error message
- Fix dan redeploy
```

---

## PHASE 4: UPDATE FRONTEND WITH BACKEND URL ⏱️ ~5 menit

### Step 4.1: Update Vercel Environment Variable

```
Go to: https://vercel.com/dashboard
Select project: sikari-frontend
Click "Settings"
Click "Environment Variables"

Add new variable:
Name: VITE_API_URL
Value: https://sikari-backend-xxxxx.onrender.com/api
       (ganti dengan URL dari STEP 3.5)
       ⚠️ INCLUDE /api di belakang

Click "Save"
```

### Step 4.2: Trigger Redeploy

```
Option A (Automatic):
Push commit ke GitHub dengan perubahan apapun, atau

Option B (Manual):
Go to "Deployments" tab
Find latest deployment
Click "..." menu
Click "Redeploy"

Wait until "Ready" ✅
```

---

## PHASE 5: TESTING ⏱️ ~10 menit

### Step 5.1: Test Frontend Load

```
Open: https://sikari-xxxxx.vercel.app

Expected:
✅ Page load tanpa error
✅ Layout terlihat dengan baik
✅ No CORS error di console
```

### Step 5.2: Test API Connection

```
Open browser F12 (Developer Console)
Go to "Network" tab
Refresh page

Expected:
✅ API calls terbuat ke Render backend
✅ Status 200 atau 304
✅ No CORS error
```

### Step 5.3: Test Registration Flow

```
1. Go ke page Registration
2. Fill form:
   - Nama: Test User
   - Email: test@test.com
   - Password: Test123456!
   - Confirm: Test123456!
3. Click "Register"

Expected:
✅ Berhasil, redirect ke Login
✅ Data tersimpan di Neon database
```

### Step 5.4: Test Login Flow

```
1. Email: test@test.com
2. Password: Test123456!
3. Click "Login"

Expected:
✅ Berhasil login
✅ Redirect ke dashboard
✅ JWT token di localStorage (cek F12 Storage)
```

### Step 5.5: Test Admin Features

```
1. Test Login sebagai admin:
   Email: admin@desa.com
   Password: admin123
   (default dari database seed)

Expected:
✅ Admin dashboard load
✅ Can create/view/edit surat
```

### Step 5.6: Test File Upload (Optional)

```
1. As admin user, find file upload feature
2. Upload PDF file

Expected:
✅ File berhasil upload ke Cloudinary
✅ File URL tersimpan di database
✅ Cek di: https://cloudinary.com/console
   Folder: surat-desa/surat-selesai
```

---

## 🆘 IF SOMETHING GOES WRONG

### Error: "Cannot connect to API" atau "Network error"

**Quick Fix:**

```
1. Check browser F12 Console tab
2. Copy error message lengkap
3. Check Render Logs untuk backend error:
   https://dashboard.render.com → Select project → Logs tab
4. Common issues:
   ❌ DATABASE_URL salah/typo
   ❌ CORS_ORIGIN tidak match frontend URL
   ❌ Backend belum selesai deploy
5. Fix di Render Environment → Redeploy
```

### Error: "Database connection failed"

**Quick Fix:**

```
1. Check Neon connection string di Step 1.3
2. Verify DATABASE_URL di Render env vars
3. Paste full string dari Neon (jangan edit)
4. Redeploy Render
5. Check Render Logs untuk detail error
```

### Error: "CORS blocked origin"

**Quick Fix:**

```
1. Verify CORS_ORIGIN di Render = exact Vercel URL
2. ❌ WRONG: https://sikari.vercel.app/ (slash akhir)
3. ✅ RIGHT: https://sikari.vercel.app (no slash)
4. ❌ WRONG: sikari.vercel.app (no https://)
5. ✅ RIGHT: https://sikari.vercel.app
6. Update Render env var
7. Redeploy Render
8. Redeploy Vercel
```

### Error: File upload "Cloudinary error"

**Quick Fix:**

```
1. Verify credentials di backend/.env:
   - CLOUDINARY_CLOUD_NAME: Root
   - CLOUDINARY_API_KEY: 125758891323684
   - CLOUDINARY_API_SECRET: match exactly
2. Check di Render env vars (copy-paste ulang)
3. Redeploy Render
4. Check Render Logs untuk error detail
```

---

## 📝 FINAL VERIFICATION CHECKLIST

Tandai setiap item saat selesai:

```
[ ] Neon project created
[ ] DATABASE_URL copied & saved
[ ] Vercel frontend deployed ✅
[ ] Vercel URL noted: https://sikari-xxxxx.vercel.app
[ ] Render backend created with Web Service
[ ] All 9 env variables added to Render
[ ] Render backend deployed ✅
[ ] Render URL noted: https://sikari-backend-xxxxx.onrender.com
[ ] Vercel VITE_API_URL updated with Render URL
[ ] Vercel frontend redeployed ✅
[ ] Frontend loads without error
[ ] Login/Register flow works
[ ] Admin login works
[ ] File upload works (optional)
[ ] Database entries visible in Neon Console
```

---

## 📞 SAVED INFO TEMPLATE

Fill this as you go through deployment:

```
=== DEPLOYMENT INFO ===
Date: November 25, 2025

🔗 Vercel Frontend URL:
https://

🔗 Render Backend URL:
https://

📊 Neon Database:
postgresql://

🔐 Admin Test Credentials:
Email: admin@desa.com
Password: admin123

🧪 Test User Credentials:
Email: test@test.com
Password: Test123456!

📁 Cloudinary Folder:
surat-desa/surat-selesai

✅ Date Deployed: ___________
```

---

## 🎯 ORDER MATTERS!

```
1️⃣ Neon Setup (get DATABASE_URL)
   ↓
2️⃣ Vercel Deploy (get Frontend URL)
   ↓
3️⃣ Render Deploy (use Frontend URL in CORS_ORIGIN)
   ↓
4️⃣ Vercel Update (use Backend URL in VITE_API_URL)
   ↓
5️⃣ Testing (verify end-to-end)
```

⚠️ Jangan lompat-lompat urutan!

---

## 🚀 READY TO START?

Mulai dari PHASE 1 dan ikuti setiap step dengan teliti!

Kalau stuck, cek TROUBLESHOOTING section di atas.

Good luck! 🎉
