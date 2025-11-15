<template>
  <div class="sktm-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/ajukan-surat" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Formulir Surat Keterangan Tidak Mampu</h1>
        <p class="page-subtitle">Lengkapi data berikut untuk mengajukan Surat Keterangan Tidak Mampu</p>
      </div>
    </div>

    <!-- Alert Info -->
    <div class="alert-info">
      <span class="material-icons">info</span>
      <div>
        <strong>Perhatian:</strong> Pastikan semua data yang Anda masukkan sudah benar.
        Dokumen yang diunggah harus dalam format PDF, JPG, atau PNG dengan ukuran maksimal 2MB per file.
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="sktm-form">
      <!-- Section A: Data Diri -->
      <div class="form-section">
        <h2 class="section-title">A. Data Diri</h2>

        <div class="form-row">
          <div class="form-group">
            <label for="namaLengkap">Nama Lengkap <span class="required">*</span></label>
            <input
              type="text"
              id="namaLengkap"
              v-model="formData.namaLengkap"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div class="form-group">
            <label for="tempatLahir">Tempat Lahir <span class="required">*</span></label>
            <input
              type="text"
              id="tempatLahir"
              v-model="formData.tempatLahir"
              placeholder="Masukkan tempat lahir"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="tanggalLahir">Tanggal Lahir <span class="required">*</span></label>
            <input
              type="date"
              id="tanggalLahir"
              v-model="formData.tanggalLahir"
              required
            />
          </div>

          <div class="form-group">
            <label for="jenisKelamin">Jenis Kelamin <span class="required">*</span></label>
            <select
              id="jenisKelamin"
              v-model="formData.jenisKelamin"
              required
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="agama">Agama <span class="required">*</span></label>
            <select
              id="agama"
              v-model="formData.agama"
              required
            >
              <option value="">Pilih agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>

          <div class="form-group">
            <label for="kewarganegaraan">Kewarganegaraan <span class="required">*</span></label>
            <input
              type="text"
              id="kewarganegaraan"
              v-model="formData.kewarganegaraan"
              placeholder="Contoh: Indonesia"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="pekerjaan">Pekerjaan <span class="required">*</span></label>
            <input
              type="text"
              id="pekerjaan"
              v-model="formData.pekerjaan"
              placeholder="Masukkan pekerjaan"
              required
            />
          </div>

          <div class="form-group">
            <label for="nik">NIK <span class="required">*</span></label>
            <input
              type="text"
              id="nik"
              v-model="formData.nik"
              placeholder="16 digit NIK"
              maxlength="16"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="nomorPonsel">Nomor Ponsel <span class="required">*</span></label>
            <div class="phone-input">
              <span class="phone-prefix">62</span>
              <input
                type="tel"
                id="nomorPonsel"
                v-model="formData.nomorPonsel"
                placeholder="8123456789"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="digunakan">Digunakan Untuk <span class="required">*</span></label>
            <input
              type="text"
              id="digunakan"
              v-model="formData.digunakan"
              placeholder="Contoh: Beasiswa, Bantuan Sosial"
              required
            />
          </div>
        </div>

        <div class="form-group full-width">
          <label for="alamatKTP">Alamat KTP <span class="required">*</span></label>
          <textarea
            id="alamatKTP"
            v-model="formData.alamatKTP"
            rows="3"
            placeholder="Masukkan alamat lengkap sesuai KTP"
            required
          ></textarea>
        </div>
      </div>

      <!-- Section B: Lampiran Persyaratan -->
      <div class="form-section">
        <h2 class="section-title">B. Lampiran Persyaratan</h2>

        <div class="form-group">
          <label>Unggah KTP <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadKTP"
              @change="handleFileUpload($event, 'ktp')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKTP" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.ktp ? formData.files.ktp.name : 'Pilih berkas' }}</span>
            </label>
            <button
              v-if="formData.files.ktp"
              type="button"
              @click="removeFile('ktp')"
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>

        <div class="form-group">
          <label>Unggah KK <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadKK"
              @change="handleFileUpload($event, 'kk')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKK" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.kk ? formData.files.kk.name : 'Pilih berkas' }}</span>
            </label>
            <button
              v-if="formData.files.kk"
              type="button"
              @click="removeFile('kk')"
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>

        <div class="form-group">
          <label>Unggah Pengantar RT <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadRT"
              @change="handleFileUpload($event, 'pengantarRT')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadRT" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.pengantarRT ? formData.files.pengantarRT.name : 'Pilih berkas' }}</span>
            </label>
            <button
              v-if="formData.files.pengantarRT"
              type="button"
              @click="removeFile('pengantarRT')"
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>
      </div>

      <!-- Section C: Metode Pengambilan -->
      <div class="form-section">
        <h2 class="section-title">C. Metode Pengambilan Surat</h2>

        <div class="form-group">
          <label>Pilih Metode Pengambilan <span class="required">*</span></label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                type="radio"
                name="metodePengambilan"
                value="offline"
                v-model="formData.metodePengambilan"
                required
              />
              <div class="radio-content">
                <span class="material-icons">store</span>
                <div>
                  <strong>Offline</strong>
                  <small>Ambil langsung di kantor desa</small>
                </div>
              </div>
            </label>

            <label class="radio-option">
              <input
                type="radio"
                name="metodePengambilan"
                value="online"
                v-model="formData.metodePengambilan"
                required
              />
              <div class="radio-content">
                <span class="material-icons">cloud_download</span>
                <div>
                  <strong>Online</strong>
                  <small>Unduh surat dalam format PDF</small>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div v-if="formData.metodePengambilan === 'offline'" class="form-group">
          <label for="jadwalPengambilan">Jadwal Pengambilan</label>
          <input
            type="date"
            id="jadwalPengambilan"
            v-model="formData.jadwalPengambilan"
            :min="minDate"
          />
          <small class="file-hint">Pilih tanggal pengambilan surat (minimal 3 hari dari sekarang)</small>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn-cancel">
          <span class="material-icons">close</span>
          Batal
        </button>
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          <span class="material-icons">send</span>
          <span v-if="!isSubmitting">Ajukan Permohonan</span>
          <span v-else>Memproses...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'; // ✅ Tambahkan onMounted
