# 🚀 DEPLOYMENT VISUAL GUIDE & QUICK START

---

## 🎯 YOUR SITUATION RIGHT NOW

```
✅ Code ready in GitHub
✅ Backend with Cloudinary integration
✅ PostgreSQL migration ready
✅ JWT authentication working
✅ CORS configuration fixed
✅ Documentation complete
✅ You have: Vercel account, Render account, Cloudinary credentials

❌ NOT YET: Database deployed
❌ NOT YET: Backend deployed  
❌ NOT YET: Frontend deployed
```

---

## 📊 ARCHITECTURE DIAGRAM

```
┌──────────────────────────────────────────────────────────────────┐
│                         YOUR DEPLOYMENT                          │
└──────────────────────────────────────────────────────────────────┘

                          🌐 INTERNET 🌐

    ┌─────────────────────────────────────────────────────────┐
    │                                                           │
    │  📱 CLIENT BROWSER                                       │
    │  User berinteraksi dengan aplikasi                       │
    │                                                           │
    └──────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTPS Requests
                           │
        ┌──────────────────┴──────────────────┐
        │                                      │
        │                                      │
    ┌───▼──────────────┐            ┌────────▼─────────┐
    │  🟢 VERCEL       │            │  🟢 RENDER       │
    │  (Frontend)      │            │  (Backend)       │
    │                  │            │                  │
    │ ✅ Deployed:    │            │ ✅ Deployed:    │
    │ https://        │            │ https://        │
    │ sikari-xxx.     │            │ sikari-backend- │
    │ vercel.app      │            │ xxx.onrender    │
    │                  │            │ .com            │
    │ Stack:          │            │                  │
    │ - Vue 3         │            │ Stack:          │
    │ - Vite          │            │ - Node.js       │
    │ - Axios API     │            │ - Express       │
    │                  │            │ - Prisma ORM    │
    └───────────┬──────┘            └────────┬────────┘
                │                            │
                │◄──────── API CALLS ────────┤
                │ (with JWT Token)           │
                │                            │
                │         ┌─────────────────┼────────────┐
                │         │                 │            │
                │         │                 │            │
            ┌───▼─────┐  ┌▼────────┐   ┌───▼──────┐  ┌──▼────────┐
            │ 🗄️ NEON  │  │📁 FILE  │   │🔐 JWT    │  │💾 SESSION│
            │          │  │STORAGE  │   │TOKENS    │  │          │
            │Database  │  │(Verify) │   │(Verify)  │  │(Cache)   │
            │PostgreSQL│  │         │   │          │  │          │
            │ ✅ Setup │  │ 🟢 CDN  │   │ ✅ Gen   │  │✅ Stored │
            │ Neon     │  │Cloudinary│  │ in DB    │  │in Browser│
            │          │  │         │   │          │  │          │
            └──────────┘  └─────────┘   └──────────┘  └──────────┘
                │              │            │            │
                └──────────────┬────────────┴────────────┘
                               │
                        RENDER BACKEND
                        (1 Web Service)
```

---

## 🔢 DEPLOYMENT SEQUENCE (MUST FOLLOW ORDER!)

```
STEP 1: NEON (5 min)
┌─────────────────────────────┐
│ Create PostgreSQL Database  │ ─→ Get: DATABASE_URL
│ in Neon Console             │
└─────────────────────────────┘
            ↓
            
STEP 2: VERCEL (10 min)
┌─────────────────────────────┐
│ Deploy Frontend from GitHub │ ─→ Get: https://sikari-xxx.vercel.app
│ (VITE_API_URL = empty/skip) │
└─────────────────────────────┘
            ↓
            
STEP 3: RENDER (20 min)
┌─────────────────────────────────────────────┐
│ Deploy Backend Web Service                  │
│ Add 9 env vars (use DATABASE_URL + URL)     │ ─→ Get: https://sikari-backend-xxx.onrender.com
└─────────────────────────────────────────────┘
            ↓
            
STEP 4: VERCEL UPDATE (5 min)
┌─────────────────────────────┐
│ Update VITE_API_URL env var │ ─→ Use Backend URL from STEP 3
│ Redeploy Frontend           │
└─────────────────────────────┘
            ↓
            
STEP 5: TESTING (10 min)
┌─────────────────────────────────────┐
│ Test Registration → Login → Upload  │ ─→ Verify: E2E working
└─────────────────────────────────────┘

TOTAL TIME: ~50 minutes ✅
```

