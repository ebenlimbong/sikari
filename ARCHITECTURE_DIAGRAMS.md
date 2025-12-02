# 📊 Visual Architecture & Flow Diagrams

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        SIKARI SYSTEM ARCHITECTURE               │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────────────┐
                    │   FRONTEND (Vue.js)  │
                    │  sikari-desa.vercel  │
                    │                      │
                    │  • Warga form        │
                    │  • Admin dashboard   │
                    │  • File upload UI    │
                    └──────────┬───────────┘
                               │ HTTPS
                               ▼
        ┌──────────────────────────────────────────────┐
        │    BACKEND (Express + Middleware)           │
        │  sikari-backend-production.railway           │
        │                                              │
        │  API Endpoints:                              │
        │  ├─ POST /api/surat (with Cloudinary MW)   │
        │  ├─ POST /api/admin/surat/:id/upload (CM)  │
        │  ├─ GET /api/surat/me                       │
        │  ├─ GET /api/surat/:id                      │
        │  └─ GET /api/surat/:id/download             │
        │                                              │
        │  Middlewares:                                │
        │  ├─ protect (JWT auth)                       │
        │  ├─ adminOnly (role check)                   │
        │  ├─ multerCloudinary (admin upload)         │
        │  └─ multerSuratSelesai (warga upload) ← NEW │
        └──────────┬───────────────┬────────────────┘
                   │               │
           ┌───────▼────────┐   ┌──▼─────────────────┐
           │   DATABASE     │   │    CLOUDINARY      │
           │  (PostgreSQL)  │   │  File Storage      │
           │   Neon.tech    │   │                    │
           │                │   │  Folders:          │
           │  Tables:       │   │  ├─ surat-desa/    │
           │  • User        │   │  │  ├─ surat-..    │
           │  • Surat       │   │  │  └─ dokumen-..  │
           │  • Audit logs  │   │                    │
           └────────────────┘   └────────────────────┘
```

---

## 2. Upload Flow Comparison: Admin vs Warga

### ADMIN UPLOAD (Sudah ada)

```
Admin Dashboard
       │
       ▼
┌──────────────────────────────┐
│  Upload Modal                │
│  - Surat final PDF           │
│  - File input name:          │
│    fileSuratSelesai          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ POST /api/admin/surat/:id/upload         │
│ Middleware: multerCloudinary             │
│ - Validate: PDF only                     │
│ - Upload to: surat-desa/surat-selesai    │
│ - req.file.path = Cloudinary URL         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ uploadSuratSelesai() Controller          │
│ - Check status = "Selesai"               │
│ - Save req.file.path to DB               │
│   fileSuratSelesai = Cloudinary URL      │
│ - Response: success                      │
└──────────────┬──────────────────────────┘
               │
               ▼
        Database Updated
        + Success dialog
```

### WARGA UPLOAD (FIXED) ✅

```
Form Input (6 types)
  • SKDomisili
  • SKTM
  • SKPenghasilan
  • SKUsaha
  • SKKelahiran
  • SKPengantar
       │
       ▼
┌──────────────────────────────┐
│  Form Submission             │
│  FormData Fields:            │
│  - jenisSurat                │
│  - data (JSON)               │
│  - fileSuratSelesai ← ✅ KEY │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ POST /api/surat                          │
│ Middleware: multerSuratSelesai ← NEW     │
│ - Validate: PDF only                     │
│ - Upload to: surat-desa/dokumen-warga    │
│ - req.file.path = Cloudinary URL         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│ createSurat() Controller                 │
│ - Generate noTiket                       │
│ - Save req.file.path to DB               │
│   data.files.dokumenWarga.url            │
│ - Create Surat record                    │
│ - Response: { noTiket, success: true }   │
└──────────────┬──────────────────────────┘
               │
               ▼
    Database + Cloudinary Updated
    + Success dialog with noTiket
    + Redirect to "Surat Saya"