import { useRouter } from 'vue-router';
import api from '@/api'; // ✅ Import API

const router = useRouter();
const isSubmitting = ref(false);

const formData = ref({
  namaLengkap: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  kewarganegaraan: 'Indonesia',
  pekerjaan: '',
  nik: '',
  nomorPonsel: '',
  digunakan: '',
  alamatKTP: '',
  files: {
    ktp: null,
    kk: null,
    pengantarRT: null
  },
  metodePengambilan: '',
  jadwalPengambilan: ''
});

// ✅ Tambahkan ini: Isi data dari profil saat halaman dimuat
onMounted(async () => {
  try {
    const response = await api.get('/auth/profile');
    const user = response.data.user;

    // Isi data diri dari profil user
    formData.value.namaLengkap = `${user.firstName} ${user.lastName}`;
    formData.value.nik = user.nik;
    formData.value.tempatLahir = user.tempatLahir || '';
    formData.value.tanggalLahir = user.tanggalLahir ? new Date(user.tanggalLahir).toISOString().split('T')[0] : '';
    formData.value.jenisKelamin = user.jenisKelamin || '';
    formData.value.agama = user.agama || '';
    formData.value.pekerjaan = user.pekerjaan || '';
    formData.value.kewarganegaraan = user.kewarganegaraan || 'Indonesia';
    formData.value.nomorPonsel = user.phoneNumber.replace('+62', '').replace(/^0/, '');
    formData.value.alamatKTP = user.alamatLengkap || '';

  } catch (err) {
    console.error('Gagal muat profil:', err);
    // Biarkan user isi manual — tidak menghentikan proses
  }
});

const minDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
});

const handleFileUpload = (event, fileType) => {
  const file = event.target.files[0];

  if (!file) return;

  // Validasi ukuran file (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file terlalu besar! Maksimal 2MB');
    event.target.value = '';
    return;
  }

  // Validasi format file
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    alert('Format file tidak didukung! Gunakan PDF, JPG, atau PNG');
    event.target.value = '';
    return;
  }

  formData.value.files[fileType] = file;
};

const removeFile = (fileType) => {
  formData.value.files[fileType] = null;
  const inputId = fileType === 'ktp' ? 'uploadKTP' : fileType === 'kk' ? 'uploadKK' : 'uploadRT';
  document.getElementById(inputId).value = '';
};

