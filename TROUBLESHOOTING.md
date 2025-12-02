# 🔧 Troubleshooting Guide: Upload Surat Warga

## 🚨 Common Errors & Solutions

---

## Error 1: `400 Bad Request - Hanya file PDF yang diizinkan`

### ❌ Symptom

```
POST /api/surat 400 (Bad Request)
{
  "success": false,
  "error": "❌ Hanya file PDF yang diizinkan untuk dokumen"
}
```

### 📋 Root Cause

Middleware Cloudinary hanya accept file dengan MIME type `application/pdf`.

### ✅ Solution

1. **Check file type** yang diupload dari frontend

   ```javascript
   // Di browser console:
   console.log(formData.value.files.ktp.type);
   // Harus: "application/pdf"
   ```

2. **Pastikan upload PDF**, bukan file lain:

   - ✅ PDF files OK
   - ❌ DOCX, DOC tidak akan di-accept
   - ❌ IMG (JPG/PNG) - middleware akan reject

3. **Jika ingin support multiple format:**
   Edit `backend/src/middleware/multerSuratSelesai.js`:
   ```javascript
   const fileFilter = (req, file, cb) => {
     // Tambahkan MIME types yang ingin di-support
     const allowedTypes = [
       "application/pdf",
       "image/jpeg",
       "image/png",
       "application/msword",
     ];

     if (allowedTypes.includes(file.mimetype)) {
       cb(null, true);
     } else {
       cb(new Error("Format tidak didukung"), false);
     }
   };
   ```

---

## Error 2: `File size too large`

### ❌ Symptom

```
POST /api/surat 400 (Bad Request)
{
  "success": false,
  "error": "File too large, maximum size 5242880"
}
```

### 📋 Root Cause

File size melebihi limit 5MB yang dikonfigurasi di middleware.

### ✅ Solution

1. **Check file size sebelum upload:**

   ```javascript
   const file = event.target.files[0];
   const maxSize = 5 * 1024 * 1024; // 5MB

   if (file.size > maxSize) {
     alert(
       `File terlalu besar! Max: 5MB, Anda: ${(file.size / 1024 / 1024).toFixed(
         2
       )}MB`
     );
   }
   ```

2. **Compress file sebelum upload:**
   - Gunakan tools seperti PDF Compressor
   - Atau ubah limit di middleware:
     ```javascript
     limits: {
       fileSize: 10 * 1024 * 1024; // 10MB
     }
     ```

---

## Error 3: `CLOUDINARY_CLOUD_NAME not set`

### ❌ Symptom

```
❌ CRITICAL: Cloudinary environment variables tidak lengkap!
Pastikan env var berikut sudah di-set di Railway/deployment:
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET
```

### 📋 Root Cause

Environment variable di Railway tidak dikonfigurasi dengan benar.

### ✅ Solution

1. **Buka Railway Dashboard**
2. **Select project**: `sikari-backend-production`
3. **Buka tab: Variables**
4. **Tambahkan/Update env vars:**

   ```
   CLOUDINARY_CLOUD_NAME = dr9crwcnn
   CLOUDINARY_API_KEY = 125758891323684
   CLOUDINARY_API_SECRET = GNwsXb762pceeYtpYuI0WY5D5qw
   ```

5. **Redeploy backend** (biasanya auto, tapi bisa manual)
6. **Restart app** (toggle off/on)

---

## Error 4: `req.file is undefined`

### ❌ Symptom

```
POST /api/surat 400 (Bad Request)
{
  "success": false,
  "error": "File surat wajib diupload"
}
```

### 📋 Root Cause

Frontend FormData tidak include file dengan field name yang benar.

### ✅ Solution

1. **Check frontend FormData field name:**

   ```javascript
   // ✅ BENAR:
   formDataToSend.append("fileSuratSelesai", formData.value.files.ktp);

   // ❌ SALAH:
   formDataToSend.append("files[ktp]", formData.value.files.ktp);
   formDataToSend.append("ktp", formData.value.files.ktp);
   ```

2. **Pastikan file object valid:**

   ```javascript
   if (!formData.value.files.ktp) {
     alert("File KTP belum dipilih!");
     return;
   }

   console.log("File object:", formData.value.files.ktp);
   // Output should be: File { name: "KTP.pdf", size: 123456, type: "application/pdf" }
   ```

3. **Debug dengan Postman:**
   - Create POST request ke `/api/surat`
   - Body: form-data
   - Add field: `fileSuratSelesai` (type: File)
   - Select actual file
   - Send request

---

## Error 5: `Unexpected field 'files[ktp]'`

### ❌ Symptom

```
POST /api/surat 400 (Bad Request)
{
  "success": false,
  "error": "Unexpected field files[ktp]"
}
```

### 📋 Root Cause

Frontend masih kirim file dengan format array `files[ktp]` tapi middleware expect `fileSuratSelesai`.

