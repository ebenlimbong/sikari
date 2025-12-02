<template>
  <div class="sk-usaha-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/ajukan-surat" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Formulir Surat Keterangan Usaha</h1>
        <p class="page-subtitle">Lengkapi data berikut untuk mengajukan Surat Keterangan Usaha</p>
      </div>
    </div>

    <!-- Alert Info -->
    <div class="alert-info">
      <span class="material-icons">info</span>
      <div>
        <strong>Perhatian:</strong> Pastikan data usaha yang Anda masukkan sudah benar dan lengkap.
        Dokumen pendukung seperti foto tempat usaha dan bukti kepemilikan/sewa tempat usaha wajib diunggah.
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="sk-usaha-form">
      <!-- Section A: Data Pemohon -->
      <div class="form-section">
        <h2 class="section-title">A. Data Pemohon</h2>

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
            <label for="tempatLahir">Tempat Lahir <span class="required">*</span></label>
            <input
              type="text"
              id="tempatLahir"
              v-model="formData.tempatLahir"
              placeholder="Masukkan tempat lahir"
              required
            />
          </div>

          <div class="form-group">
            <label for="tanggalLahir">Tanggal Lahir <span class="required">*</span></label>
            <input
              type="date"
              id="tanggalLahir"
              v-model="formData.tanggalLahir"
              required
            />
          </div>
        </div>

        <div class="form-row">
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
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="pendidikan">Pendidikan Terakhir <span class="required">*</span></label>
            <select
              id="pendidikan"
              v-model="formData.pendidikan"
              required
            >
              <option value="">Pilih pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div class="form-group">
            <label for="nomorPonsel">Nomor Ponsel <span class="required">*</span></label>
            <div class="phone-input">
              <span class="phone-prefix">+62</span>
              <input
                type="tel"
                id="nomorPonsel"
                v-model="formData.nomorPonsel"
                placeholder="8123456789"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-group full-width">
          <label for="alamatPemohon">Alamat Pemohon <span class="required">*</span></label>
          <textarea
            id="alamatPemohon"
            v-model="formData.alamatPemohon"
            rows="3"
            placeholder="Masukkan alamat lengkap pemohon"
            required
          ></textarea>
        </div>
      </div>

      <!-- Section B: Data Usaha -->
      <div class="form-section">
        <h2 class="section-title">B. Data Usaha</h2>

        <div class="form-row">
          <div class="form-group">
            <label for="namaUsaha">Nama Usaha <span class="required">*</span></label>
            <input
              type="text"
              id="namaUsaha"
              v-model="formData.namaUsaha"
              placeholder="Masukkan nama usaha"
              required
            />
          </div>

          <div class="form-group">
            <label for="jenisUsaha">Jenis Usaha <span class="required">*</span></label>
            <select
              id="jenisUsaha"
              v-model="formData.jenisUsaha"
              required
            >
              <option value="">Pilih jenis usaha</option>
              <option value="Perdagangan">Perdagangan</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Jasa">Jasa</option>
              <option value="Pertanian">Pertanian</option>
              <option value="Peternakan">Peternakan</option>
              <option value="Perikanan">Perikanan</option>
              <option value="Industri Rumahan">Industri Rumahan</option>
              <option value="Kerajinan">Kerajinan</option>
              <option value="Konveksi">Konveksi</option>
              <option value="Bengkel">Bengkel</option>
              <option value="Warung/Toko">Warung/Toko</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div class="form-group full-width">
          <label for="bidangUsaha">Bidang Usaha <span class="required">*</span></label>
          <input
            type="text"
            id="bidangUsaha"
            v-model="formData.bidangUsaha"
            placeholder="Contoh: Penjualan Sembako, Warung Makan, Salon, dll"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="modalUsaha">Modal Usaha <span class="required">*</span></label>
            <div class="currency-input">
              <span class="currency-prefix">Rp</span>
              <input
                type="text"
                id="modalUsaha"
                v-model="formData.modalUsaha"
                @input="formatCurrency"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="jumlahKaryawan">Jumlah Karyawan <span class="required">*</span></label>
            <input
              type="number"
              id="jumlahKaryawan"
              v-model="formData.jumlahKaryawan"
              placeholder="Contoh: 3"
              min="0"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="tanggalMulaiUsaha">Tanggal Mulai Usaha <span class="required">*</span></label>
            <input
              type="date"
              id="tanggalMulaiUsaha"
              v-model="formData.tanggalMulaiUsaha"
              required
            />
          </div>

          <div class="form-group">
            <label for="statusTempat">Status Tempat Usaha <span class="required">*</span></label>
            <select
              id="statusTempat"
              v-model="formData.statusTempat"
              required
            >
              <option value="">Pilih status tempat</option>
              <option value="Milik Sendiri">Milik Sendiri</option>
              <option value="Sewa">Sewa</option>
              <option value="Kontrak">Kontrak</option>
              <option value="Pinjaman">Pinjaman</option>
            </select>
          </div>
        </div>

        <div class="form-group full-width">
          <label for="alamatUsaha">Alamat Lokasi Usaha <span class="required">*</span></label>
          <textarea
            id="alamatUsaha"
            v-model="formData.alamatUsaha"
            rows="3"
            placeholder="Masukkan alamat lengkap lokasi usaha (Jalan, RT/RW, Desa, Kecamatan)"
            required
          ></textarea>
        </div>

        <div class="form-group full-width">
          <label for="deskripsiUsaha">Deskripsi Usaha <span class="required">*</span></label>
          <textarea
            id="deskripsiUsaha"
            v-model="formData.deskripsiUsaha"
            rows="4"
            placeholder="Jelaskan secara singkat tentang usaha Anda, produk/jasa yang dijual, dan target pasar"
            required
          ></textarea>
        </div>

        <div class="form-group full-width">
          <label for="tujuanPembuatan">Tujuan Pembuatan Surat <span class="required">*</span></label>
          <input
            type="text"
            id="tujuanPembuatan"
            v-model="formData.tujuanPembuatan"
            placeholder="Contoh: Pengajuan KUR, Perizinan Usaha, dll"
            required
          />
        </div>
      </div>

      <!-- Section C: Lampiran Persyaratan -->
      <div class="form-section">
        <h2 class="section-title">C. Lampiran Persyaratan</h2>

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
              <span>{{ formData.files.ktp ? formData.files.ktp.name : 'Pilih berkas KTP' }}</span>
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
          <label>Unggah Kartu Keluarga <span class="required">*</span></label>
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
              <span>{{ formData.files.kk ? formData.files.kk.name : 'Pilih berkas KK' }}</span>
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
          <label>Unggah Foto Tempat Usaha <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadFotoUsaha"
              @change="handleFileUpload($event, 'fotoUsaha')"
              accept=".jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadFotoUsaha" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.fotoUsaha ? formData.files.fotoUsaha.name : 'Pilih foto tempat usaha' }}</span>
            </label>
            <button
              v-if="formData.files.fotoUsaha"
              type="button"
              @click="removeFile('fotoUsaha')"
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: JPG, PNG. Maksimal 2MB. (Foto tampak depan/dalam tempat usaha)</small>
        </div>

        <div class="form-group">
          <label>Unggah Bukti Kepemilikan/Sewa Tempat Usaha <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadBuktiTempat"
              @change="handleFileUpload($event, 'buktiTempat')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadBuktiTempat" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.buktiTempat ? formData.files.buktiTempat.name : 'Pilih berkas bukti tempat' }}</span>
            </label>
            <button
              v-if="formData.files.buktiTempat"
              type="button"
              @click="removeFile('buktiTempat')"
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB. (Sertifikat, Kontrak Sewa, atau Surat Izin Pemilik)</small>
        </div>

        <div class="form-group">
          <label>Unggah Surat Pengantar RT/RW</label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadPengantarRT"
              @change="handleFileUpload($event, 'pengantarRT')"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
            />
            <label for="uploadPengantarRT" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.pengantarRT ? formData.files.pengantarRT.name : 'Pilih berkas pengantar RT/RW (opsional)' }}</span>
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
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB (Opsional)</small>
        </div>
      </div>

      <!-- Section D: Metode Pengambilan -->
      <div class="form-section">
        <h2 class="section-title">D. Metode Pengambilan Surat</h2>

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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';

