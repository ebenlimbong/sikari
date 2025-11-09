<template>
  <div class="sk-meninggal-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/ajukan-surat" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Formulir Surat Keterangan Meninggal Dunia</h1>
        <p class="page-subtitle">Lengkapi data berikut untuk mengajukan Surat Keterangan Meninggal Dunia</p>
      </div>
    </div>
    <!-- Alert Info -->
    <div class="alert-info">
      <span class="material-icons">info</span>
      <div>
        <strong>Perhatian:</strong> Data almarhum/lah dan pelapor harus diisi dengan benar. Dokumen pendukung (Surat Kematian dari RS/Puskesmas, KTP, KK) wajib diunggah.
        Format file: PDF, JPG, PNG (maks. 2MB/file).
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="sk-meninggal-form">
      <!-- Section A: Data Pelapor -->
      <div class="form-section">
        <h2 class="section-title">A. Data Pelapor</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="namaPelapor">Nama Lengkap Pelapor <span class="required">*</span></label>
            <input 
              type="text" 
              id="namaPelapor"
              v-model="formData.namaPelapor"
              placeholder="Nama orang yang melaporkan kematian"
              required
            />
          </div>
          <div class="form-group">
            <label for="nikPelapor">NIK Pelapor <span class="required">*</span></label>
            <input 
              type="text" 
              id="nikPelapor"
              v-model="formData.nikPelapor"
              placeholder="16 digit NIK"
              maxlength="16"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="hubungan">Hubungan dengan Almarhum <span class="required">*</span></label>
            <select 
              id="hubungan"
              v-model="formData.hubungan"
              required
            >
              <option value="">Pilih hubungan</option>
              <option value="Anak">Anak</option>
              <option value="Istri">Istri</option>
              <option value="Suami">Suami</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Saudara">Saudara</option>
              <option value="Wali">Wali</option>
              <option value="Lainnya">Lainnya</option>
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
      </div>

      <!-- Section B: Data Almarhum/Almarhumah -->
      <div class="form-section">
        <h2 class="section-title">B. Data Almarhum/Almarhumah</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="namaAlmarhum">Nama Lengkap <span class="required">*</span></label>
            <input 
              type="text" 
              id="namaAlmarhum"
              v-model="formData.namaAlmarhum"
              placeholder="Nama almarhum/lah"
              required
            />
          </div>
          <div class="form-group">
            <label for="nikAlmarhum">NIK <span class="required">*</span></label>
            <input 
              type="text" 
              id="nikAlmarhum"
              v-model="formData.nikAlmarhum"
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
              placeholder="Tempat lahir almarhum"
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
              <option value="">Pilih</option>
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
            <label for="statusPerkawinan">Status Perkawinan <span class="required">*</span></label>
            <select 
              id="statusPerkawinan"
              v-model="formData.statusPerkawinan"
              required
            >
              <option value="">Pilih status</option>
              <option value="Kawin">Kawin</option>
              <option value="Belum Kawin">Belum Kawin</option>
              <option value="Cerai Hidup">Cerai Hidup</option>
              <option value="Cerai Mati">Cerai Mati</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pekerjaan">Pekerjaan Terakhir</label>
            <input 
              type="text" 
              id="pekerjaan"
              v-model="formData.pekerjaan"
              placeholder="Contoh: PNS, Petani, Pedagang"
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="alamatKTP">Alamat KTP <span class="required">*</span></label>
          <textarea 
            id="alamatKTP"
            v-model="formData.alamatKTP"
            rows="2"
            placeholder="Alamat sesuai KTP almarhum"
            required
          ></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="tanggalMeninggal">Tanggal Meninggal <span class="required">*</span></label>
            <input 
              type="date" 
              id="tanggalMeninggal"
              v-model="formData.tanggalMeninggal"
              :max="today"
              required
            />
          </div>
          <div class="form-group">
            <label for="jamMeninggal">Jam Meninggal <span class="required">*</span></label>
            <input 
              type="time" 
              id="jamMeninggal"
              v-model="formData.jamMeninggal"
              required
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="tempatMeninggal">Tempat Meninggal <span class="required">*</span></label>
          <input 
            type="text" 
            id="tempatMeninggal"
            v-model="formData.tempatMeninggal"
            placeholder="Rumah, RS, dll — Cantumkan alamat lengkap"
            required
          />
        </div>
        <div class="form-group full-width">
          <label for="penyebabKematian">Penyebab Kematian <span class="required">*</span></label>
          <input 
            type="text" 
            id="penyebabKematian"
            v-model="formData.penyebabKematian"
            placeholder="Contoh: Serangan jantung, kecelakaan lalu lintas"
            required
          />
        </div>
      </div>

      <!-- Section C: Data Ahli Waris & Saksi -->
      <div class="form-section">
        <h2 class="section-title">C. Data Ahli Waris & Saksi</h2>
        <div class="form-group full-width">
          <label for="namaAhliWaris">Nama Ahli Waris Utama <span class="required">*</span></label>
          <input 
            type="text" 
            id="namaAhliWaris"
            v-model="formData.namaAhliWaris"
            placeholder="Nama calon penerima hak waris"
            required
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="nikAhliWaris">NIK Ahli Waris <span class="required">*</span></label>
            <input 
              type="text" 
              id="nikAhliWaris"
              v-model="formData.nikAhliWaris"
              placeholder="16 digit NIK"
              maxlength="16"
              required
            />
          </div>
          <div class="form-group">
            <label for="hubunganAhliWaris">Hubungan</label>
            <input 
              type="text" 
              id="hubunganAhliWaris"
              v-model="formData.hubunganAhliWaris"
              placeholder="Contoh: Anak kandung, istri"
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="namaSaksi1">Nama Saksi 1 <span class="required">*</span></label>
          <input 
            type="text" 
            id="namaSaksi1"
            v-model="formData.namaSaksi1"
            placeholder="Nama saksi pertama (biasanya RT/RW atau tokoh masyarakat)"
            required
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="nikSaksi1">NIK Saksi 1 <span class="required">*</span></label>
            <input 
              type="text" 
              id="nikSaksi1"
              v-model="formData.nikSaksi1"
              placeholder="16 digit NIK"
              maxlength="16"
              required
            />
          </div>
          <div class="form-group">
            <label for="alamatSaksi1">Alamat Saksi 1 <span class="required">*</span></label>
            <input 
              type="text" 
              id="alamatSaksi1"
              v-model="formData.alamatSaksi1"
              placeholder="Alamat lengkap saksi"
              required
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="namaSaksi2">Nama Saksi 2 <span class="required">*</span></label>
          <input 
            type="text" 
            id="namaSaksi2"
            v-model="formData.namaSaksi2"
            placeholder="Nama saksi kedua"
            required
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="nikSaksi2">NIK Saksi 2 <span class="required">*</span></label>
            <input 
              type="text" 
              id="nikSaksi2"
              v-model="formData.nikSaksi2"
              placeholder="16 digit NIK"
              maxlength="16"
              required
            />
          </div>
          <div class="form-group">
            <label for="alamatSaksi2">Alamat Saksi 2 <span class="required">*</span></label>
            <input 
              type="text" 
              id="alamatSaksi2"
              v-model="formData.alamatSaksi2"
              placeholder="Alamat lengkap saksi"
              required
            />
          </div>
        </div>
      </div>

      <!-- Section D: Lampiran Persyaratan -->
      <div class="form-section">
        <h2 class="section-title">D. Lampiran Persyaratan</h2>
        <div class="form-group">
          <label>Unggah KTP Pelapor <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadKTPPelapor"
              @change="handleFileUpload($event, 'ktpPelapor')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKTPPelapor" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.ktpPelapor ? formData.files.ktpPelapor.name : 'Pilih berkas KTP Pelapor' }}</span>
            </label>
            <button 
              v-if="formData.files.ktpPelapor" 
              type="button" 
              @click="removeFile('ktpPelapor')" 
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>
        <div class="form-group">
          <label>Unggah KTP Almarhum <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadKTPAlmarhum"
              @change="handleFileUpload($event, 'ktpAlmarhum')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKTPAlmarhum" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.ktpAlmarhum ? formData.files.ktpAlmarhum.name : 'Pilih berkas KTP Almarhum' }}</span>
            </label>
            <button 
              v-if="formData.files.ktpAlmarhum" 
              type="button" 
              @click="removeFile('ktpAlmarhum')" 
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
              <span>{{ formData.files.kk ? formData.files.kk.name : 'Pilih berkas Kartu Keluarga' }}</span>
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
          <label>Unggah Surat Kematian dari RS/Puskesmas <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadSuratKematian"
              @change="handleFileUpload($event, 'suratKematian')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadSuratKematian" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.suratKematian ? formData.files.suratKematian.name : 'Pilih berkas Surat Kematian' }}</span>
            </label>
            <button 
              v-if="formData.files.suratKematian" 
              type="button" 
              @click="removeFile('suratKematian')" 
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>
        <div class="form-group">
          <label>Unggah Surat Pengantar RT/RW (Opsional)</label>
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
              <span>{{ formData.files.pengantarRT ? formData.files.pengantarRT.name : 'Pilih berkas Pengantar RT/RW (opsional)' }}</span>
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

      <!-- Section E: Metode Pengambilan -->
      <div class="form-section">
        <h2 class="section-title">E. Metode Pengambilan Surat</h2>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSubmitting = ref(false);

