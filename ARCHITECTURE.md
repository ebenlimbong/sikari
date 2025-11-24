# 🌍 DEPLOYMENT ARCHITECTURE & STRATEGY

## 📊 Project Overview

```
PROJECT: Administrasi Surat Desa
FRAMEWORK: Vue 3 + Node.js/Express + PostgreSQL
STATUS: ✅ Ready for Production
DATABASE: ✅ PostgreSQL (Neon/Railway)
ENVIRONMENT: ✅ All dev tested successfully
```

---

## 🏗️ ARCHITECTURE - PRODUCTION DEPLOYMENT

### System Design (Cloud-Based)

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER (Browser)                             │
│                   https://yourdomain.com                          │
└────────┬────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ VERCEL EDGE NETWORK (Global CDN)                                │
│ ├─ Frontend Vue SPA (dist/ folder)                               │
│ ├─ Auto-deploy from GitHub (main branch)                        │
│ ├─ Environment Variables: VITE_API_URL                          │
│ └─ Price: FREE ✨                                               │
└────────┬────────────────────────────────────────────────────────┘
         │ HTTPS/API Calls to backend
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ RENDER.COM - Backend Service                                     │
│ ├─ Node.js/Express Runtime (Starter tier $7/month)             │
│ ├─ Auto-deploy from GitHub (main branch)                        │
│ ├─ Environment Variables:                                       │
│ │  ├─ DATABASE_URL (PostgreSQL connection)                     │
│ │  ├─ JWT_SECRET (authentication)                             │
│ │  ├─ CORS_ORIGIN (allowed domains)                           │
│ │  └─ CLOUDINARY_* (file upload credentials)                  │
│ ├─ Routes: /api/auth, /api/surat, /api/admin                  │
│ └─ Always-on (no sleep mode)                                   │
└────────┬────────────────────────────────────────────────────────┘
         │ SQL Queries via Prisma ORM
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ NEON.TECH or RAILWAY - Managed PostgreSQL                        │
│ ├─ Database: surat_db                                            │
│ ├─ Schema: user, surat                                           │
│ ├─ Automated Backups                                             │
│ ├─ Price: FREE (Neon) or $0-10/month (Railway)                 │
│ └─ Features: Branching, Connection pooling                      │
└────────┬────────────────────────────────────────────────────────┘
         │
         └──────────┐
                    │ Secondary: File Storage
                    ▼
         ┌─────────────────────────────────────────┐
         │ CLOUDINARY - File Upload CDN            │
         │ ├─ Folder: /surat-desa/surat-selesai/  │
         │ ├─ Format: PDF (5MB max per file)       │
         │ ├─ Storage: 25GB free tier              │
         │ ├─ Price: FREE ✨                       │
         │ └─ Features: Optimization, CDN          │
         └─────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW - User Uploads Letter File

### Flow: Admin Upload Surat Selesai (Completed Letter)

```
┌─────────────┐
│  Admin User │
│  (Browser)  │
└──────┬──────┘
       │ 1. Select PDF file + click upload
       ▼
┌─────────────────────────────────┐
│  Frontend (Vercel)              │
│  ├─ Validate file (PDF only)    │
│  ├─ Show upload progress        │
│  └─ POST /api/admin/surat/:id/  │
│     upload-selesai              │
└──────┬──────────────────────────┘
       │ 2. Send file to backend
       │    (FormData multipart)
       ▼
┌──────────────────────────────────┐
│  Backend (Render Node.js)        │
│  ├─ Auth middleware check        │
│  ├─ Receive file via multer      │
│  ├─ Pass to Cloudinary SDK       │
│  └─ (NOT save to local disk!)    │
└──────┬───────────────────────────┘
       │ 3. Upload file to cloud
       │    (HTTP to Cloudinary API)
       ▼
┌───────────────────────────────────┐
│  Cloudinary (Cloud Storage)       │
│  ├─ Store PDF file               │
│  ├─ Generate public URL           │
│  └─ Return response to backend    │
└──────┬────────────────────────────┘
       │ 4. Receive Cloudinary URL
       ▼
┌───────────────────────────────────┐
│  Backend (Render)                 │
│  ├─ Extract file URL from response│
│  ├─ UPDATE database:              │
│  │  surat.fileSuratSelesai = URL  │
│  │  surat.uploadedAt = NOW        │
│  │  surat.uploadedBy = adminName  │
│  └─ Return success response       │
└──────┬────────────────────────────┘
       │ 5. JSON response with URL
       ▼
┌───────────────────────────────────┐
│  Frontend (Vercel)                │
│  ├─ Display success message       │
│  ├─ Update UI with file URL       │
│  └─ Show download/preview button  │
└───────────────────────────────────┘
       │ 6. User clicks download/preview
       ▼
┌───────────────────────────────────┐
│  Browser downloads from Cloudinary│
│  ├─ Via public URL (fast CDN)     │
│  └─ No backend re-download needed │
└───────────────────────────────────┘
```

### Key Point: NO Local Disk Storage!

**Why Cloudinary & NOT local disk?**

| Aspect          | Local Disk (❌ BAD)     | Cloudinary (✅ GOOD) |
| --------------- | ----------------------- | -------------------- |
| **Persistence** | File lost on redeploy   | Permanent storage    |
| **Scalability** | Limited by disk space   | Unlimited cloud      |
| **Performance** | Backend must serve file | CDN global fast      |
| **Cost**        | Need paid storage tier  | Free 25GB/month      |
| **Backup**      | Manual backup needed    | Auto backup          |

---

## 📋 CONFIGURATION FILES CREATED

### Frontend