```

---

## 3. File Upload Middleware Comparison

```
┌────────────────────────────────────────────────────────────┐
│                  MIDDLEWARE COMPARISON                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ADMIN (multerCloudinary.js):                              │
│ ├─ Folder: surat-desa/surat-selesai                      │
│ ├─ Field: fileSuratSelesai                                │
│ ├─ Max size: 5MB                                          │
│ ├─ Format: PDF only                                       │
│ ├─ Public ID: surat-{id}-{timestamp}                      │
│ └─ Use: Admin upload surat final                          │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ WARGA (multerSuratSelesai.js):                             │
│ ├─ Folder: surat-desa/dokumen-warga ← NEW FOLDER         │
│ ├─ Field: fileSuratSelesai ← SAME FIELD NAME             │
│ ├─ Max size: 5MB                                          │
│ ├─ Format: PDF only                                       │
│ ├─ Public ID: dokumen-warga-{id}-{timestamp}             │
│ └─ Use: Warga upload dokumen awal ← NEW                  │
│                                                            │
└────────────────────────────────────────────────────────────┘

KEY DIFFERENCE:
• Both use SAME field name: fileSuratSelesai
• Both upload to Cloudinary
• Only difference: folder path & public_id prefix
• This makes the system consistent & predictable
```

---

## 4. FormData Structure

### BEFORE ❌ (Tidak bekerja)

```javascript
FormData {
  jenisSurat: "Surat Keterangan Domisili",
  data: "{...}",
  files[ktp]: File,          ← ❌ MIDDLEWARE DOESN'T EXPECT THIS
  files[kk]: File,           ← ❌ WRONG FIELD NAMES
  files[buktiRumah]: File    ← ❌ WILL CAUSE "Unexpected field"
}
```

### AFTER ✅ (Bekerja)

```javascript
FormData {
  jenisSurat: "Surat Keterangan Domisili",
  data: "{...}",
  fileSuratSelesai: File     ← ✅ CORRECT - MIDDLEWARE EXPECTS THIS
}

// Multiple files? Pick the main one
// In example: files.ktp is used as main document
// Other files (kk, buktiRumah) saved in JSON data field
```

---

## 5. Database Schema (Surat Table)

```sql
CREATE TABLE "Surat" (
  id              VARCHAR(36)  PRIMARY KEY,
  userId          INT          NOT NULL,
  jenisSurat      VARCHAR(100) NOT NULL,
  noTiket         VARCHAR(50)  NOT NULL UNIQUE,

  -- FORM DATA (JSON)
  data            JSONB        NOT NULL,
  -- data structure:
  -- {
  --   namaLengkap: "...",
  --   nik: "...",
  --   files: {
  --     dokumenWarga: {
  --       name: "KTP.pdf",
  --       size: 123456,
  --       url: "https://res.cloudinary.com/.../dokumen-warga-xxx.pdf"
  --     }
  --   }
  -- }

  -- STATUS & TRACKING
  status          VARCHAR(50)  DEFAULT "Belum Dikerjakan",
  catatanAdmin    TEXT,
  waktuSelesai    TIMESTAMP,

  -- ADMIN UPLOAD (Surat Final)
  fileSuratSelesai VARCHAR(500),  -- Cloudinary URL
  uploadedAt      TIMESTAMP,
  uploadedBy      VARCHAR(100),

  createdAt       TIMESTAMP    DEFAULT NOW(),
  updatedAt       TIMESTAMP    DEFAULT NOW()
);

-- INDEXES untuk query performa
CREATE INDEX idx_user_created ON "Surat"(userId, createdAt DESC);
CREATE INDEX idx_user_status ON "Surat"(userId, status);
CREATE INDEX idx_noTiket ON "Surat"(noTiket);
```

---

## 6. Request/Response Flow

### Request Structure

```
POST /api/surat
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: multipart/form-data

