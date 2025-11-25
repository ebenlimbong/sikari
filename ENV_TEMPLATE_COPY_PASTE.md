# 📋 ENVIRONMENT VARIABLES COPY-PASTE TEMPLATE

**GUNAKAN FILE INI UNTUK COPY-PASTE KE PLATFORM DASHBOARD**

---

## 🔴 RENDER BACKEND - ENVIRONMENT VARIABLES

Salin dan paste ke Render dashboard (ada 9 field)

**URL:** https://dashboard.render.com → Web Service → Environment

```
Field 1: DATABASE_URL
Value: [PASTE FROM NEON STEP - full connection string]
```

```
Field 2: JWT_SECRET
Value: rahasia_super_kuat_2025!
```

```
Field 3: JWT_EXPIRES_IN
Value: 7d
```

```
Field 4: PORT
Value: 5000
```

```
Field 5: CORS_ORIGIN
Value: https://XXXX.vercel.app
[REPLACE XXXX dengan project name Vercel mu]
```

```
Field 6: CLOUDINARY_CLOUD_NAME
Value: Root
```

```
Field 7: CLOUDINARY_API_KEY
Value: 125758891323684
```

```
Field 8: CLOUDINARY_API_SECRET
Value: GNwsXb762pceeYtpYuI0WY5D5qw
```

```
Field 9: NODE_ENV
Value: production
```

---

## 🔵 VERCEL FRONTEND - ENVIRONMENT VARIABLES

Salin dan paste ke Vercel dashboard (hanya 1 field)

**URL:** https://vercel.com/dashboard → Project → Settings → Environment Variables

```
Field 1: VITE_API_URL
Value: https://XXXX.onrender.com/api
[REPLACE XXXX dengan backend URL dari Render]
[INCLUDE /api di belakang!]
```

---

## 📝 FILL IN AS YOU GO

Template untuk catat value saat deployment:

```
═══════════════════════════════════════════════════════════
                    DEPLOYMENT INFO
═══════════════════════════════════════════════════════════

📅 Tanggal Deploy: _____________________

🗄️ NEON DATABASE:
   Connection String: 
   postgresql://
   _____________________________________________
   
   (Notes: 
   _________________________________________________
   )

🌐 VERCEL FRONTEND:
   Project Name: _________________________________
   URL: https://_________________________________
   
   (Status: [ ] Deployed [ ] Pending [ ] Error)

🖥️ RENDER BACKEND:
   Service Name: _________________________________
   URL: https://_________________________________.onrender.com
   
   (Status: [ ] Deployed [ ] Pending [ ] Error)
   (First deployment may take 10-15 minutes)

✅ ENVIRONMENT VARIABLES ADDED:
   [ ] Render: 9 variables complete
   [ ] Vercel: 1 variable (VITE_API_URL) complete

🧪 TESTING STATUS:
   [ ] Frontend loads: YES / NO
   [ ] No CORS error: YES / NO
   [ ] Registration works: YES / NO
   [ ] Login works: YES / NO
   [ ] File upload works: YES / NO
   
═══════════════════════════════════════════════════════════
```

---

## 🚨 VALIDATION CHECKLIST

Sebelum klik Deploy di Render & Vercel, validate semua value:

```
Render Validation:
┌─────────────────────────────────────────────────────────┐
│ [ ] DATABASE_URL contains: postgresql:// prefix        │
│ [ ] DATABASE_URL contains: sslmode=require suffix       │
│ [ ] JWT_SECRET tidak kosong                            │
│ [ ] JWT_EXPIRES_IN = 7d                                │
│ [ ] PORT = 5000                                        │
│ [ ] CORS_ORIGIN matches Vercel URL (no http://)        │
│ [ ] CORS_ORIGIN no trailing slash                      │
│ [ ] CLOUDINARY vars tidak modified                     │
│ [ ] NODE_ENV = production                              │
│                                                         │
│ TOTAL: 9 variables harus ada sebelum Deploy            │
└─────────────────────────────────────────────────────────┘

Vercel Validation:
┌─────────────────────────────────────────────────────────┐
│ [ ] VITE_API_URL starts with https://                  │
│ [ ] VITE_API_URL ends with .onrender.com/api           │
│ [ ] No typo in domain name                             │
│                                                         │
│ TOTAL: 1 variable (rest auto-inject dari Vite build)   │
└─────────────────────────────────────────────────────────┘
```