const router = useRouter();
const isSubmitting = ref(false);

const formData = ref({
  // Data Pemohon
  namaLengkap: '',
  nik: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  pendidikan: '',
  nomorPonsel: '',
  alamatPemohon: '',

  // Data Usaha
  namaUsaha: '',
  jenisUsaha: '',
  bidangUsaha: '',
  modalUsaha: '',
  jumlahKaryawan: '',
  tanggalMulaiUsaha: '',
  statusTempat: '',
  alamatUsaha: '',
  deskripsiUsaha: '',
  tujuanPembuatan: '',

  // Files
  files: {
    ktp: null,
    kk: null,
    fotoUsaha: null,
    buktiTempat: null,
    pengantarRT: null
  },

  // Metode Pengambilan
  metodePengambilan: '',
  jadwalPengambilan: ''
});

// ✅ Isi otomatis dari profil saat halaman dimuat
onMounted(async () => {
  try {
    const response = await api.get('/auth/profile');
    const user = response.data.user;

    formData.value.namaLengkap = `${user.firstName} ${user.lastName}`;
    formData.value.nik = user.nik;
    formData.value.tempatLahir = user.tempatLahir || '';
    formData.value.tanggalLahir = user.tanggalLahir ? new Date(user.tanggalLahir).toISOString().split('T')[0] : '';
    formData.value.jenisKelamin = user.jenisKelamin || '';
    formData.value.agama = user.agama || '';
    formData.value.pendidikan = user.pendidikan || '';
    formData.value.nomorPonsel = user.phoneNumber.replace('+62', '').replace(/^0/, '');
    formData.value.alamatPemohon = user.alamatLengkap || '';

  } catch (err) {
    console.error('Gagal muat profil:', err);
  }
});

const minDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
});

const formatCurrency = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  formData.value.modalUsaha = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const handleFileUpload = (event, fileType) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file terlalu besar! Maksimal 2MB');
    event.target.value = '';
    return;
  }

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
  const inputMap = {
    ktp: 'uploadKTP',
    kk: 'uploadKK',
    fotoUsaha: 'uploadFotoUsaha',
    buktiTempat: 'uploadBuktiTempat',
    pengantarRT: 'uploadPengantarRT'
  };
  const inputId = inputMap[fileType];
  if (inputId) {
    const el = document.getElementById(inputId);
    if (el) el.value = '';
  }
};

// ✅ INTEGRASI BACKEND - Upload file dengan FormData
const handleSubmit = async () => {
  // Validasi NIK
  if (formData.value.nik.length !== 16) {
    alert('NIK harus 16 digit!');
    return;
  }

  // Validasi lampiran wajib
  if (
    !formData.value.files.ktp ||
    !formData.value.files.kk ||
    !formData.value.files.fotoUsaha ||
    !formData.value.files.buktiTempat
  ) {
    alert('Dokumen KTP, KK, Foto Usaha, dan Bukti Tempat wajib diunggah!');
    return;
  }

  isSubmitting.value = true;

  try {
    // ✅ Buat FormData
    const formDataToSend = new FormData();

    formDataToSend.append('jenisSurat', 'Surat Keterangan Usaha');

    // ✅ Data JSON tanpa files
    const jsonData = {
      namaLengkap: formData.value.namaLengkap,
      nik: formData.value.nik,
      tempatLahir: formData.value.tempatLahir,
      tanggalLahir: formData.value.tanggalLahir,
      jenisKelamin: formData.value.jenisKelamin,
      agama: formData.value.agama,
      pendidikan: formData.value.pendidikan,
      nomorPonsel: formData.value.nomorPonsel,
      alamatPemohon: formData.value.alamatPemohon,
      namaUsaha: formData.value.namaUsaha,
      jenisUsaha: formData.value.jenisUsaha,
      bidangUsaha: formData.value.bidangUsaha,
      modalUsaha: formData.value.modalUsaha,
      jumlahKaryawan: formData.value.jumlahKaryawan,
      tanggalMulaiUsaha: formData.value.tanggalMulaiUsaha,
      statusTempat: formData.value.statusTempat,
      alamatUsaha: formData.value.alamatUsaha,
      deskripsiUsaha: formData.value.deskripsiUsaha,
      tujuanPembuatan: formData.value.tujuanPembuatan,
      metodePengambilan: formData.value.metodePengambilan,
      jadwalPengambilan: formData.value.jadwalPengambilan
    };
    formDataToSend.append('data', JSON.stringify(jsonData));

    // Kirim semua file yang di-attach oleh user
    for (const key in formData.value.files) {
      const f = formData.value.files[key];
      if (f) formDataToSend.append(key, f);
    }

    // Kirim
    const response = await api.post('/surat', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert(
      `✅ Permohonan Surat Keterangan Usaha berhasil diajukan!\n\n` +
      `No. Tiket: ${response.data.surat.noTiket}\n\n` +
      `Silakan cek halaman "Surat Saya".`
    );

    router.push('/surat-saya');

  } catch (error) {
    console.error('❌ Error submit SK Usaha:', error);
    const msg = error.response?.data?.error || 'Gagal mengajukan surat. Silakan coba lagi.';
    alert(`❌ ${msg}`);
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

.sk-usaha-form-container {
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

.page-header {
  background: linear-gradient(135deg, #34495e, #5d6d7e);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(52, 73, 94, 0.3);
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

.alert-info {
  background: #d6eaf8;
  border-left: 4px solid #34495e;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.alert-info .material-icons {
  color: #34495e;
  font-size: 24px;
}

.alert-info strong {
  color: #1b2631;
}

.sk-usaha-form {
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
  border-color: #34495e;
  box-shadow: 0 0 0 3px rgba(52, 73, 94, 0.1);
}

.phone-input,
.currency-input {
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.phone-input:focus-within,
.currency-input:focus-within {
  border-color: #34495e;
  box-shadow: 0 0 0 3px rgba(52, 73, 94, 0.1);
}

.phone-prefix,
.currency-prefix {
  background: #f5f5f5;
  padding: 0.85rem 1rem;
  font-weight: 600;
  color: #666;
}

.phone-input input,
.currency-input input {
  border: none !important;
  flex: 1;
  box-shadow: none !important;
}

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
  border-color: #34495e;
  background: #ecf0f1;
}

.file-upload-label .material-icons {
  color: #34495e;
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
  border-color: #34495e;
  background: #ecf0f1;
}

.radio-option input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.radio-option input[type="radio"]:checked + .radio-content {
  color: #34495e;
}

.radio-option input[type="radio"]:checked {
  accent-color: #34495e;
}

.radio-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.radio-content .material-icons {
  font-size: 32px;
  color: #34495e;
}

.radio-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.radio-content small {
  color: #666;
  font-size: 0.85rem;
}

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
  background: linear-gradient(135deg, #34495e, #5d6d7e);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 73, 94, 0.3);
}

.btn-submit:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.btn-cancel .material-icons,
.btn-submit .material-icons {
  font-size: 20px;
}

@media (max-width: 768px) {
  .sk-usaha-form-container {
    padding: 0;
  }

  .page-header {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .sk-usaha-form {
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
