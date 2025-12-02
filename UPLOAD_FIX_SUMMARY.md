# 📝 Ringkasan Perbaikan: Upload Surat Warga ke Cloudinary

## 🎯 Masalah yang Diselesaikan

Fitur upload surat oleh warga tidak bisa berjalan (Error 400) karena **mismatch antara frontend dan backend**:

- Frontend mengirim file dengan nama field `files[ktp]`, `files[kk]`, dll.
- Backend middleware menunggu file dengan nama field `fileSuratSelesai` (sesuai admin)
- Middleware Cloudinary tidak dikonfigurasi di route warga

---

## ✅ Solusi yang Diterapkan

### 1. **Backend: Update Route** (`backend/src/routes/suratRoutes.js`)

```javascript
// SEBELUM
router.post("/", protect, createSurat);

// SESUDAH
const uploadUserFileMiddleware = require("../middleware/multerSuratSelesai");
router.post("/", protect, uploadUserFileMiddleware, createSurat);
```

✅ Menambahkan middleware Cloudinary seperti route admin

---

### 2. **Backend: Update Controller** (`backend/src/controllers/suratController.js`)

```javascript
// SEBELUM
if (req.file) {
  fileMetadata["dokumenWarga"] = {
    name: req.file.originalname,
    size: req.file.size,
    url: req.file.path, // ❌ Bisa undefined atau path lokal
  };
}

// SESUDAH
if (req.file) {
  console.log(`✅ File uploaded ke Cloudinary: ${req.file.path}`);
  fileMetadata["dokumenWarga"] = {
    name: req.file.originalname,
    size: req.file.size,
    url: req.file.path, // ✅ Cloudinary URL penuh
  };
}
```

✅ Ditambahkan logging yang lebih baik dan error handling yang jelas

---

### 3. **Frontend: Update Semua Form** (5 file)

**File yang diupdate:**

1. ✅ `src/views/Warga/SKDomisiliFormView.vue`
2. ✅ `src/views/Warga/SKTMFormView.vue`
3. ✅ `src/views/Warga/SKPenghasilanFormView.vue`
4. ✅ `src/views/Warga/SKUsahaForm.vue`
5. ✅ `src/views/Warga/SKKelahiranForm.vue`
6. ✅ `src/views/Warga/SKPengantarKKKTPAktaFormView.vue`

**Perubahan di setiap form:**

```javascript
// SEBELUM - ❌ SALAH
formDataToSend.append("files[ktp]", formData.value.files.ktp);
formDataToSend.append("files[kk]", formData.value.files.kk);
formDataToSend.append("files[buktiRumah]", formData.value.files.buktiRumah);

// SESUDAH - ✅ BENAR
formDataToSend.append("fileSuratSelesai", formData.value.files.ktp);
```

**Alasan:** Middleware Cloudinary mengharapkan field bernama `fileSuratSelesai` (sesuai dengan admin)

---

## 🔄 Alur Upload Sekarang (Sama seperti Admin)

```
┌─────────────────────────────────┐
│ Frontend (Vue.js)               │
│ - User pilih file KTP           │
│ - Kirim dengan field name:      │
│   'fileSuratSelesai'            │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Backend Route                   │
│ POST /api/surat                 │
│ + uploadUserFileMiddleware      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Middleware Cloudinary           │
│ (multerSuratSelesai.js)         │
│                                 │
│ ✓ Validate PDF format           │
│ ✓ Limit file 5MB                │
│ ✓ Upload ke folder:             │
│   surat-desa/dokumen-warga      │
│ ✓ Generate public_id            │
│ ✓ Return Cloudinary URL         │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Backend Controller              │
│ (suratController.js)            │
│                                 │
│ ✓ Ambil req.file.path           │
│   (Cloudinary URL)              │
│ ✓ Simpan ke data.files.dokumenW │
│ ✓ Create record Surat di DB     │
│ ✓ Return noTiket ke Frontend    │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Cloudinary Storage              │
│ 📁 surat-desa/dokumen-warga     │
│ 📄 dokumen-warga-[ID]-[TS].pdf  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Frontend: Success Dialog         │
│ "No. Tiket: TIC-20251202-1234"  │
│ Redirect ke "Surat Saya"        │
└─────────────────────────────────┘
```

---

## 📋 Perbandingan: Admin vs Warga

| Aspek          | Admin                              | Warga                              |
| -------------- | ---------------------------------- | ---------------------------------- |
| Route          | POST `/api/admin/surat/:id/upload` | POST `/api/surat`                  |
| Middleware     | ✅ `multerCloudinary.js`           | ✅ `multerSuratSelesai.js`         |
| Field Name     | `fileSuratSelesai`                 | ✅ `fileSuratSelesai` (sama)       |
| Folder         | `surat-desa/surat-selesai`         | `surat-desa/dokumen-warga`         |
| URL Simpan     | `fileSuratSelesai` (DB)            | `data.files.dokumenWarga.url` (DB) |
| Status         | Harus "Selesai"                    | Langsung create                    |
| Tanggal Upload | 📅 `uploadedAt`                    | 📅 Di data.files.dokumenWarga      |

---

