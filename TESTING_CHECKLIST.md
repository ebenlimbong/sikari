# ✅ Testing Checklist: Upload Surat Warga

## Pre-Deploy Checklist

- [ ] Semua file sudah dicommit ke git
- [ ] Tidak ada syntax error di file yang diubah
- [ ] Environment variable Cloudinary sudah benar di Railway

---

## Post-Deploy Checklist

### Backend Deployment

- [ ] Railway auto-redeploy selesai (check dashboard)
- [ ] Backend URL still responds: `https://sikari-backend-production.up.railway.app/health` (atau endpoint apapun)
- [ ] Database connection masih OK (check Neon console)

### Frontend Deployment

- [ ] Vercel auto-redeploy selesai
- [ ] Frontend dapat diakses: `https://sikari-desa.vercel.app/`
- [ ] Tidak ada build error

---

## Manual Testing Steps

### Test 1: Basic Flow - SK Domisili

1. **Login sebagai warga** ke https://sikari-desa.vercel.app/
2. **Buka "Ajukan Surat"** → pilih **"SK Domisili"**
3. **Isi form data** (boleh pakai dummy data)
4. **Upload file KTP** (atau dokumen lain)
5. **Klik tombol "Ajukan Permohonan"**

### Expected Result Test 1:

- ✅ Tidak ada error 400 di console
- ✅ Loading spinner muncul sementara
- ✅ Success dialog muncul dengan "No. Tiket: TIC-20251202-XXXX"
- ✅ Redirect ke halaman "Surat Saya"
- ✅ Di list "Surat Saya", surat baru ada dengan status "Belum Dikerjakan"

### Browser Console Check (F12):

```javascript
// Cek di console Network tab:
POST /api/surat → Status 201 (Created) ✅
// Bukan 400 ❌
```

---

### Test 2: Verify di Cloudinary

1. **Buka Cloudinary dashboard**: https://console.cloudinary.com/
2. **Login** dengan account Anda
3. **Navigate ke Media Library**
4. **Filter folder**: `surat-desa/dokumen-warga`

### Expected Result Test 2:

- ✅ File baru ada di folder `surat-desa/dokumen-warga`
- ✅ Nama file: `dokumen-warga-[ID]-[TIMESTAMP].pdf`
- ✅ File size sesuai (bukan 0 bytes)
- ✅ Bisa di-preview / di-download

---

### Test 3: Verify di Database

1. **Buka Neon Console**: https://console.neon.tech/
2. **Navigate ke SQL Editor**
3. **Run query**:

```sql
SELECT id, noTiket, jenisSurat, status, data, createdAt
FROM "Surat"
ORDER BY createdAt DESC
LIMIT 5;
```

### Expected Result Test 3:

- ✅ Record baru ada dengan jenisSurat = "Surat Keterangan Domisili"
- ✅ status = "Belum Dikerjakan"
- ✅ Column `data` berisi JSON dengan `files.dokumenWarga.url` (Cloudinary URL)
- ✅ createdAt = hari/jam saat test

---

### Test 4: Test Upload di Form Lain

Ulangi Test 1 untuk form lain:

- [ ] SK Tanpa Keterangan (SKTM)
- [ ] SK Penghasilan
- [ ] SK Usaha
- [ ] SK Kelahiran
- [ ] SK Pengantar KK/KTP/Akta

### Expected Result Test 4:

- ✅ Semua form bisa upload tanpa error 400
- ✅ Semua file ter-upload ke Cloudinary
- ✅ Semua record ter-create di database

---

### Test 5: Admin Upload Surat Final (Feature Check)

1. **Login sebagai admin**
2. **Buka Dashboard Admin** → pilih surat yang status "Selesai"
3. **Klik tombol "Upload Surat Selesai"**
4. **Upload file PDF** (surat final)
5. **Klik "Submit"**

### Expected Result Test 5:

