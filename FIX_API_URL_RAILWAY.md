# 🔧 FIX FRONTEND API URL - RAILWAY BACKEND

**Masalah:** Frontend masih calling `localhost` bukan Railway backend

**Solusi:** Update VITE_API_URL di Vercel environment

---

## 📋 LANGKAH PERBAIKAN

### STEP 1: Go to Vercel Dashboard

```
URL: https://vercel.com/dashboard
```

### STEP 2: Select Project

```
Click on: sikari-frontend
(atau nama project Vercel kamu)
```

### STEP 3: Go to Settings

```
Click tab: Settings
```

### STEP 4: Environment Variables

```
Left menu → Environment Variables
```

### STEP 5: Find or Create VITE_API_URL

```
Current value (❌ WRONG):
- VITE_API_URL = http://localhost:5000/api
- atau kosong/tidak ada

Correct value (✅ RIGHT):
- VITE_API_URL = https://sikari-backend-production.up.railway.app/api

Langkah:
1. Cari VITE_API_URL di list
2. Jika ada → Edit, ganti valuenya
3. Jika tidak ada → Create new, tambah VITE_API_URL

VALUE BARU:
https://sikari-backend-production.up.railway.app/api
```

### STEP 6: Save dan Trigger Redeploy

```
1. Click "Save"
2. Vercel akan auto-redeploy
   (atau klik "Redeploy" di tab Deployments)
3. Tunggu status berubah menjadi "Ready" ✅
   (biasanya 3-5 menit)
```

### STEP 7: Verify pada URL Browser

```
Buka: https://[your-vercel-url].vercel.app
(bukan localhost)
```

---

## 🔍 VERIFICATION CHECKLIST

Setelah Vercel redeploy:

```
✅ Frontend Checks:
[ ] Open browser dengan URL Vercel mu
[ ] Check browser F12 → Console
[ ] Tidak ada CORS error
[ ] Tidak ada "localhost" di error message

✅ API Checks (F12 Network tab):
[ ] Buka F12 → Network tab
[ ] Refresh halaman
[ ] Cari request ke /api (bukan localhost!)
[ ] Request harus ke: https://sikari-backend-production.up.railway.app/api/...
[ ] Status harus 200 atau valid response

✅ Login Test:
[ ] Coba login dengan test account
[ ] Jika berhasil → data dari Railway ✅
[ ] Jika gagal → lihat error di F12 Console
```

---

## 🆘 JIKA MASIH ERROR

### Error: "Cannot connect to backend" atau "Network error"

**Debug:**

```
1. Open F12 Console (Ctrl+Shift+I)
2. Cari error message lengkap
3. Check Network tab → lihat request URL
4. Verifikasi URL sudah ke Railway (bukan localhost)
```

**Kemungkinan penyebab:**

**1️⃣ VITE_API_URL tidak ter-update di Vercel**

```
Fix:
- Cek Vercel dashboard Environment Variables
- Pastikan VITE_API_URL = https://sikari-backend-production.up.railway.app/api
- Redeploy frontend
```

**2️⃣ Frontend cache di browser**

```
Fix:
- Buka Developer Tools → Settings
- Check "Disable cache" checkbox
- Refresh halaman (Ctrl+F5 atau Cmd+Shift+R)
```

**3️⃣ Railway backend CORS blocking frontend**

```
Check:
- Buka Railway dashboard
- Go to Variables tab di backend service
- Verifikasi CORS_ORIGIN setting
- Seharusnya ada Vercel URL mu

Fix jika salah:
- Update CORS_ORIGIN ke Vercel URL
- Redeploy Railway backend
```

**4️⃣ Vercel build cache**

```
Fix:
- Go to Vercel dashboard
- Tab Deployments
- Find latest deployment
- Click "..." menu
- Select "Redeploy" (dengan checkbox: Clear Build Cache)
```

---

## 📝 EXPECTED BEHAVIOR SETELAH FIX

### Before (❌ Tidak berfungsi)

```
Browser Console Error:
"ERR_BLOCKED_BY_CLIENT"
"Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

API Calls:
→ http://localhost:5000/api/auth/login (WRONG - localhost)

Result:
❌ Login gagal
❌ Register gagal
❌ Can't reach backend
```

### After (✅ Berfungsi)

```
Browser Console:
No error atau 200 OK

API Calls:
→ https://sikari-backend-production.up.railway.app/api/auth/login ✅

Network Tab:
Status: 200 OK
Response: { success: true, token: "jwt_token..." }

Result:
✅ Login berhasil
✅ Register berhasil
✅ Token tersimpan di localStorage
✅ Dashboard bisa diakses
```

---

## 📞 QUICK REFERENCE

```
❌ OLD (localhost):
VITE_API_URL = http://localhost:5000/api

✅ NEW (Railway):
VITE_API_URL = https://sikari-backend-production.up.railway.app/api
```

---

## 🎯 NEXT STEPS

1. ✅ Update VITE_API_URL di Vercel
2. ✅ Wait for Vercel redeploy (3-5 min)
3. ✅ Test login/register
4. ✅ Verify Network tab showing Railway URLs
5. ✅ Check database di Railway (user baru harus tersimpan)

**If everything works: DEPLOYMENT COMPLETE! 🎉**

---

Generated: November 25, 2025  
Backend: https://sikari-backend-production.up.railway.app/ ✅  
Frontend: https://vercel-url.vercel.app (akan di-update)
