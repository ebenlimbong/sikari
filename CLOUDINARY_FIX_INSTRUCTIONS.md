# 🔧 Fix Cloudinary Configuration - Cloud Name Issue

## 📋 Problem

- Error: `Invalid cloud_name 'Root'`
- Root cause: CLOUDINARY_CLOUD_NAME env var di Railway berisi "Root" (API Key Name) bukan cloud name yang sebenarnya
- Solusi: Update env var ke cloud name yang benar: `dr9crwcnn`

---

## ✅ Langkah Update di Railway

### Step 1: Buka Railway Dashboard

- URL: https://railway.app/
- Login dengan akun Railway Anda
- Klik project **karangsari-backend**

### Step 2: Buka Tab Environment

- Di project page, klik **Environment**
- Atau cari bagian "Variables" / "Environment Variables"

### Step 3: Update/Tambahkan Env Vars

Cari atau tambahkan 3 env var berikut dengan nilai yang BENAR:

```
CLOUDINARY_CLOUD_NAME=dr9crwcnn
CLOUDINARY_API_KEY=125758891323684
CLOUDINARY_API_SECRET=<copy dari Cloudinary, lihat instruksi di bawah>
```

### Step 4: Dapatkan API Secret dari Cloudinary

1. Buka https://cloudinary.com/console/
2. Klik tab **API Keys**
3. Cari "API Secret" di tabel
4. Klik icon **mata/eye** untuk reveal nilai
5. Copy nilai tersebut
6. Paste ke Railway env var `CLOUDINARY_API_SECRET`

### Step 5: Pastikan Format Benar

- ❌ SALAH: `CLOUDINARY_CLOUD_NAME = dr9crwcnn` (ada spasi)
- ✅ BENAR: `CLOUDINARY_CLOUD_NAME=dr9crwcnn` (tidak ada spasi)
- ❌ SALAH: `CLOUDINARY_CLOUD_NAME="dr9crwcnn"` (ada tanda kutip)
- ✅ BENAR: `CLOUDINARY_CLOUD_NAME=dr9crwcnn` (tanpa tanda kutip)

### Step 6: Save & Redeploy

1. Setelah update semua 3 env var, klik tombol **Save** atau **Deploy**
2. Railway akan auto-redeploy backend
3. Tunggu hingga deployment selesai (status: "Active")

---

## 🔍 Verifikasi Setelah Redeploy

### Di Railway Deploy Logs

1. Buka **Deploy Logs** untuk build terbaru
2. Cari logs berikut:
   ```
   🔧 Cloudinary Configuration:
      ├─ Cloud Name: dr9crwcnn ✅
      ├─ API Key: ✅ SET
      └─ API Secret: ✅ SET
   ```
3. Jika ketiga var menunjukkan ✅, Cloudinary sudah terkonfigurasi dengan benar!

### Test Upload di Frontend

1. Login ke admin dashboard (Vercel)
2. Ubah status surat menjadi "Selesai"
3. Upload file PDF surat selesai
4. Harapkan alert: ✅ Status surat dan file berhasil diperbarui!

### Verifikasi di Neon Database

Jalankan query di Neon SQL Editor:

```sql
SELECT id, status, fileSuratSelesai, uploadedAt, uploadedBy
FROM "Surat"
WHERE fileSuratSelesai IS NOT NULL
ORDER BY "createdAt" DESC
LIMIT 5;
```

Hasil yang diharapkan:

- `fileSuratSelesai` berisi URL Cloudinary: `https://res.cloudinary.com/dr9crwcnn/image/upload/v.../`
- Jika ada URL, berarti upload berhasil!

---

## 📝 Reference: Cloud Name vs API Key Name

| Aspek                     | Cloud Name                    | API Key Name                  |
| ------------------------- | ----------------------------- | ----------------------------- |
| **Nilai**                 | `dr9crwcnn`                   | `Root`                        |
| **Untuk apa**             | Konfigurasi SDK Cloudinary    | Label di dashboard Cloudinary |
| **Diperlukan di env var** | ✅ YA (CLOUDINARY_CLOUD_NAME) | ❌ Tidak perlu                |
| **Hasil jika salah**      | Error: "Invalid cloud_name"   | Upload gagal                  |

---

## ❓ Jika Masih Ada Error

1. **Pastikan env var tidak ada typo**

   - Cek di Railway: copy-paste value dari Cloudinary dashboard
   - Jangan ketik manual (rawan typo)

2. **Jika tetap error, lakukan ini:**

   - Buka Railway > Environment
   - Hapus 3 env var Cloudinary
   - Tambahkan kembali dari awal dengan nilai yang benar (copy-paste)
   - Redeploy

3. **Jika upload masih gagal setelah fix:**
   - Cek console browser (F12 > Console) untuk error message
   - Cek Railway Deploy Logs untuk error detail
   - Kirimkan error message untuk troubleshooting lebih lanjut

---

## 📚 File yang Terkait

- ✅ `backend/src/middleware/multerCloudinary.js` - Sudah menggunakan env var (tidak perlu edit)
- ✅ `backend/src/controllers/admin/suratAdminController.js` - Sudah benar (tidak perlu edit)
- ✅ `src/views/Admin/AdminDashboard.vue` - Sudah benar (tidak perlu edit)

Semua file sudah menggunakan env var, jadi hanya perlu update Railway env var!

---

## 🚀 Next Steps

1. Update Railway env var dengan cloud name yang benar: `dr9crwcnn`
2. Redeploy backend
3. Test upload dari admin dashboard
4. Verifikasi file di Neon database
5. Test preview/download di frontend

Sukses! 🎉