- ✅ File ter-upload ke folder `surat-desa/surat-selesai`
- ✅ Warga bisa download file di modal "Detail Surat"
- ✅ URL Cloudinary ter-simpan di database field `fileSuratSelesai`

---

### Test 6: Integration Test - End to End

1. **Warga upload dokumen** (Test 1)
2. **Admin review & ubah status ke "Selesai"**
3. **Admin upload surat final** (Test 5)
4. **Warga cek "Surat Saya"** → status = "Selesai"
5. **Warga klik "Lihat Detail"** → modal buka
6. **Cek apakah tombol "Download" muncul**
7. **Klik "Download"** → file ter-download

### Expected Result Test 6:

- ✅ Alur lengkap berjalan tanpa error
- ✅ File dari admin bisa di-download warga
- ✅ Tidak ada broken link

---

## If Error Occurs

### Error 400 di Frontend Console

```
❌ POST /api/surat 400 (Bad Request)
Response: {"success": false, "error": "..."}
```

**Debugging Steps:**

1. **Cek backend logs di Railway:**

   - Buka Railway dashboard
   - View logs tab
   - Cari error message

2. **Cek middleware:**

   - Pastikan `multerSuratSelesai.js` middleware aktif
   - Pastikan field name di FormData = `fileSuratSelesai`

3. **Cek Cloudinary config:**

   - Railway env var: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - Pastikan semuanya SET dan BENAR

4. **Test endpoint dengan Postman:**

   ```
   POST https://sikari-backend-production.up.railway.app/api/surat
   Headers:
     - Authorization: Bearer [TOKEN]
     - Content-Type: multipart/form-data

   Body:
     - jenisSurat: "Surat Keterangan Domisili"
     - data: {JSON}
     - fileSuratSelesai: [FILE]
   ```

---

### Error: File tidak muncul di Cloudinary

```
❌ File ter-create di database tapi URL kosong/undefined
```

**Debugging Steps:**

1. Cek console backend di Railway → apakah logging muncul?
2. Cek Cloudinary API key & secret di `.env`
3. Cek folder permissions di Cloudinary

---

### Error: Database tidak ter-create record

```
❌ No. Tiket tidak muncul di frontend
```

**Debugging Steps:**

1. Cek apakah Database connection OK
2. Cek Prisma schema (`schema.prisma`) sudah di-sync dengan database
3. Cek error di Railway logs

---

## Success Indicators ✅

Ketika semua test berhasil:

- ✅ Warga bisa upload dokumen dari frontend
- ✅ File ter-upload ke Cloudinary (bukan local storage)
- ✅ Record ter-create di database dengan no tiket
- ✅ Admin bisa upload surat final
- ✅ Warga bisa download surat final
- ✅ Tidak ada error 400 / 500
- ✅ Alur lengkap berjalan smooth

---

## Performance Notes

- **File Upload Time**: Tergantung ukuran file & kecepatan internet

  - Typical: 2-5 detik untuk file 1-2MB
  - Cloudinary: ~1-2 detik processing

- **Database Query**:

  - Create record: ~100-200ms
  - Fetch list: ~50-100ms

- **Frontend UX**:
  - Loading spinner harus muncul saat upload
  - Success dialog harus jelas

---

## Rollback Plan (Jika Ada Issue)

Jika ada masalah serius:

1. **Revert last commit:**

   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Railway akan auto-redeploy** ke versi sebelumnya

3. **Check production API** masih working

---

## Notes untuk Tim

- 📌 Jangan ubah folder Cloudinary default
- 📌 Jangan hapus file dari Cloudinary untuk backup
- 📌 Monitor storage usage di Cloudinary (free tier: 25GB)
- 📌 Jika perlu scale, upgrade ke paid plan

---

**Testing Date**: ******\_\_\_******  
**Tester Name**: ******\_\_\_******  
**Status**: ☐ PASSED ☐ FAILED  
**Notes**: **********\_**********

---

Generated: 2 Desember 2025