### ✅ Solution

**Update semua file form di `/src/views/Warga/*.vue`:**

Cari dan ganti:

```javascript
// ❌ BEFORE (SALAH)
formDataToSend.append("files[ktp]", formData.value.files.ktp);
formDataToSend.append("files[kk]", formData.value.files.kk);
formDataToSend.append("files[buktiRumah]", formData.value.files.buktiRumah);

// ✅ AFTER (BENAR)
formDataToSend.append("fileSuratSelesai", formData.value.files.ktp);
```

Files to check:

- ✅ `SKDomisiliFormView.vue`
- ✅ `SKTMFormView.vue`
- ✅ `SKPenghasilanFormView.vue`
- ✅ `SKUsahaForm.vue`
- ✅ `SKKelahiranForm.vue`
- ✅ `SKPengantarKKKTPAktaFormView.vue`

---

## Error 6: `File uploaded tapi URL kosong`

### ❌ Symptom

```
{
  "success": true,
  "surat": { "id": "...", "noTiket": "..." }
}

// Tapi di database:
data.files.dokumenWarga.url = undefined
// atau
data.files.dokumenWarga.url = ""
```

### 📋 Root Cause

Middleware Cloudinary tidak return URL dengan benar.

### ✅ Solution

1. **Check Cloudinary credentials** di Railway env vars
2. **Check console backend** di Railway:

   - Apakah ada log `✅ File uploaded ke Cloudinary: [URL]`?
   - Jika tidak ada, berarti upload ke Cloudinary gagal

3. **Test Cloudinary connection** dengan simple test:

   ```bash
   curl -X POST https://api.cloudinary.com/v1_1/dr9crwcnn/upload \
     -F "file=@test.pdf" \
     -F "api_key=125758891323684"

   # Seharusnya return JSON dengan secure_url
   ```

4. **Check Cloudinary quota:**
   - Mungkin storage sudah penuh (free tier: 25GB)
   - Buka https://console.cloudinary.com/ → Settings → Usage

---

## Error 7: `CORS Error`

### ❌ Symptom

```
Access to XMLHttpRequest at 'https://sikari-backend-production.up.railway.app/api/surat'
from origin 'https://sikari-desa.vercel.app'
has been blocked by CORS policy
```

### 📋 Root Cause

Backend CORS configuration tidak include frontend origin.

### ✅ Solution

1. **Check backend `.env`:**

   ```
   CORS_ORIGIN=http://localhost:3000,http://localhost:5173,https://sikari-desa.vercel.app
   ```

2. **Update jika Vercel domain berubah:**

   ```bash
   CORS_ORIGIN=http://localhost:3000,http://localhost:5173,https://sikari-desa.vercel.app,https://your-new-domain.vercel.app
   ```

3. **Redeploy backend** setelah update `.env`

---

## Error 8: `Database connection failed`

### ❌ Symptom

```
PrismaClientInitializationError:
Can't reach database server at `surat_db:5432`
```

### 📋 Root Cause

Backend tidak bisa connect ke Neon database.

### ✅ Solution

1. **Check Neon status:**

   - https://console.neon.tech/
   - Apakah database online?

2. **Check Railway env var `DATABASE_URL`:**

   - Railway dashboard → Variables
   - Pastikan nilai benar dan complete

3. **Test connection:**

   ```bash
   # Di Railway console
   psql $DATABASE_URL -c "SELECT 1"

   # Should return: 1 (OK)
   ```

4. **Reset connection pool** di Neon:
   - Neon dashboard → Project → Settings → Connection Details
   - Click "Reset"

---

## Error 9: `Prisma migration not applied`

### ❌ Symptom

```
PrismaClientKnownRequestError:
The table `Surat` does not exist in the current database.
```

### 📋 Root Cause

Database schema belum di-migrate atau migration gagal.

### ✅ Solution

1. **Run migration di Railway:**

   ```bash
   # SSH ke Railway
   cd /app
   npx prisma migrate deploy
   ```

2. **Atau push schema:**

   ```bash
   npx prisma db push
   ```

3. **Check schema di Neon:**
   - Neon console → SQL Editor
   - Query: `SELECT table_name FROM information_schema.tables WHERE table_schema='public';`
   - Harus ada table: `Surat`, `User`

---

## Error 10: `Token expired / Unauthorized`

### ❌ Symptom

```
POST /api/surat 401 (Unauthorized)
{
  "success": false,
  "error": "Token tidak valid atau sudah expired"
}
```

### 📋 Root Cause

JWT token sudah expired atau tidak ada.

### ✅ Solution

1. **Check frontend localStorage:**

   ```javascript
   // Di browser console:
   console.log(localStorage.getItem("token"));

   // Harus ada string panjang (JWT)
   ```

2. **Logout & Login ulang:**

   - Clear local storage
   - Refresh halaman
   - Login kembali