Body (FormData):
  - jenisSurat: "Surat Keterangan Domisili"
  - data: '{"nik":"3171061234567890","namaLengkap":"Budi Santoso",...}'
  - fileSuratSelesai: <FILE OBJECT - KTP.pdf>
```

### Response Structure

```json
{
  "success": true,
  "surat": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "jenisSurat": "Surat Keterangan Domisili",
    "noTiket": "TIC-20251202-5678",
    "tanggalPengajuan": "2025-12-02T14:30:00Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "❌ Hanya file PDF yang diizinkan untuk dokumen"
}
```

---

## 7. Cloudinary URL Structure

```
https://res.cloudinary.com/dr9crwcnn/image/upload/v1764647381/surat-desa/dokumen-warga/dokumen-warga-550e8400-e29b-41d4-1234567890.pdf
│                     │         │    │         │     │       │         │
│                     │         │    │         │     │       │         └─ File ID
│                     │         │    │         │     │       └─ Folder path
│                     │         │    │         │     └─ Upload timestamp
│                     │         │    │         └─ URL type (secure)
│                     │         │    └─ Transformation (none in this case)
│                     │         └─ Resource type (image for PDF preview)
│                     └─ Cloud name (dr9crwcnn)
└─ Cloudinary base URL

Folder Structure at Cloudinary:
surat-desa/
├─ surat-selesai/
│  ├─ surat-550e8400-e29b-41d4-...-1764647381.pdf (admin uploads)
│  ├─ surat-550e8401-e29b-41d4-...-1764647382.pdf
│  └─ ...
└─ dokumen-warga/
   ├─ dokumen-warga-550e8400-e29b-41d4-...-1764647381.pdf (warga uploads)
   ├─ dokumen-warga-550e8401-e29b-41d4-...-1764647382.pdf
   └─ ...
```

---

## 8. Error Handling Flow

```
User uploads file
       │
       ▼
┌─ File validation ─┐
│ • Exists?        │
│ • PDF format?    │
│ • < 5MB?         │
└────┬──────┬──────┘
     │      │
  ✅ YES   ❌ NO
     │      │
     │      ▼
     │  ┌─────────────────────┐
     │  │ Error Response      │
     │  │ 400 Bad Request     │
     │  │ error: "..."        │
     │  └─────────────────────┘
     │
     ▼
┌─ Cloudinary upload ─┐
│ Upload to cloud     │
│ Validate with API   │
└────┬────────┬───────┘
     │        │
  ✅ OK    ❌ FAIL
     │        │
     │        ▼
     │    ┌──────────────────────┐
     │    │ Error Response       │
     │    │ 500 Server Error     │
     │    │ error: "..."         │
     │    └──────────────────────┘
     │
     ▼
┌─ Database save ─┐
│ Create record   │
│ Save URL        │
└────┬────┬───────┘
     │    │
  ✅ OK ❌ FAIL
     │    │
     │    ▼
     │  ┌──────────────────────┐
     │  │ Error Response       │
     │  │ 500 Server Error     │
     │  │ error: "..."         │
     │  └──────────────────────┘
     │
     ▼
┌─────────────────────────────┐
│ Success Response (201)      │
│ {                           │
│   success: true,            │
│   surat: { noTiket: "..." } │
│ }                           │
└─────────────────────────────┘
```

---

## 9. Deployment Pipeline

```
┌──────────────────────────────────────────────────────────┐
│           DEPLOYMENT & CI/CD PIPELINE                   │
└──────────────────────────────────────────────────────────┘

Developer: git push origin main
       │
       ▼
┌─ GitHub ────────────────────┐
│ Receives push               │
│ Triggers webhooks           │
└─────┬──────────────┬────────┘
      │              │
      ▼              ▼
┌──────────────┐  ┌──────────────┐
│   VERCEL     │  │   RAILWAY    │
│  (Frontend)  │  │  (Backend)   │
│              │  │              │
│ • Build Vue  │  │ • Build Node │
│ • Deploy     │  │ • Deploy     │
│ • Live ~2m   │  │ • Live ~5m   │
└──────┬───────┘  └──────┬───────┘
       │                 │
       ▼                 ▼