```
root/
├─ src/api.js ........................ ✅ Updated with VITE_API_URL
├─ .env.example ...................... ✅ Environment template
├─ vercel.json ....................... ✅ Vercel build config
└─ vite.config.js .................... ✅ Already configured
```

### Backend

```
backend/
├─ src/app.js ........................ ✅ Updated CORS config
├─ src/middleware/
│  └─ multerCloudinary.js ........... ✅ NEW - Cloudinary uploader
├─ scripts/
│  ├─ seedAdmin.js .................. ✅ Updated with dotenv
│  └─ verifyPostgresConnection.js ... ✅ NEW - DB verification
├─ .env.example ..................... ✅ Environment template
├─ render.yaml ...................... ✅ NEW - Render deploy config
└─ package.json ..................... ✅ Already has "start" script
```

### Documentation

```
root/
├─ DEPLOYMENT_GUIDE.md .............. ✅ Detailed explanation
├─ DEPLOYMENT_CHECKLIST.md .......... ✅ Step-by-step guide
├─ DEPLOYMENT_SUMMARY.md ............ ✅ Quick reference
└─ THIS FILE ........................ ✅ Architecture overview
```

---

## 🔐 SECURITY CONSIDERATIONS

### Secrets Management

**DO NOT COMMIT**:

- `.env` files (local credentials)
- API keys / secrets
- Database passwords
- JWT secrets

**Correct Way**:

```bash
# Local development
.env                    (gitignored)
.env.local              (gitignored)

# Production (on Vercel/Render dashboard)
Environment Variables panel (encrypted, hidden)
```

### JWT Token Security

```javascript
// Token generation in login
const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET, // ← Never hardcode!
  { expiresIn: "7d" } // ← Auto-expire after 7 days
);
```

### CORS Configuration

```javascript
// Only allow requests from Vercel frontend
cors({
  origin: "https://administrasi-surat-desa.vercel.app",
  credentials: true,
});
```

### File Upload Security

```javascript
// Only PDF files allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // ← Accept
  } else {
    cb(new Error("Only PDF!"), false); // ← Reject
  }
};
```

---

## 📈 SCALING CONSIDERATIONS (Future)

### Current Setup (Sufficient for ~100 users/month)

- Render Starter: $7
- Neon Free: $0
- Cloudinary Free: $0
- Total: $7/month

### If traffic grows to 1,000+ users/month

- Upgrade Render to Pro: $12/month (better performance)
- Upgrade Neon: $0-10/month (more connections)
- Consider Cloudinary paid: $0 (still free unless >25GB)
- Add Redis cache (optional): $5-10/month
- Total: $15-35/month

### If traffic becomes 10,000+ users/month

- Switch to Vercel paid: $20+/month (serverless functions)
- Switch backend to Railway/AWS: $20-50/month
- Upgrade database: $10-50/month
- Add CDN: $5-50/month
- Total: $50-150+/month

**For now: Stick with current budget setup** ✨

---

## 🧪 TESTING CHECKLIST

### Pre-Deployment (Local)

- [x] `npm run dev` (frontend)
- [x] `npm run dev` (backend in separate terminal)
- [x] Admin login works
- [x] User registration works
- [x] File upload to Cloudinary works
- [x] Database queries work

### Post-Deployment (Production)

- [ ] Frontend loads on Vercel URL
- [ ] Backend health check responds
- [ ] Admin can login with seeded credentials
- [ ] New user can register
- [ ] Admin can upload file → stored in Cloudinary
- [ ] User can download file from Cloudinary URL
- [ ] Token expiration works (7 days)
- [ ] CORS allows Vercel domain only

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues & Solutions

**1. "Cannot find module 'cloudinary'"**

```bash
# Solution: Install missing package
cd backend
npm install cloudinary multer-storage-cloudinary
```

**2. "CORS error - Origin not allowed"**

```javascript
// Solution: Update CORS_ORIGIN in Render env vars
CORS_ORIGIN=https://your-frontend-vercel-url.app
```

**3. "Database connection refused"**

```bash
# Solution: Verify DATABASE_URL format
postgresql://user:password@host:5432/database_name
# Make sure no typos in credentials
```

**4. "JWT_REFRESH_TOKEN is undefined"**

```bash
# Solution: Add to backend/.env
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

**5. "File upload returns 404"**

```bash
# Solution: Check Cloudinary credentials in Render
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🎯 NEXT ACTIONS

### Immediately (Today)

1. Review DEPLOYMENT_CHECKLIST.md
2. Create accounts: Vercel, Render, Neon, Cloudinary
3. Deploy frontend to Vercel
4. Deploy backend to Render

### Within 1 Day

5. Test all endpoints
6. Verify file uploads work
7. Share production URL with stakeholders

### Within 1 Week

8. Monitor logs for errors
9. Backup database (Neon auto-backup)
10. Plan scaling if needed

---

## 📊 FINAL DEPLOYMENT STATUS

| Component | Status       | URL                  | Cost         |
| --------- | ------------ | -------------------- | ------------ |
| Frontend  | ✅ Ready     | (pending Vercel)     | $0           |
| Backend   | ✅ Ready     | (pending Render)     | $7           |
| Database  | ✅ Ready     | (pending Neon)       | $0           |
| Storage   | ✅ Ready     | (pending Cloudinary) | $0           |
| **TOTAL** | ✅ **READY** |                      | **$7/month** |

---

**Congratulations! 🎉 Your project is production-ready!**

**Status**: ✅ PostgreSQL Database ✅ | Backend Configured ✅ | Frontend Ready ✅ | Documentation Complete ✅

Follow DEPLOYMENT_CHECKLIST.md to go live! 🚀