const formData = ref({
  // Pelapor
  namaPelapor: '',
  nikPelapor: '',
  hubungan: '',
  nomorPonsel: '',
  // Almarhum
  namaAlmarhum: '',
  nikAlmarhum: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  statusPerkawinan: '',
  pekerjaan: '',
  alamatKTP: '',
  tanggalMeninggal: '',
  jamMeninggal: '',
  tempatMeninggal: '',
  penyebabKematian: '',
  // Ahli Waris & Saksi
  namaAhliWaris: '',
  nikAhliWaris: '',
  hubunganAhliWaris: '',
  namaSaksi1: '',
  nikSaksi1: '',
  alamatSaksi1: '',
  namaSaksi2: '',
  nikSaksi2: '',
  alamatSaksi2: '',
  // Files
  files: {
    ktpPelapor: null,
    ktpAlmarhum: null,
    kk: null,
    suratKematian: null,
    pengantarRT: null
  },
  // Metode Pengambilan
  metodePengambilan: '',
  jadwalPengambilan: ''
});

// Computed
const today = computed(() => new Date().toISOString().split('T')[0]);
const minDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
});

// File handling
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
    ktpPelapor: 'uploadKTPPelapor',
    ktpAlmarhum: 'uploadKTPAlmarhum',
    kk: 'uploadKK',
    suratKematian: 'uploadSuratKematian',
    pengantarRT: 'uploadPengantarRT'
  };
  const inputId = inputMap[fileType];
  if (inputId) document.getElementById(inputId).value = '';
};