// ✅ INTEGRASI BACKEND - Sama seperti SKDomisili
const handleSubmit = async () => {
  // Validasi NIK
  if (formData.value.nik.length !== 16) {
    alert('NIK harus 16 digit!');
    return;
  }

  // Validasi file upload
  if (!formData.value.files.ktp || !formData.value.files.kk || !formData.value.files.pengantarRT) {
    alert('Semua dokumen harus diunggah!');
    return;
  }

  isSubmitting.value = true;

  try {
    // ✅ Siapkan payload untuk backend
    const payload = {
      jenisSurat: 'Surat Keterangan Tidak Mampu', // ← Nama jenis surat
      data: { // ← KEY UTAMA: 'data'
        ...formData.value,
        // Simpan metadata file (name & size), bukan objek File
        files: {
          ktp: formData.value.files.ktp ? {
            name: formData.value.files.ktp.name,
            size: formData.value.files.ktp.size
          } : null,
          kk: formData.value.files.kk ? {
            name: formData.value.files.kk.name,
            size: formData.value.files.kk.size
          } : null,
          pengantarRT: formData.value.files.pengantarRT ? {
            name: formData.value.files.pengantarRT.name,
            size: formData.value.files.pengantarRT.size
          } : null
        }
      }
    };

    console.log('📤 Sending SKTM data:', payload);

    // ✅ Kirim ke backend menggunakan API
    const response = await api.post('/surat', payload);

    console.log('✅ Response:', response.data);

    // ✅ Tampilkan pesan sukses dengan nomor tiket
    alert(
      `Permohonan SKTM berhasil diajukan!\n\n` +
      `No. Tiket: ${response.data.surat.noTiket}\n\n` +
      `Silakan cek riwayat di menu "Surat Saya".`
    );

    // ✅ Redirect ke Surat Saya
    router.push('/surat-saya');

  } catch (error) {
    console.error('❌ Error submitting SKTM:', error);

    // ✅ Error handling yang informatif
    const errorMessage = error.response?.data?.error
      || error.response?.data?.message
      || 'Gagal mengajukan surat. Silakan coba lagi.';

    alert(`❌ ${errorMessage}`);

  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  if (confirm('Apakah Anda yakin ingin membatalkan pengajuan?')) {
    router.push('/ajukan-surat');
  }
};
</script>

  <style scoped>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  .sktm-form-container {
    max-width: 1000px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Page Header */
  .page-header {
    background: linear-gradient(135deg, #006400, #228B22);
    padding: 2rem;
    border-radius: 12px;
    color: white;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(0, 100, 0, 0.2);
  }

  .header-content {
    position: relative;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-4px);
  }

  .back-button .material-icons {
    font-size: 20px;
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  .page-subtitle {
    font-size: 1rem;
    margin: 0;
    opacity: 0.95;
  }

  /* Alert Info */
  .alert-info {
    background: #e6f7ff;
    border-left: 4px solid #1890ff;
    padding: 1.25rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .alert-info .material-icons {
    color: #1890ff;
    font-size: 24px;
  }

  .alert-info strong {
    color: #0050b3;
  }

  /* Form */
  .sktm-form {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .form-section {
    margin-bottom: 2.5rem;
  }

  .form-section:last-of-type {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #e0e0e0;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group.full-width {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .required {
    color: #e74c3c;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.85rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #006400;
    box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
  }

  .phone-input {
    display: flex;
    align-items: center;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .phone-input:focus-within {
    border-color: #006400;
    box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
  }

  .phone-prefix {
    background: #f5f5f5;
    padding: 0.85rem 1rem;
    font-weight: 600;
    color: #666;
  }

  .phone-input input {
    border: none !important;
    flex: 1;
    box-shadow: none !important;
  }

  /* File Upload */
  .file-upload-wrapper {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .file-upload-label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem;
    border: 2px dashed #d0d0d0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fafafa;
  }

  .file-upload-label:hover {
    border-color: #006400;
    background: #f0f8f0;
  }

  .file-upload-label .material-icons {
    color: #006400;
    font-size: 24px;
  }

  .remove-file-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #fee;
    color: #e74c3c;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .remove-file-btn:hover {
    background: #e74c3c;
    color: white;
  }

  .file-hint {
    color: #666;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }

  /* Radio Group */
  .radio-group {
    display: grid;
    gap: 1rem;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .radio-option:hover {
    border-color: #006400;
    background: #f0f8f0;
  }

  .radio-option input[type="radio"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .radio-option input[type="radio"]:checked + .radio-content {
    color: #006400;
  }

  .radio-option input[type="radio"]:checked {
    accent-color: #006400;
  }

  .radio-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .radio-content .material-icons {
    font-size: 32px;
    color: #006400;
  }

  .radio-content strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .radio-content small {
    color: #666;
    font-size: 0.85rem;
  }

  /* Form Actions */
  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 2rem;
    border-top: 2px solid #e0e0e0;
  }

  .btn-cancel,
  .btn-submit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .btn-cancel {
    background: #f5f5f5;
    color: #666;
  }

  .btn-cancel:hover {
    background: #e0e0e0;
  }

  .btn-submit {
    background: linear-gradient(135deg, #006400, #228B22);
    color: white;
  }

  .btn-submit:hover:not(:disabled) {
    background: linear-gradient(135deg, #004d00, #1a7a1a);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
  }

  .btn-submit:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }

  .btn-cancel .material-icons,
  .btn-submit .material-icons {
    font-size: 20px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .sktm-form-container {
      padding: 0;
    }

    .page-header {
      padding: 1.5rem;
    }

    .page-title {
      font-size: 1.5rem;
    }

    .sktm-form {
      padding: 1.5rem;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .form-actions {
      flex-direction: column;
    }

    .btn-cancel,
    .btn-submit {
      width: 100%;
      justify-content: center;
    }
  }
  </style>