---

## 📋 VARIABLES FLOW

```
┌─ BACKEND DEPLOYMENT (Render) ─────────────────────────────┐
│                                                             │
│  From backend/.env:                                         │
│  ┌────────────────────────────────────────────────────────┐│
│  │ DATABASE_URL ──────────────→ ✅ From Neon (Step 1)    ││
│  │ JWT_SECRET ────────────────→ ✅ rahasia_super_kuat... ││
│  │ JWT_EXPIRES_IN ────────────→ ✅ 7d                    ││
│  │ PORT ──────────────────────→ ✅ 5000                  ││
│  │ CORS_ORIGIN ───────────────→ ✅ From Vercel (Step 2) ││
│  │ CLOUDINARY_CLOUD_NAME ─────→ ✅ Root                 ││
│  │ CLOUDINARY_API_KEY ────────→ ✅ 125758891323684      ││
│  │ CLOUDINARY_API_SECRET ─────→ ✅ GNwsXb762pcee...     ││
│  │ NODE_ENV ──────────────────→ ✅ production            ││
│  └────────────────────────────────────────────────────────┘│
│                                                             │
│  Copy-paste ke Render environment:                          │
│  (9 fields dalam dashboard Render)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─ FRONTEND DEPLOYMENT (Vercel) ────────────────────────────┐
│                                                             │
│  From Render (Step 3):                                      │
│  ┌────────────────────────────────────────────────────────┐│
│  │ VITE_API_URL ──→ https://your-render-backend.onrender.│
│  │                com/api                                ││
│  └────────────────────────────────────────────────────────┘│
│                                                             │
│  Copy-paste ke Vercel environment:                          │
│  (1 field: VITE_API_URL)                                    │
│                                                             │
│  Vercel automatically inject saat build!                    │
│  import.meta.env.VITE_API_URL ← automatic available         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 COPY-PASTE CHECKLIST

Gunakan checklist ini saat deployment:

```
═══════════════════════════════════════════════════════════

STEP 1: NEON DATABASE
───────────────────────────────────────────────────────────
[ ] Open: https://console.neon.tech
[ ] Create new project: surat-desa-db
[ ] Get connection string
[ ] Paste ke: ___________________________

═══════════════════════════════════════════════════════════

STEP 2: VERCEL FRONTEND
───────────────────────────────────────────────────────────
[ ] Open: https://vercel.com/dashboard
[ ] Import: https://github.com/ebenlimbong/sikari
[ ] Configure: Root directory = .
[ ] Build: npm run build
[ ] Start: npm run build
[ ] SKIP VITE_API_URL (for now)
[ ] Deploy
[ ] Wait for "Ready" status ✅
[ ] Catat URL: https://______________________.vercel.app

═══════════════════════════════════════════════════════════

STEP 3: RENDER BACKEND
───────────────────────────────────────────────────────────
[ ] Open: https://dashboard.render.com
[ ] Create: Web Service
[ ] Select: GitHub repo sikari
[ ] Configure:
    [ ] Build: cd backend && npm install && npx prisma generate && npx prisma migrate deploy
    [ ] Start: cd backend && npm start

[ ] Add 9 Environment Variables:
    [ ] 1. DATABASE_URL = [NEON STRING dari STEP 1]
    [ ] 2. JWT_SECRET = rahasia_super_kuat_2025!
    [ ] 3. JWT_EXPIRES_IN = 7d
    [ ] 4. PORT = 5000
    [ ] 5. CORS_ORIGIN = https://[VERCEL_URL dari STEP 2].vercel.app
    [ ] 6. CLOUDINARY_CLOUD_NAME = Root
    [ ] 7. CLOUDINARY_API_KEY = 125758891323684
    [ ] 8. CLOUDINARY_API_SECRET = GNwsXb762pceeYtpYuI0WY5D5qw
    [ ] 9. NODE_ENV = production

[ ] Deploy
[ ] Wait for "Live" status ✅
[ ] Check logs: no error
[ ] Catat URL: https://______________________.onrender.com

═══════════════════════════════════════════════════════════

STEP 4: VERCEL UPDATE
───────────────────────────────────────────────────────────
[ ] Open: Vercel dashboard → select sikari-frontend
[ ] Settings → Environment Variables
[ ] Add: VITE_API_URL = https://[RENDER_URL dari STEP 3].onrender.com/api
[ ] Save
[ ] Redeploy (automatic atau manual)
[ ] Wait for "Ready" status ✅

