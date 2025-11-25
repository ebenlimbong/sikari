# 🔐 ENV FILE STRUCTURE - FAQ

## Pertanyaan: "Tetapi file .env saya hanya ada di folder backend apakah itu tidak masalah?"

**JAWABAN: ✅ TIDAK MASALAH! Itu BENAR dan AMAN!**

---

## 📂 Struktur .env yang Benar

```
administrasi-surat-desa (copy)/
├── backend/
│   ├── .env                    ← ✅ DIPERLUKAN (11 variables)
│   ├── .gitignore            ← Sudah ignore backend/.env
│   ├── package.json
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── routes/
│   └── prisma/
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── api.js               ← Uses VITE_API_URL (env injectable)
│   └── components/
├── public/
├── .gitignore              ← Sudah ignore backend/.env
├── package.json            ← Frontend
├── vite.config.js          ← Frontend
└── (file lainnya)
```

### ✅ BENAR: Frontend config via Vercel dashboard

### ❌ SALAH: Buat src/.env.production atau src/.env

---

## WHY? 🤔

### Backend (.env diperlukan)

```
❌ MASALAH: Backend adalah Node.js app yang server-side
            Credentials (DATABASE_URL, JWT_SECRET, API keys)
            harus di file lokal atau env vars platform (Render)

✅ SOLUSI: .env di backend/ → Render inject via dashboard
           Saat deploy ke Render:
           1. Render membaca .env vars dari dashboard
           2. Backend process read dari process.env
           3. Bekerja dengan sempurna
```

### Frontend (TIDAK perlu .env file)

```
❌ MASALAH: Frontend adalah Vite + Vue3 yang di-build
            Jika buat .env file, perlu di-commit atau
            terpisah deployment flow

✅ SOLUSI: Vercel inject env vars saat build
           1. Set VITE_API_URL di Vercel dashboard
           2. Vercel auto-inject saat: npm run build
           3. Variable tersedia di: import.meta.env.VITE_API_URL
           4. Build output berisi value yang sudah di-inject
           5. No need untuk .env file!
```

---

## 🔄 How It Works: Frontend Environment Injection

### Local Development

```javascript
// src/api.js
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Saat npm run dev (local):
// - Tidak ada VITE_API_URL → gunakan fallback localhost:5000
// - Cocok untuk development
```

### Production (Vercel)

```javascript
// src/api.js
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Saat deploy ke Vercel:
// 1. Set VITE_API_URL=https://render-backend.onrender.com/api di Vercel
// 2. Vercel run: npm run build
// 3. Vite automatically inject value ke built files
// 4. import.meta.env.VITE_API_URL = https://render-backend.onrender.com/api
// 5. Client side dapat correct backend URL
```

---

## 📋 Environment Variables Summary

### Backend (Render Platform)

| Location               | Type     | Variables   | Action                         |
| ---------------------- | -------- | ----------- | ------------------------------ |
| `backend/.env` (local) | File     | 9 vars      | Manual file, for local testing |
| Render Dashboard       | Platform | 9 vars      | Copy-paste dari backend/.env   |
| Render Process         | Runtime  | process.env | Node app read automatic        |

```
backend/.env (local):
├── DATABASE_URL
├── JWT_SECRET
├── JWT_EXPIRES_IN
├── PORT
├── CORS_ORIGIN (update untuk production)
├── CLOUDINARY_CLOUD_NAME
├── CLOUDINARY_API_KEY
├── CLOUDINARY_API_SECRET
└── NODE_ENV

↓ (Deploy to Render)

Render Environment Variables (9 fields):
├── DATABASE_URL = neon connection string
├── JWT_SECRET = rahasia_super_kuat_2025!
├── JWT_EXPIRES_IN = 7d
├── PORT = 5000
├── CORS_ORIGIN = https://vercel-url.vercel.app
├── CLOUDINARY_CLOUD_NAME = Root
├── CLOUDINARY_API_KEY = 125758891323684
├── CLOUDINARY_API_SECRET = GNwsXb762pceeYtpYuI0WY5D5qw
└── NODE_ENV = production

↓ (Render inject ke process.env)

Backend Runtime (Node process):
├── process.env.DATABASE_URL = "postgresql://..."
├── process.env.JWT_SECRET = "rahasia_super_kuat_2025!"
├── ... (semua available)
└── app.js read: process.env.DATABASE_URL
```