// Generate ticket
const generateTicketNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const r = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TIC-${y}${m}${d}-${r}`;
};

// Save to localStorage
const savePengajuan = (pengajuanData) => {
  try {
    const existing = localStorage.getItem('pengajuanSurat');
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(pengajuanData);
    localStorage.setItem('pengajuanSurat', JSON.stringify(list));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
};

// Submit
const handleSubmit = async () => {
  // Validasi NIK pelapor & almarhum
  if (formData.value.nikPelapor.length !== 16) {
    alert('NIK Pelapor harus 16 digit!');
    return;
  }
  if (formData.value.nikAlmarhum.length !== 16) {
    alert('NIK Almarhum harus 16 digit!');
    return;
  }
  if (formData.value.nikAhliWaris && formData.value.nikAhliWaris.length !== 16) {
    alert('NIK Ahli Waris harus 16 digit!');
    return;
  }
  if (formData.value.nikSaksi1.length !== 16) {
    alert('NIK Saksi 1 harus 16 digit!');
    return;
  }
  if (formData.value.nikSaksi2.length !== 16) {
    alert('NIK Saksi 2 harus 16 digit!');
    return;
  }

  // Validasi file wajib
  const requiredFiles = ['ktpPelapor', 'ktpAlmarhum', 'kk', 'suratKematian'];
  for (const key of requiredFiles) {
    if (!formData.value.files[key]) {
      alert(`Dokumen "${key === 'ktpPelapor' ? 'KTP Pelapor' : key === 'ktpAlmarhum' ? 'KTP Almarhum' : key === 'kk' ? 'Kartu Keluarga' : 'Surat Kematian dari RS/Puskesmas'}" wajib diunggah!`);
      return;
    }
  }

  isSubmitting.value = true;
  try {
    const pengajuan = {
      noTiket: generateTicketNumber(),
      jenisSurat: 'Surat Keterangan Meninggal Dunia',
      tanggalPengajuan: new Date().toISOString(),
      status: 'Belum Dikerjakan',
      catatanAdmin: null,
      waktuSelesai: null,
      data: {
        ...formData.value,
        files: {
          ktpPelapor: formData.value.files.ktpPelapor ? { name: formData.value.files.ktpPelapor.name, size: formData.value.files.ktpPelapor.size } : null,
          ktpAlmarhum: formData.value.files.ktpAlmarhum ? { name: formData.value.files.ktpAlmarhum.name, size: formData.value.files.ktpAlmarhum.size } : null,
          kk: formData.value.files.kk ? { name: formData.value.files.kk.name, size: formData.value.files.kk.size } : null,
          suratKematian: formData.value.files.suratKematian ? { name: formData.value.files.suratKematian.name, size: formData.value.files.suratKematian.size } : null,
          pengantarRT: formData.value.files.pengantarRT ? { name: formData.value.files.pengantarRT.name, size: formData.value.files.pengantarRT.size } : null
        }
      }
    };

    console.log('📄 Data Pengajuan SK Meninggal Dunia:', pengajuan);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (savePengajuan(pengajuan)) {
      alert(`✅ Permohonan Surat Keterangan Meninggal Dunia berhasil diajukan!\nNo. Tiket: ${pengajuan.noTiket}`);
      router.push('/surat-saya');
    } else {
      throw new Error('Gagal menyimpan');
    }
  } catch (err) {
    console.error('❌ Error:', err);
    alert('Gagal mengajukan. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  if (confirm('Batalkan pengajuan? Data yang belum disimpan akan hilang.')) {
    router.push('/ajukan-surat');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.sk-meninggal-form-container {
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shared styles (identik dengan SKDomisili) */
.page-header {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(139, 69, 190, 0.3);
}
.header-content { position: relative; }
.back-button {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: white; text-decoration: none; margin-bottom: 1rem;
  padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); border-radius: 6px;
  transition: all 0.3s ease;
}
.back-button:hover { background: rgba(255,255,255,0.2); transform: translateX(-4px); }
.back-button .material-icons { font-size: 20px; }
.page-title { font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem; }
.page-subtitle { font-size: 1rem; margin: 0; opacity: 0.95; }

.alert-info {
  background: #f8f1ff;
  border-left: 4px solid #9b59b6;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex; gap: 1rem; align-items: flex-start;
}
.alert-info .material-icons { color: #9b59b6; font-size: 24px; }
.alert-info strong { color: #5d007d; }

.sk-meninggal-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.form-section { margin-bottom: 2.5rem; }
.form-section:last-of-type { margin-bottom: 2rem; }
.section-title {
  font-size: 1.3rem; font-weight: 700; color: #2c3e50;
  margin-bottom: 1.5rem; padding-bottom: 0.75rem;
  border-bottom: 2px solid #e0e0e0;
}
.form-row {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1.5rem;
}
.form-group { display: flex; flex-direction: column; }
.form-group.full-width { grid-column: 1 / -1; margin-bottom: 1.5rem; }
.form-group label { font-size: 0.9rem; font-weight: 600; color: #2c3e50; margin-bottom: 0.5rem; }
.required { color: #e74c3c; }

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.85rem; border: 2px solid #e0e0e0; border-radius: 8px;
  font-size: 0.95rem; transition: all 0.3s ease;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none; border-color: #9b59b6; box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
}

.phone-input {
  display: flex; align-items: center; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden;
  transition: all 0.3s ease;
}
.phone-input:focus-within {
  border-color: #9b59b6; box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
}
.phone-prefix { background: #f5f5f5; padding: 0.85rem 1rem; font-weight: 600; color: #666; }
.phone-input input { border: none !important; flex: 1; box-shadow: none !important; }

/* File Upload */
.file-upload-wrapper { display: flex; gap: 0.75rem; align-items: center; }
.file-upload-label {
  flex: 1; display: flex; align-items: center; gap: 0.75rem;
  padding: 0.85rem 1.25rem; border: 2px dashed #d0d0d0; border-radius: 8px;
  cursor: pointer; background: #fafafa; transition: all 0.3s ease;
}
.file-upload-label:hover { border-color: #9b59b6; background: #f8f1ff; }
.file-upload-label .material-icons { color: #9b59b6; font-size: 24px; }
.remove-file-btn {
  width: 40px; height: 40px; border: none; background: #fee; color: #e74c3c;
  border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.remove-file-btn:hover { background: #e74c3c; color: white; }
.file-hint { color: #666; font-size: 0.85rem; margin-top: 0.5rem; }

/* Radio Group */
.radio-group { display: grid; gap: 1rem; }
.radio-option {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem; border: 2px solid #e0e0e0; border-radius: 8px;
  cursor: pointer; transition: all 0.3s ease;
}
.radio-option:hover { border-color: #9b59b6; background: #f8f1ff; }
.radio-option input[type="radio"] { width: 20px; height: 20px; cursor: pointer; }
.radio-option input[type="radio"]:checked + .radio-content { color: #9b59b6; }
.radio-option input[type="radio"]:checked { accent-color: #9b59b6; }
.radio-content { display: flex; align-items: center; gap: 1rem; flex: 1; }
.radio-content .material-icons { font-size: 32px; color: #9b59b6; }
.radio-content strong { display: block; margin-bottom: 0.25rem; }
.radio-content small { color: #666; font-size: 0.85rem; }

/* Form Actions */
.form-actions {
  display: flex; gap: 1rem; justify-content: flex-end;
  padding-top: 2rem; border-top: 2px solid #e0e0e0;
}
.btn-cancel, .btn-submit {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.85rem 2rem; border-radius: 8px;
  font-weight: 600; font-size: 0.95rem; cursor: pointer;
  transition: all 0.3s ease; border: none;
}
.btn-cancel {
  background: #f5f5f5; color: #666;
}
.btn-cancel:hover {
  background: #e0e0e0;
}
.btn-submit {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
}
.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #7d3c98, #6c3483);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(155, 89, 182, 0.3);
}
.btn-submit:disabled {
  background: #95a5a6; cursor: not-allowed;
}
.btn-cancel .material-icons,
.btn-submit .material-icons {
  font-size: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .sk-meninggal-form-container { padding: 0; }
  .page-header { padding: 1.5rem; }
  .page-title { font-size: 1.5rem; }
  .sk-meninggal-form { padding: 1.5rem; }
  .form-row { grid-template-columns: 1fr; gap: 1rem; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}
</style>