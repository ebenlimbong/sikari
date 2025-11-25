# 🎯 RAILWAY DEPLOYMENT - 2 THINGS TO FIX

**Status: Backend ✅ Live | Frontend ✅ Live | Connection ❌ Broken**

**Penyebab:** Frontend masih calling localhost padahal backend sudah di Railway

---

## 📌 PROBLEM SUMMARY

```
Apa yang terjadi:
┌────────────────────┐
│  Vercel Frontend   │
│  (Live ✅)         │
└────────────┬───────┘
             │
             │ API calls to:
             ▼
      http://localhost:5000/api ❌
             │
             │ Cannot reach!
             ▼
      ❌ ERROR: Connection refused
      ❌ Login gagal
      ❌ Register gagal

Padahal backend sudah live:
┌────────────────────────────────────────────────────┐
│  https://sikari-backend-production.up.railway.app/ │
│  (Live ✅ dan siap menerima requests)              │
└────────────────────────────────────────────────────┘

Solusi: Frontend harus call ke Railway URL!
```

---

## ✅ FIX #1: UPDATE VERCEL ENVIRONMENT VARIABLE

**Location:** Vercel Dashboard

**Action:** Update `VITE_API_URL` environment variable

### Step-by-Step:

```
1. Go to: https://vercel.com/dashboard

2. Select: sikari-frontend (atau project name mu)

3. Click: Settings (tab atas)

4. Left menu: Environment Variables

5. Find: VITE_API_URL

   ❌ Current (WRONG):
   VITE_API_URL = http://localhost:5000/api
   atau kosong/undefined

   ✅ Change to (RIGHT):
   VITE_API_URL = https://sikari-backend-production.up.railway.app/api

6. Click: Save

7. Vercel akan auto-redeploy
   (tunggu 3-5 menit sampai status "Ready" ✅)
```

### Quick Visual:

```
┌─────────────────────────────────────────────┐
│ Vercel Dashboard                            │
├─────────────────────────────────────────────┤
│ Settings → Environment Variables            │
├─────────────────────────────────────────────┤
│                                             │
│ VITE_API_URL                                │
│                                             │
│ ┌───────────────────────────────────────┐  │
│ │ https://sikari-backend-production.up. │  │
│ │ railway.app/api                       │  │
│ └───────────────────────────────────────┘  │
│                                             │
│              [Save]                        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## ✅ FIX #2: VERIFY RAILWAY BACKEND CORS

**Location:** Railway Dashboard

**Check:** Pastikan backend tahu boleh terima request dari Vercel

### Step-by-Step:

```
1. Go to: https://railway.app/dashboard

2. Select: sikari-backend-production
   (atau backend service name mu)

3. Click: Variables tab

4. Check: CORS_ORIGIN variable

   ❌ If MISSING or WRONG:
   Tambah/update CORS_ORIGIN

   ✅ Should be:
   CORS_ORIGIN = https://[your-vercel-url].vercel.app

   EXAMPLE:
   CORS_ORIGIN = https://sikari-frontend-xxx.vercel.app

   ⚠️ PENTING:
   - Harus https://
   - Harus exact Vercel URL mu
   - JANGAN add /api
   - JANGAN add trailing slash

5. Save (Railway auto-redeploy)

6. Check: Logs tab → verify "Healthy" status
   (tunggu ~2 menit)
```

### Verify ALL 9 Variables ada:

```
Railway Variables checklist:
[ ] DATABASE_URL (PostgreSQL connection)
[ ] JWT_SECRET (rahasia_super_kuat_2025!)
[ ] JWT_EXPIRES_IN (7d)
[ ] PORT (5000)
[ ] CORS_ORIGIN (Vercel URL - UPDATE INI!)
[ ] CLOUDINARY_CLOUD_NAME (Root)
[ ] CLOUDINARY_API_KEY (125758891323684)
[ ] CLOUDINARY_API_SECRET (GNwsXb762pceeYtpYuI0WY5D5qw)
[ ] NODE_ENV (production)

Jika ada yang kurang → tambah!
```

---

## 🧪 TESTING SETELAH FIX

**Tunggu semua redeploy selesai (~8-10 menit), lalu:**

### Test 1: Check Frontend API Connection

```
1. Open: https://[your-vercel-url].vercel.app
   (bukan localhost!)

2. Open Browser F12 (Ctrl+Shift+I atau Cmd+Option+I)

3. Go to Console tab

4. Check untuk error:
   ✅ Tidak ada error
   ✅ Tidak ada "localhost" di error message
   ✅ Tidak ada CORS error

5. Go to Network tab

6. Refresh halaman

