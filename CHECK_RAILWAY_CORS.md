# 🔍 CHECK RAILWAY BACKEND CORS CONFIGURATION

**Penting:** Backend Railway juga harus tahu frontend URL untuk CORS!

---

## 📋 VERIFICATION STEPS

### STEP 1: Check Railway Dashboard

```
URL: https://railway.app/dashboard
Login dengan akun Railway kamu
```

### STEP 2: Select Backend Service

```
Pilih: sikari-backend-production
(atau nama service mu)
```

### STEP 3: Go to Variables Tab

```
Click: Variables tab
```

### STEP 4: Check CORS_ORIGIN Variable

```
Cari variable: CORS_ORIGIN

Seharusnya current value:
CORS_ORIGIN = https://[your-vercel-url].vercel.app

❌ JIKA TIDAK ADA atau KOSONG:
→ Ini masalah! Backend tidak tahu boleh menerima request dari frontend

✅ JIKA ADA:
→ Verify URLnya benar (sesuai dengan Vercel frontend URL mu)
```

---

## 🔧 FIX: UPDATE CORS_ORIGIN DI RAILWAY

**Jika CORS_ORIGIN belum di-set atau salah:**

### STEP 1: Edit Variable

```
Di Railway Variables tab:
1. Find CORS_ORIGIN
2. Click edit (atau delete lalu add baru jika tidak ada)
```

### STEP 2: Set Vercel Frontend URL

```
Variable Name: CORS_ORIGIN
Value: https://[your-vercel-url].vercel.app

CONTOH (sesuaikan dengan URL Vercel mu):
https://sikari-frontend-xxx.vercel.app
https://my-admin-panel.vercel.app
dll.

⚠️ PENTING:
- Harus include https://
- Harus exact domain (beda port = different origin)
- JANGAN tambah /api atau path apapun
- JANGAN ada trailing slash
```

### STEP 3: Save dan Redeploy

```
1. Click Save
2. Railway akan auto-redeploy backend
   (tunggu status berubah ke "Healthy")
3. Check Logs untuk verify deployment success
```

---

## 📝 ALL RAILWAY BACKEND VARIABLES

Verify semua 9 variables sudah ada di Railway:

```
Harus ada di Railway Variables:

[ ] DATABASE_URL
    (PostgreSQL connection string)

[ ] JWT_SECRET
    (Untuk sign token)

[ ] JWT_EXPIRES_IN
    (Biasanya: 7d)

[ ] PORT
    (Biasanya: 5000)

[ ] CORS_ORIGIN
    (Frontend Vercel URL - PENTING!)

[ ] CLOUDINARY_CLOUD_NAME
    (Value: Root)

[ ] CLOUDINARY_API_KEY
    (Value: 125758891323684)

[ ] CLOUDINARY_API_SECRET
    (Value: GNwsXb762pceeYtpYuI0WY5D5qw)

[ ] NODE_ENV
    (Value: production)
```

Jika ada yang kurang → tambah!

---

## 🧪 HOW TO TEST CORS FIX

Setelah update CORS_ORIGIN di Railway:

### Method 1: Browser

```
1. Buka Vercel frontend URL
2. Open F12 Console
3. Coba login
4. Check Network tab:
   - Request ke https://sikari-backend-production.up.railway.app/api/auth/login
   - Response status: 200 OK
   - Header: Access-Control-Allow-Origin: https://[vercel-url].vercel.app
```

### Method 2: Test API

```
curl -i \
  -H "Origin: https://[your-vercel-url].vercel.app" \
  https://sikari-backend-production.up.railway.app/api

Expected response:
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://[your-vercel-url].vercel.app
```

---

## 🎯 COMPLETE FIX CHECKLIST

**Harus di-complete dalam urutan ini:**

```
PART 1: Frontend (Vercel)
═════════════════════════
[ ] 1. Go to Vercel dashboard
[ ] 2. Select project
[ ] 3. Go to Settings → Environment Variables
[ ] 4. Create/Update VITE_API_URL
[ ] 5. Value: https://sikari-backend-production.up.railway.app/api
[ ] 6. Save
[ ] 7. Wait for redeploy (3-5 min) → Status "Ready" ✅

PART 2: Backend (Railway)
═════════════════════════
[ ] 1. Go to Railway dashboard
[ ] 2. Select backend service
[ ] 3. Go to Variables tab
[ ] 4. Create/Update CORS_ORIGIN
[ ] 5. Value: https://[your-vercel-url].vercel.app
[ ] 6. Save
[ ] 7. Wait for redeploy → Status "Healthy" ✅

PART 3: Testing
═════════════════════════
[ ] 1. Open Vercel frontend URL
[ ] 2. Open F12 Console
[ ] 3. Coba Register → berhasil?
[ ] 4. Coba Login → berhasil?
[ ] 5. Check Database di Railway
[ ] 6. Check Cloudinary folder untuk uploads

ALL PASSED → DEPLOYMENT COMPLETE! 🎉
```

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: "CORS Error: Not allowed by origin"

```
Cause: CORS_ORIGIN di Railway tidak match Vercel URL

Fix:
1. Check Railway CORS_ORIGIN variable
2. Verify value sama dengan Vercel URL
3. Tidak ada typo
4. Exact match (beda port = different origin)
5. Redeploy Railway
```

### Issue 2: "Cannot POST /api/auth/login"

```
Cause: Request masuk ke backend tapi tidak ke server

Fix:
1. Check Railway backend service status → "Healthy"?
2. Check Railway Logs untuk error
3. Verify DATABASE_URL tersetting
4. Verify PORT = 5000
5. Redeploy Railway
```

### Issue 3: "500 Internal Server Error"

```
Cause: Backend error (bukan CORS)

Fix:
1. Go to Railway Logs tab
2. Search untuk "error" atau "Error"
3. Cari exact error message
4. Common errors:
   - DATABASE connection failed → check DATABASE_URL
   - CloudinaryError → check Cloudinary vars
   - Unhandled exception → check logs untuk stacktrace
```

### Issue 4: Login works tapi "data undefined" atau fields kosong

```
Cause: Database query working tapi data struktur salah

Fix:
1. Check backend logs untuk actual response
2. Verify DATABASE_URL pointing ke correct database
3. Verify migrations sudah run
4. Check user record di database (valid data?)
5. Redeploy backend
```

---

## 📞 NEXT STEPS

1. ✅ **Update VITE_API_URL di Vercel** ← DO THIS FIRST
2. ✅ **Verify CORS_ORIGIN di Railway** ← DO THIS SECOND
3. ✅ **Wait for both redeployments** (5-10 min total)
4. ✅ **Test login/register**
5. ✅ **Check browser F12 Network tab** (requests to Railway, not localhost)
6. ✅ **Verify database entries** (di Railway PostgreSQL)

---

## ✨ SUCCESS INDICATORS

Jika semua berhasil:

```
✅ Login page loads
✅ Can register new account
✅ Can login with credentials
✅ Redirected to dashboard
✅ JWT token di localStorage
✅ Can navigate between pages
✅ File upload works (if admin)
✅ No console errors
✅ No CORS errors
✅ Network requests to Railway backend (not localhost)
```

---

**Railway Backend:** https://sikari-backend-production.up.railway.app/ ✅  
**Railway Variables:** Must include CORS_ORIGIN + 8 others  
**Frontend Update:** VITE_API_URL = Railway backend URL + /api

**Let's fix this! 🚀**