┌────────────┐  ┌────────────────┐
│ Production │  │ Production     │
│ Frontend   │  │ Backend        │
│ Live ✅    │  │ Live ✅        │
└────────────┘  └────────────────┘
       │                │
       └────┬───────────┘
            ▼
    Ready for Testing
```

---

## 10. User Experience Timeline

### Before ❌

```
User actions                System response
─────────────────────────────────────────────────
1. Click "Ajukan Surat"  → Form loads
2. Fill form              → Data filled
3. Select file           → File selected
4. Click "Submit"        → ⏳ Loading...
5. ...waiting...         → ❌ ERROR 400
6. See error dialog      → Frustrated! 😞
7. Retry ❌ Still fails
```

### After ✅

```
User actions                System response
─────────────────────────────────────────────────
1. Click "Ajukan Surat"  → Form loads
2. Fill form              → Data filled
3. Select file           → File selected
4. Click "Submit"        → ⏳ Loading...
5. ...uploading...       → 📤 Uploading to Cloudinary...
6. ...saving...          → 💾 Saving to database...
7. Done ✅               → ✅ Success! No. Tiket: TIC-20251202-1234
8. Redirect              → "Surat Saya" page
9. See surat list        → Happy user! 😊
10. Admin processes      → Admin dapat upload file final
11. User downloads       → Dapat surat final via PDF
```

---

## 11. Technical Stack Visualization

```
┌─────────────────────────────────────────────┐
│         SIKARI TECH STACK                   │
├─────────────────────────────────────────────┤
│                                             │
│ PRESENTATION LAYER                          │
│ ├─ Vue.js 3 (Composition API)               │
│ ├─ Vite (Build tool)                        │
│ ├─ Axios (HTTP client)                      │
│ └─ Material Icons UI                        │
│       ↓ HTTPS                               │
│                                             │
│ APPLICATION LAYER                           │
│ ├─ Express.js (API framework)               │
│ ├─ Middleware:                              │
│ │  ├─ JWT auth (.protect)                  │
│ │  ├─ Role check (.adminOnly)              │
│ │  ├─ Multer + Cloudinary                  │
│ │  └─ CORS                                  │
│ └─ Controllers (Business logic)             │
│       ↓                                     │
│                                             │
│ DATA LAYER                                  │
│ ├─ Prisma ORM                               │
│ ├─ PostgreSQL (Neon)                        │
│ └─ JSON fields for flexibility              │
│       ↓                                     │
│                                             │
│ FILE STORAGE LAYER                          │
│ └─ Cloudinary (CDN + API)                   │
│                                             │
├─────────────────────────────────────────────┤
│ DEPLOYMENT                                  │
│ ├─ Frontend: Vercel (Auto-scale)            │
│ ├─ Backend: Railway (Auto-redeploy)         │
│ ├─ Database: Neon (PostgreSQL)              │
│ └─ Storage: Cloudinary                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 12. Troubleshooting Decision Tree

```
❌ Error 400: Bad Request
│
├─→ "Unexpected field files[ktp]"
│   └─→ Frontend using OLD field names
│       └─→ Update form: use fileSuratSelesai
│
├─→ "Hanya file PDF yang diizinkan"
│   └─→ User uploaded non-PDF file
│       └─→ Upload PDF file instead
│
├─→ "File too large"
│   └─→ File > 5MB
│       └─→ Compress file or upload smaller file
│
├─→ "File surat wajib diupload"
│   └─→ req.file is undefined
│       └─→ Check middleware in route is correct
│
└─→ "CLOUDINARY_CLOUD_NAME not set"
    └─→ Railway env vars incomplete
        └─→ Add CLOUDINARY_CLOUD_NAME, API_KEY, SECRET
```

---

**All diagrams are conceptual and represent system architecture as of 2 December 2025**