7. Cari request yang pergi ke API:
   ✅ URL harus ke: https://sikari-backend-production.up.railway.app/api
   ✅ BUKAN localhost:5000
   ✅ Status harus 200 OK atau valid response
```

### Test 2: Try Login/Register

```
1. Go to Register page

2. Fill form:
   - Nama Depan: Test
   - Nama Belakang: User
   - Username: testuser123
   - Email: test@example.com
   - Password: Test123456!
   - etc.

3. Click Register

Expected:
✅ Success → redirect to Login
✅ Data tersimpan di Railway PostgreSQL

If error:
❌ Check F12 Console untuk exact error message
❌ Check Browser Network tab:
   - Request URL correct?
   - Response status?
   - Error message dari backend?
```

### Test 3: Check Network Tab Details

```
1. Open F12 → Network tab

2. Try Register

3. Find POST request ke /api/auth/register

4. Click request → lihat details:

   Request Headers:
   - URL: https://sikari-backend-production.up.railway.app/api/auth/register
   - Method: POST
   - Headers: Content-Type: application/json

   Response Headers:
   - Status: 200 OK (atau valid status)
   - Headers: Access-Control-Allow-Origin: https://[vercel-url].vercel.app

   Response Body:
   - Should show success or error message
```

---

## 🎯 EXPECTED FLOW SETELAH FIX

```
Browser (Vercel Frontend)
    ↓
    │ VITE_API_URL injected:
    │ https://sikari-backend-production.up.railway.app/api
    ↓
POST /auth/register
    ↓
Railway Backend (sikari-backend-production)
    ↓
    │ Check CORS_ORIGIN:
    │ Request from: https://[vercel-url].vercel.app
    │ Allowed origin? YES! ✅
    ↓
Express App
    ↓
    │ Hash password
    │ Insert ke database
    │ Return JWT token
    ↓
Response: { success: true, message: "Register successful" }
    ↓
Browser localStorage simpan token
    ↓
✅ Redirect ke Login
```

---

## ✨ SUCCESS CHECKLIST

Setelah semua fix:

```
AFTER DEPLOYING FIXES:
═════════════════════════════════════════════

[ ] Vercel VITE_API_URL updated
    Value: https://sikari-backend-production.up.railway.app/api

[ ] Vercel frontend redeployed
    Status: Ready ✅

[ ] Railway CORS_ORIGIN verified
    Value: https://[your-vercel-url].vercel.app

[ ] Railway backend healthy
    Status: Healthy ✅

[ ] Frontend loads without error
    F12 Console: No errors

[ ] Network tab shows Railway URLs
    Requests to: sikari-backend-production.up.railway.app

[ ] Register works
    Can create new account ✅

[ ] Login works
    Can login with credentials ✅

[ ] Dashboard loads
    Logged in user can see dashboard ✅

[ ] File upload works (if admin)
    Can upload to Cloudinary ✅

EVERYTHING WORKS → 🎉 DEPLOYMENT COMPLETE!
```

---

## 🚨 IF STILL ERROR

**Error persists setelah semua fix?**

### Debug steps:

```
1. Check Vercel Logs
   Dashboard → Deployments → Click latest → Logs tab
   Search untuk: error, fail, localhost

2. Check Railway Logs
   Dashboard → sikari-backend-production → Logs tab
   Search untuk: CORS, error, Error

3. Verify Network Tab (F12)
   - Request URL correct?
   - Response status?
   - CORS headers present?

4. Check Firebase/Railway Console
   - Database records created?
   - No permission errors?

5. Clear cache & restart:
   - F12 Settings → check "Disable cache"
   - Refresh (Ctrl+F5)
   - Close browser completely
   - Reopen & test
```

---

## 📋 SUMMARY

```
Problem:
Frontend pointing to localhost instead of Railway backend

Solution (2 fixes):
1. Vercel: Update VITE_API_URL env var
   → https://sikari-backend-production.up.railway.app/api

2. Railway: Verify CORS_ORIGIN env var
   → https://[your-vercel-url].vercel.app

Time needed: ~10-15 minutes total
Success rate: 99% if follow steps exactly ✅

Next: Test login/register/upload to verify E2E flow works
```

---

## 📚 REFERENCE FILES

For more details, see:

- `FIX_API_URL_RAILWAY.md` - Detailed Vercel fix
- `CHECK_RAILWAY_CORS.md` - Detailed Railway fix
- `backend/src/app.js` - CORS configuration logic

---

**Railway Backend:** https://sikari-backend-production.up.railway.app/  
**Vercel Frontend:** https://[your-url].vercel.app  
**API Endpoint:** [Frontend VITE_API_URL]/api/auth/login

**Let's fix this! Start with FIX #1: Update Vercel VITE_API_URL 🚀**