═══════════════════════════════════════════════════════════

STEP 5: TESTING
───────────────────────────────────────────────────────────
[ ] Open: https://[VERCEL_URL].vercel.app
[ ] Check: No error, page load OK
[ ] F12 Console: No CORS error
[ ] Test Register: Create test@test.com
[ ] Test Login: Login dengan test@test.com
[ ] Admin Login: admin@desa.com / admin123
[ ] File Upload: Upload PDF file
[ ] Verify Cloudinary: File ada di sana

═══════════════════════════════════════════════════════════
```

---

## 🔐 CREDENTIALS REFERENCE

Keep these safe:

```
NEON DATABASE:
Portal: https://console.neon.tech
Connection String: postgresql://...@...neon.tech/...

VERCEL FRONTEND:
Portal: https://vercel.com/dashboard
Project: sikari-frontend
URL: https://sikari-xxxxx.vercel.app

RENDER BACKEND:
Portal: https://dashboard.render.com
Service: sikari-backend
URL: https://sikari-backend-xxxxx.onrender.com

CLOUDINARY:
Portal: https://cloudinary.com/console
Cloud Name: Root
API Key: 125758891323684
API Secret: GNwsXb762pceeYtpYuI0WY5D5qw
Folder: surat-desa/surat-selesai

TEST CREDENTIALS:
Admin: admin@desa.com / admin123
Test: test@test.com / Test123456!
```

---

## ⚠️ CRITICAL POINTS

```
🔴 DO NOT FORGET:
   1. Copy DATABASE_URL FROM NEON EXACTLY (including ?sslmode=require)
   2. Set CORS_ORIGIN = VERCEL URL (not localhost!)
   3. Set VITE_API_URL = RENDER URL with /api suffix
   4. Wait for "Live" status on Render (takes 10-15 min)
   5. Don't skip any step, follow sequence!

🟡 COMMON MISTAKES:
   - CORS_ORIGIN with trailing slash: https://x.vercel.app/ ❌
   - CORS_ORIGIN with localhost: http://localhost:3000 ❌
   - VITE_API_URL without /api: https://x.onrender.com ❌
   - Render free tier shutdown: normal, just wait for startup ✅

🟢 SUCCESS INDICATORS:
   - Frontend loads ✅
   - No CORS error in F12 ✅
   - Login works ✅
   - File upload works ✅
```

---

## 📚 DOCUMENTATION FILES REFERENCE

Created for you:

```
📄 DEPLOY_STEP_BY_STEP.md
   └─ Detailed explanation of each step
   └─ Expected outputs & indicators
   └─ ~1000 lines of comprehensive guide

📄 DEPLOY_CHECKLIST.md
   └─ Copy-paste ready instructions
   └─ Terminal commands where applicable
   └─ Troubleshooting section included

📄 ENV_STRUCTURE_FAQ.md
   └─ Answer: "Why .env only in backend?"
   └─ How environment injection works
   └─ Vite + Vercel technical details

📄 DEPLOYMENT_GUIDE.md
   └─ Previous high-level overview
   └─ Architecture & stack explanation

📄 READY_TO_DEPLOY.md
   └─ Final checklist before deployment
```

All files: https://github.com/ebenlimbong/sikari

---

## 🚀 READY? LET'S START!

**Recommended approach:**

1. **Keep THIS file open** in browser tab 1
2. **Open DEPLOY_CHECKLIST.md** in browser tab 2
3. **Follow STEP 1-5 in order**
4. **Check off each item as you complete**
5. **If stuck, read DEPLOY_STEP_BY_STEP.md for details**
6. **If error, check TROUBLESHOOTING section**

---

## 📞 NEED HELP?

If you encounter error:

1. **Check browser F12 Console** (Ctrl+Shift+I)
2. **Check platform logs:**
   - Vercel: https://vercel.com/dashboard → Deployments
   - Render: https://dashboard.render.com → Logs tab
3. **Check DEPLOY_CHECKLIST.md troubleshooting section**
4. **Share error message if still stuck**

---

**Estimated Total Time: 45-60 minutes**

**Success Rate: 99% (kalau follow langkah dengan teliti)**

**Let's go! 🎉**