### Frontend (Vercel Platform)

| Location           | Type       | Variables       | Action                         |
| ------------------ | ---------- | --------------- | ------------------------------ |
| Vercel Dashboard   | Platform   | 1 var           | Set VITE_API_URL               |
| Vite Build Process | Build Time | VITE\_\* prefix | Vercel inject saat build       |
| Built dist/        | Static     | Hardcoded       | Value sudah di-inject ke files |

```
Vercel Environment Variables (1 field):
├── VITE_API_URL = https://render-backend.onrender.com/api

↓ (Vercel run: npm run build)

Vite Build dengan Injection:
├── Read VITE_API_URL dari Vercel env
├── Replace import.meta.env.VITE_API_URL
├── Output ke dist/index.js dengan value hardcoded
└── Upload ke CDN

↓ (Browser load)

Client Side Runtime:
├── import.meta.env.VITE_API_URL = "https://render-backend.onrender.com/api"
└── axios.create({ baseURL: "https://render-backend.onrender.com/api" })
```

---

## ✅ Checklist: ENV Setup Benar?

```
[ ] backend/.env ada di backend/ folder ✅
[ ] backend/.env TIDAK di-commit (di .gitignore) ✅
[ ] src/ folder tidak ada .env file ✅
[ ] src/api.js menggunakan: import.meta.env.VITE_API_URL ✅
[ ] Vite config tidak setup custom .env loading ✅
[ ] Render dashboard akan have 9 env variables ✅
[ ] Vercel dashboard akan have 1 env variable (VITE_API_URL) ✅
```

---

## 🚨 COMMON MISTAKES & HOW TO FIX

### Mistake 1: Create `src/.env.production`

```
❌ WRONG:
src/
├── .env.production    ← ini tidak akan di-use oleh Vercel!
├── api.js
└── ...

✅ RIGHT:
src/
├── api.js             ← hardcode fallback atau import.meta.env.VITE_API_URL
└── ...

And set VITE_API_URL di Vercel dashboard
```

### Mistake 2: Forget VITE\_ prefix

```
❌ WRONG (Vercel):
Environment Variable: API_URL = https://...
Code: import.meta.env.API_URL (undefined!)

✅ RIGHT (Vercel):
Environment Variable: VITE_API_URL = https://...
Code: import.meta.env.VITE_API_URL (works!)
```

### Mistake 3: Hardcode Backend URL

```
❌ WRONG:
src/api.js:
const baseURL = 'https://localhost:5000/api'

✅ RIGHT:
src/api.js:
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

---

## 🎓 TECHNICAL DEEP DIVE (Optional Reading)

### Why Vite with VITE\_ prefix?

```
Vite security feature:

1. Only variables prefixed with VITE_ are injected to client
2. Variables WITHOUT VITE_ stay server-side only
3. Prevents accidental secret leaks

Example:
VITE_API_URL = injected to client ✅
SECRET_KEY = NOT injected ✅ (safe!)
```

### Build Time vs Runtime

```
Vite (Frontend):
- VITE_API_URL injected at BUILD TIME
- Value hardcoded into dist/index.js
- Cannot change without rebuild

Backend (Node.js):
- process.env read at RUNTIME
- Can change env vars without rebuild
- Restart app = load new values
```

---

## 📚 REFERENCES

### Backend Environment (Node.js)

- `backend/.env` → dotenv package load
- `app.js` → `process.env.DATABASE_URL` read
- Render dashboard → inject env vars ke container

### Frontend Environment (Vite)

- Vite config → recognize VITE\_\* vars
- `import.meta.env.VITE_API_URL` → available at build time
- Vercel build → inject VITE_API_URL before npm run build

---

## 🎯 FINAL ANSWER

**Question: "File .env hanya di backend, apakah tidak masalah?"**

**Answer:**

```
✅ TIDAK MASALAH, itu BENAR!

Alasan:
1. Backend = server-side, butuh .env untuk secrets & config
2. Frontend = client-side, env vars via platform (Vercel)
3. Vite + Vercel handle injection otomatis
4. No need untuk .env file di src/

Platform Injection:
- Render inject ke backend process.env
- Vercel inject ke Vite build output
- Both automatic, no manual .env file needed
```

---

**Jadi: PROCEED dengan .env hanya di backend/ ✅**

Semuanya sudah benar dan siap untuk production!