---

## 🔗 QUICK REFERENCE

### Values That NEVER Change

```
JWT_SECRET=rahasia_super_kuat_2025!
JWT_EXPIRES_IN=7d
PORT=5000
CLOUDINARY_CLOUD_NAME=Root
CLOUDINARY_API_KEY=125758891323684
CLOUDINARY_API_SECRET=GNwsXb762pceeYtpYuI0WY5D5qw
NODE_ENV=production
```

### Values That CHANGE (Per Deployment)

```
DATABASE_URL = [From Neon, unique per account]
CORS_ORIGIN = [From Vercel, unique per deployment]
VITE_API_URL = [From Render, unique per deployment]
```

---

## 📱 PLATFORM DASHBOARD LINKS

Click langsung ke dashboard:

- **Neon Console**: https://console.neon.tech
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **Cloudinary Console**: https://cloudinary.com/console

---

## ⚠️ BEFORE YOU DEPLOY

Final checklist:

```
Production Deployment Pre-Check:
[ ] Read QUICK_START.md (visual guide)
[ ] Read DEPLOY_CHECKLIST.md (detailed steps)
[ ] All 9 Render env vars prepared
[ ] All 1 Vercel env var prepared
[ ] DATABASE_URL from Neon copied (full string)
[ ] Vercel Frontend URL noted
[ ] Database backup done (local)
[ ] GitHub branches up to date
[ ] Ready? → Start STEP 1: Neon Database
```

---

## 🎯 EXAMPLE COMPLETED FORM

(Ini contoh, sesuaikan dengan value kamu)

```
✅ RENDER BACKEND ENVIRONMENT VARIABLES

Field 1: DATABASE_URL
Value: postgresql://neondb_owner:abc123def456@ep-yellow-fire-123456.us-east-1.aws.neon.tech/surat_db?sslmode=require

Field 2: JWT_SECRET
Value: rahasia_super_kuat_2025!

Field 3: JWT_EXPIRES_IN
Value: 7d

Field 4: PORT
Value: 5000

Field 5: CORS_ORIGIN
Value: https://sikari-frontend.vercel.app

Field 6: CLOUDINARY_CLOUD_NAME
Value: Root

Field 7: CLOUDINARY_API_KEY
Value: 125758891323684

Field 8: CLOUDINARY_API_SECRET
Value: GNwsXb762pceeYtpYuI0WY5D5qw

Field 9: NODE_ENV
Value: production

═════════════════════════════════════════════════════════════

✅ VERCEL FRONTEND ENVIRONMENT VARIABLES

Field 1: VITE_API_URL
Value: https://sikari-backend-12345.onrender.com/api

(Redeploy frontend setelah set ini)
```

---

## 📞 SUPPORT

Kalau ada error saat paste value:

```
❌ "Invalid format" error
→ Jangan ubah format, copy-paste exact dari sumber
→ DATABASE_URL harus utuh dengan ?sslmode=require

❌ "Value too long" error
→ Check CLOUDINARY_API_SECRET tidak terpotong
→ Paste fullength tanpa spasi di awal/akhir

❌ "Invalid URL" error (CORS_ORIGIN/VITE_API_URL)
→ Check tidak ada typo
→ Check include https:// prefix
→ Check include /api suffix untuk VITE_API_URL
→ Check no trailing slash

❌ "Characters not allowed" error
→ Copy-paste exact, jangan tambah character
→ Check no space di awal/akhir value
```

---

**Ready? Mulai dari STEP 1: Neon Database! 🚀**