3. **Check token validity:**

   ```javascript
   // Decode JWT (copy ke https://jwt.io/)
   // Cek `exp` field apakah sudah lewat waktu
   ```

4. **Check `.env` JWT_EXPIRES_IN:**
   ```
   JWT_EXPIRES_IN=7d  # Valid 7 hari
   ```

---

## Error 11: `Admin middleware error`

### ❌ Symptom

```
POST /api/admin/surat/:id/upload 403 (Forbidden)
{
  "success": false,
  "error": "Admin only endpoint"
}
```

### 📋 Root Cause

User yang login bukan admin, atau role field belum di-set.

### ✅ Solution

1. **Check user role di database:**

   ```sql
   SELECT id, username, role FROM "User" WHERE id = [USER_ID];
   ```

2. **Harus: `role = 'ADMIN'`** (case-sensitive)

3. **Jika perlu ubah role:**

   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE username = 'admin_username';
   ```

4. **Login ulang** setelah update role

---

## Error 12: `Module not found - multerSuratSelesai`

### ❌ Symptom

```
Error: Cannot find module '../middleware/multerSuratSelesai'
```

### 📋 Root Cause

File middleware tidak ada atau path salah.

### ✅ Solution

1. **Check file exist:**

   ```bash
   ls -la /app/src/middleware/multerSuratSelesai.js
   ```

2. **Check require path** di `suratRoutes.js`:

   ```javascript
   // Harus relative path dari suratRoutes.js
   const uploadUserFileMiddleware = require("../middleware/multerSuratSelesai");

   // Path breakdown:
   // suratRoutes.js → ../middleware → ../src/middleware
   ```

3. **Pastikan file name benar** (case-sensitive di Linux):
   - ✅ `multerSuratSelesai.js`
   - ❌ `multersuratselesai.js`
   - ❌ `multerSuratSelesai.JS`

---

## 🔍 Debugging Workflow

### Step 1: Check Frontend

```javascript
// Browser Console (F12)
1. Check ada error di Network tab
2. Check FormData yang dikirim
3. Check localStorage token ada
```

### Step 2: Check Backend Logs

```bash
# Railway dashboard → Logs tab
# Cari log dari createSurat atau middleware
# Harus ada: ✅ File uploaded atau ❌ Error message
```

### Step 3: Check Cloudinary

```
1. Console.cloudinary.com
2. Check Media Library
3. Check ada file di folder surat-desa/dokumen-warga
4. Check file URL bisa diakses
```

### Step 4: Check Database

```sql
-- Neon SQL Editor
SELECT * FROM "Surat"
WHERE userId = [USER_ID]
ORDER BY createdAt DESC
LIMIT 1;

-- Check:
-- 1. Record ada?
-- 2. data.files.dokumenWarga.url ada?
-- 3. URL valid (Cloudinary)?
```

### Step 5: Test dengan Postman

```
POST https://sikari-backend-production.up.railway.app/api/surat
Headers:
  - Authorization: Bearer [JWT_TOKEN]
  - Content-Type: multipart/form-data

Body:
  - jenisSurat: "Surat Keterangan Domisili"
  - data: {"nik":"1234567890123456"}
  - fileSuratSelesai: [PDF file]

Expected: 201 Created dengan response berisi noTiket
```

---

## 📊 Health Check Commands

```bash
# Test backend is alive
curl -X GET https://sikari-backend-production.up.railway.app/

# Test Cloudinary connection
curl -X GET https://api.cloudinary.com/v1_1/dr9crwcnn/resources/image

# Test database connection
psql $DATABASE_URL -c "SELECT NOW()"

# Test frontend is deployed
curl -X GET https://sikari-desa.vercel.app/
```

---

## 🚀 Recovery Steps (Nuclear Option)

Jika semua else fail:

### 1. Full Restart Backend

```bash
# Railway dashboard
1. Deploy → Unpublish
2. Wait 30 seconds
3. Deploy → Publish
```

### 2. Clear Database

```sql
-- ⚠️ HATI-HATI: Ini akan hapus semua data
DELETE FROM "Surat";
DELETE FROM "User";
```

### 3. Re-run Seeds

```bash
cd backend
npm run seed
```

### 4. Redeploy Frontend

```bash
git push origin main
# Vercel akan auto-redeploy
```

---

## 📞 Contact Support

Jika masalah belum teratasi:

1. **Collect logs:**

   - Railway backend logs (screenshot)
   - Browser console error (F12)
   - Neon database query result

2. **Check dependencies:**

   - `npm list multer-storage-cloudinary`
   - `npm list cloudinary`
   - Harus ada di `package.json`

3. **Review changes:**
   - Git diff terhadap commit sebelumnya
   - Pastikan tidak ada typo

---

**Last Updated**: 2 Desember 2025  
**Version**: 1.0