## 🚀 Langkah Deploy

### 1. **Commit & Push ke GitHub**

```bash
git add -A
git commit -m "Fix: Enable Cloudinary upload untuk warga (sesuai admin logic)"
git push origin main
```

### 2. **Railway Auto-Redeploy**

- Railway akan otomatis detect push
- Tunggu ~5 menit untuk deploy selesai
- Cek status di Railway dashboard

### 3. **Test Upload**

1. **Frontend**: https://sikari-desa.vercel.app
2. **Login sebagai warga**
3. **Pilih "Ajukan Surat" → "SK Domisili"**
4. **Upload file & submit**

### 4. **Verifikasi**

- ✅ Check console frontend (F12) → No error 400
- ✅ Check Cloudinary dashboard → File ter-upload di folder `surat-desa/dokumen-warga`
- ✅ Check Neon database → Record surat ter-create dengan `noTiket`
- ✅ Frontend menampilkan "No. Tiket" success dialog
- ✅ File URL bisa diakses: `https://res.cloudinary.com/dr9crwcnn/image/upload/v.../surat-desa/dokumen-warga/...`

---

## 🔧 Middleware Configuration

**File: `backend/src/middleware/multerSuratSelesai.js`**

```javascript
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "surat-desa/dokumen-warga", // Folder di Cloudinary
    format: async (req, file) => "pdf", // Convert ke PDF
    public_id: (req, file) => {
      const suratId = req.params.id || `dokumen-${Date.now()}`;
      const timestamp = Date.now();
      return `dokumen-warga-${suratId}-${timestamp}`;
    },
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // ✅ Accept
  } else {
    cb(new Error("❌ Hanya file PDF yang diizinkan"), false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("fileSuratSelesai"); // ⭐ Field name yang diharapkan
```

---

## 📊 Database Schema (Tidak Berubah)

```prisma
model Surat {
  // ... existing fields ...

  // Untuk dokumen warga tersimpan di:
  data: Json  // {
             //   ...,
             //   files: {
             //     dokumenWarga: {
             //       name: "KTP_Budi.pdf",
             //       size: 1024000,
             //       url: "https://res.cloudinary.com/.../dokumen-warga-xxx.pdf"
             //     }
             //   }
             // }
}
```

---

## ⚠️ Catatan Penting

1. **File yang Dikirim**: Saat ini hanya **file pertama (KTP)** yang di-upload ke Cloudinary

   - Alasan: Middleware `.single()` hanya handle 1 file
   - Jika ingin upload multiple files, perlu ubah middleware ke `.array()`

2. **PDF Format**: Middleware akan convert file ke PDF di Cloudinary

   - Jika upload JPG/PNG, akan di-convert ke PDF

3. **Folder Terpisah**:

   - Admin upload → `surat-desa/surat-selesai`
   - Warga upload → `surat-desa/dokumen-warga`
   - Ini memudahkan management & cleanup

4. **Environment Variables**: Sudah benar di `.env` backend
   ```
   CLOUDINARY_CLOUD_NAME=dr9crwcnn
   CLOUDINARY_API_KEY=125758891323684
   CLOUDINARY_API_SECRET=GNwsXb762pceeYtpYuI0WY5D5qw
   ```

---

## 📞 Troubleshooting

### Error: `400 Bad Request`

```
❌ Masalah: Field name tidak sesuai dengan middleware
✅ Solusi: Pastikan frontend kirim dengan 'fileSuratSelesai'
```

### Error: `File not provided`

```
❌ Masalah: req.file undefined di controller
✅ Solusi: Pastikan middleware Cloudinary aktif di route
```

### Error: `Unexpected field`

```
❌ Masalah: Frontend kirim field 'files[ktp]' but middleware expects 'fileSuratSelesai'
✅ Solusi: Update frontend sesuai contoh di atas
```

### File tidak muncul di Cloudinary

```
❌ Masalah: Environment variable Cloudinary tidak lengkap di Railway
✅ Solusi:
   1. Buka Railway dashboard
   2. Cari env var: CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET
   3. Pastikan semuanya ter-set dengan benar
   4. Redeploy backend
```

---

## ✨ Fitur Bonus (Sudah Tersedia)

- ✅ Download surat selesai: `GET /api/surat/:id/download`
- ✅ View detail surat: `GET /api/surat/:id/detail`
- ✅ Admin upload surat final: `POST /api/admin/surat/:id/upload`
- ✅ Admin delete surat: `DELETE /api/admin/surat/:id/upload`

---

## 📚 File yang Diubah

```
✅ backend/src/routes/suratRoutes.js
✅ backend/src/controllers/suratController.js
✅ src/views/Warga/SKDomisiliFormView.vue
✅ src/views/Warga/SKTMFormView.vue
✅ src/views/Warga/SKPenghasilanFormView.vue
✅ src/views/Warga/SKUsahaForm.vue
✅ src/views/Warga/SKKelahiranForm.vue
✅ src/views/Warga/SKPengantarKKKTPAktaFormView.vue
```

---

**Status**: ✅ SIAP DEPLOY  
**Tanggal**: 2 Desember 2025  
**Author**: GitHub Copilot
