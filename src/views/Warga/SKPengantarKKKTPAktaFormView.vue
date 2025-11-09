<template>
  <div class="sk-pengantar-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/ajukan-surat" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Formulir Surat Pengantar KK, KTP, dan Akta Lahir</h1>
        <p class="page-subtitle">Lengkapi data berikut untuk mengajukan Surat Pengantar pengurusan dokumen kependudukan</p>
      </div>
    </div>
    <!-- Alert Info -->
    <div class="alert-info">
      <span class="material-icons">info</span>
      <div>
        <strong>Perhatian:</strong> Pilih dokumen yang ingin diajukan. Isi data tambahan sesuai jenis dokumen.
        Unggah dokumen pendukung wajib: KTP & KK pemohon.
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="sk-pengantar-form">
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
              placeholder="Nama pemohon (bisa orang tua/wali)"
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
              placeholder="Tempat lahir pemohon"
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
            <label for="statusPerkawinan">Status Perkawinan <span class="required">*</span></label>
            <select 
              id="statusPerkawinan"
              v-model="formData.statusPerkawinan"
              required
            >
              <option value="">Pilih status perkawinan</option>
              <option value="Belum Kawin">Belum Kawin</option>
              <option value="Kawin">Kawin</option>
              <option value="Cerai Hidup">Cerai Hidup</option>
              <option value="Cerai Mati">Cerai Mati</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pekerjaan">Pekerjaan <span class="required">*</span></label>
            <input 
              type="text" 
              id="pekerjaan"
              v-model="formData.pekerjaan"
              placeholder="Pekerjaan pemohon"
              required
            />
          </div>
        </div>
        <div class="form-row">
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
          <label for="alamatKTP">Alamat KTP Pemohon <span class="required">*</span></label>
          <textarea 
            id="alamatKTP"
            v-model="formData.alamatKTP"
            rows="2"
            placeholder="Alamat sesuai KTP"
            required
          ></textarea>
        </div>
      </div>

      <!-- Section B: Jenis Dokumen & Data Tambahan -->
      <div class="form-section">
        <h2 class="section-title">B. Dokumen yang Diajukan</h2>
        <div class="form-group">
          <label>Pilih Jenis Dokumen <span class="required">*</span></label>
          <div class="checkbox-group">
            <label class="checkbox-option">
              <input 
                type="checkbox" 
                v-model="formData.jenisDokumen.kk"
                @change="resetData('kk')"
              />
              <div class="checkbox-content">
                <span class="material-icons">badge</span>
                <div>
                  <strong>Kartu Keluarga (KK)</strong>
                  <small>Baru / Perubahan / Penggantian</small>
                </div>
              </div>
            </label>
            <label class="checkbox-option">
              <input 
                type="checkbox" 
                v-model="formData.jenisDokumen.ktp"
                @change="resetData('ktp')"
              />
              <div class="checkbox-content">
                <span class="material-icons">person</span>
                <div>
                  <strong>KTP</strong>
                  <small>Baru / Perpanjangan / Penggantian</small>
                </div>
              </div>
            </label>
            <label class="checkbox-option">
              <input 
                type="checkbox" 
                v-model="formData.jenisDokumen.aktaKelahiran"
                @change="resetData('aktaKelahiran')"
              />
              <div class="checkbox-content">
                <span class="material-icons">child_care</span>
                <div>
                  <strong>Akta Kelahiran</strong>
                  <small>Pembuatan baru untuk anak</small>
                </div>
              </div>
            </label>
          </div>
          <small class="file-hint">Pilih minimal 1 dokumen</small>
        </div>

        <!-- Data Tambahan untuk KK -->
        <div v-if="formData.jenisDokumen.kk" class="sub-section">
          <h3 class="sub-title">Data Tambahan untuk KK</h3>
          <div class="form-group">
            <label for="alasanKK">Alasan Pengajuan KK <span class="required">*</span></label>
            <select 
              id="alasanKK"
              v-model="formData.dataTambahan.kk.alasan"
              required
            >
              <option value="">Pilih alasan</option>
              <option value="Pembuatan Baru">Pembuatan Baru</option>
              <option value="Penambahan Anggota">Penambahan Anggota (Kelahiran/Nikah)</option>
              <option value="Pengurangan Anggota">Pengurangan Anggota (Kematian/Pindah)</option>
              <option value="Perubahan Data">Perubahan Data (Nama, Status, dll)</option>
              <option value="Hilang/Rusak">Hilang atau Rusak</option>
            </select>
          </div>
          <div class="form-group full-width" v-if="formData.dataTambahan.kk.alasan === 'Penambahan Anggota'">
            <label for="namaAnggotaBaru">Nama Anggota Keluarga Baru <span class="required">*</span></label>
            <input 
              type="text" 
              id="namaAnggotaBaru"
              v-model="formData.dataTambahan.kk.namaAnggotaBaru"
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>
          <div class="form-group full-width" v-if="formData.dataTambahan.kk.alasan === 'Perubahan Data'">
            <label for="dataDiubah">Data yang Diubah <span class="required">*</span></label>
            <input 
              type="text" 
              id="dataDiubah"
              v-model="formData.dataTambahan.kk.dataDiubah"
              placeholder="Contoh: Nama, Status Perkawinan, Alamat"
              required
            />
          </div>
        </div>

        <!-- Data Tambahan untuk KTP -->
        <div v-if="formData.jenisDokumen.ktp" class="sub-section">
          <h3 class="sub-title">Data Tambahan untuk KTP</h3>
          <div class="form-group">
            <label for="alasanKTP">Alasan Pengajuan KTP <span class="required">*</span></label>
            <select 
              id="alasanKTP"
              v-model="formData.dataTambahan.ktp.alasan"
              required
            >
              <option value="">Pilih alasan</option>
              <option value="Pembuatan Baru (17+ Tahun)">Pembuatan Baru (Usia ≥17 Tahun)</option>
              <option value="Perpanjangan">Perpanjangan (Masa Berlaku Habis)</option>
              <option value="Hilang">Hilang</option>
              <option value="Rusak">Rusak</option>
              <option value="Perubahan Data">Perubahan Data</option>
            </select>
          </div>
          <div class="form-group" v-if="formData.dataTambahan.ktp.alasan === 'Pembuatan Baru (17+ Tahun)'">
            <label for="tanggalLahirKTP">Tanggal Lahir Pemohon KTP <span class="required">*</span></label>
            <input 
              type="date" 
              id="tanggalLahirKTP"
              v-model="formData.dataTambahan.ktp.tanggalLahir"
              :max="today"
              required
            />
          </div>
          <div class="form-group full-width" v-if="formData.dataTambahan.ktp.alasan === 'Perubahan Data'">
            <label for="dataDiubahKTP">Data yang Diubah <span class="required">*</span></label>
            <input 
              type="text" 
              id="dataDiubahKTP"
              v-model="formData.dataTambahan.ktp.dataDiubah"
              placeholder="Contoh: Nama, Alamat, Status Perkawinan"
              required
            />
          </div>
        </div>

        <!-- Data Tambahan untuk Akta Kelahiran -->
        <div v-if="formData.jenisDokumen.aktaKelahiran" class="sub-section">
          <h3 class="sub-title">Data Tambahan untuk Akta Kelahiran</h3>
          <div class="form-group">
            <label for="namaAnak">Nama Anak <span class="required">*</span></label>
            <input 
              type="text" 
              id="namaAnak"
              v-model="formData.dataTambahan.aktaKelahiran.namaAnak"
              placeholder="Nama lengkap anak"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="jenisKelaminAnak">Jenis Kelamin Anak <span class="required">*</span></label>
              <select 
                id="jenisKelaminAnak"
                v-model="formData.dataTambahan.aktaKelahiran.jenisKelamin"
                required
              >
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div class="form-group">
              <label for="tanggalLahirAnak">Tanggal Lahir Anak <span class="required">*</span></label>
              <input 
                type="date" 
                id="tanggalLahirAnak"
                v-model="formData.dataTambahan.aktaKelahiran.tanggalLahir"
                :max="today"
                required
              />
            </div>
          </div>
          <div class="form-group full-width">
            <label for="tempatLahirAnak">Tempat Lahir Anak <span class="required">*</span></label>
            <input 
              type="text" 
              id="tempatLahirAnak"
              v-model="formData.dataTambahan.aktaKelahiran.tempatLahir"
              placeholder="Contoh: RSU Kabupaten, Rumah Bidan, Rumah"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="namaAyah">Nama Ayah <span class="required">*</span></label>
              <input 
                type="text" 
                id="namaAyah"
                v-model="formData.dataTambahan.aktaKelahiran.namaAyah"
                placeholder="Nama lengkap ayah"
                required
              />
            </div>
            <div class="form-group">
              <label for="nikAyah">NIK Ayah <span class="required">*</span></label>
              <input 
                type="text" 
                id="nikAyah"
                v-model="formData.dataTambahan.aktaKelahiran.nikAyah"
                placeholder="16 digit NIK ayah"
                maxlength="16"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="namaIbu">Nama Ibu <span class="required">*</span></label>
              <input 
                type="text" 
                id="namaIbu"
                v-model="formData.dataTambahan.aktaKelahiran.namaIbu"
                placeholder="Nama lengkap ibu"
                required
              />
            </div>
            <div class="form-group">
              <label for="nikIbu">NIK Ibu <span class="required">*</span></label>
              <input 
                type="text" 
                id="nikIbu"
                v-model="formData.dataTambahan.aktaKelahiran.nikIbu"
                placeholder="16 digit NIK ibu"
                maxlength="16"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section C: Lampiran Persyaratan -->
      <div class="form-section">
        <h2 class="section-title">C. Lampiran Persyaratan</h2>
        <div class="form-group">
          <label>Unggah KTP Pemohon <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadKT PPemohon"
              @change="handleFileUpload($event, 'ktpPemohon')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKT PPemohon" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.ktpPemohon ? formData.files.ktpPemohon.name : 'Pilih berkas KTP Pemohon' }}</span>
            </label>
            <button 
              v-if="formData.files.ktpPemohon" 
              type="button" 
              @click="removeFile('ktpPemohon')" 
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
          <label>Unggah Surat Pengantar RT/RW <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadPengantarRT"
              @change="handleFileUpload($event, 'pengantarRT')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadPengantarRT" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.pengantarRT ? formData.files.pengantarRT.name : 'Pilih berkas Pengantar RT/RW' }}</span>
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
        <div v-if="formData.jenisDokumen.aktaKelahiran" class="form-group">
          <label>Unggah Surat Keterangan Kelahiran dari Bidan/RS <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadSuratKelahiran"
              @change="handleFileUpload($event, 'suratKelahiran')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadSuratKelahiran" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.suratKelahiran ? formData.files.suratKelahiran.name : 'Pilih berkas Surat Keterangan Kelahiran' }}</span>
            </label>
            <button 
              v-if="formData.files.suratKelahiran" 
              type="button" 
              @click="removeFile('suratKelahiran')" 
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>
        <div v-if="formData.jenisDokumen.kk && formData.dataTambahan.kk.alasan === 'Penambahan Anggota'" class="form-group">
          <label>Unggah Surat Nikah/Akta Kelahiran Anggota Baru (Opsional)</label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadDokumenTambahan"
              @change="handleFileUpload($event, 'dokumenTambahan')"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
            />
            <label for="uploadDokumenTambahan" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.dokumenTambahan ? formData.files.dokumenTambahan.name : 'Pilih berkas tambahan (opsional)' }}</span>
            </label>
            <button 
              v-if="formData.files.dokumenTambahan" 
              type="button" 
              @click="removeFile('dokumenTambahan')" 
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
                  <small>Unduh surat pengantar dalam format PDF</small>
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
  // Data Pemohon
  namaLengkap: '',
  nik: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  statusPerkawinan: '',
  pekerjaan: '',
  kewarganegaraan: 'Indonesia',
  nomorPonsel: '',
  alamatKTP: '',
  // Jenis Dokumen
  jenisDokumen: {
    kk: false,
    ktp: false,
    aktaKelahiran: false
  },
  // Data Tambahan
  dataTambahan: {
    kk: {
      alasan: '',
      namaAnggotaBaru: '',
      dataDiubah: ''
    },
    ktp: {
      alasan: '',
      tanggalLahir: '',
      dataDiubah: ''
    },
    aktaKelahiran: {
      namaAnak: '',
      jenisKelamin: '',
      tanggalLahir: '',
      tempatLahir: '',
      namaAyah: '',
      nikAyah: '',
      namaIbu: '',
      nikIbu: ''
    }
  },
  // Files
  files: {
    ktpPemohon: null,
    kk: null,
    pengantarRT: null,
    suratKelahiran: null,
    dokumenTambahan: null
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

// Reset data tambahan saat toggle checkbox
const resetData = (type) => {
  if (type === 'kk') {
    formData.value.dataTambahan.kk = {
      alasan: '',
      namaAnggotaBaru: '',
      dataDiubah: ''
    };
  } else if (type === 'ktp') {
    formData.value.dataTambahan.ktp = {
      alasan: '',
      tanggalLahir: '',
      dataDiubah: ''
    };
  } else if (type === 'aktaKelahiran') {
    formData.value.dataTambahan.aktaKelahiran = {
      namaAnak: '',
      jenisKelamin: '',
      tanggalLahir: '',
      tempatLahir: '',
      namaAyah: '',
      nikAyah: '',
      namaIbu: '',
      nikIbu: ''
    };
  }
};

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
    ktpPemohon: 'uploadKT PPemohon',
    kk: 'uploadKK',
    pengantarRT: 'uploadPengantarRT',
    suratKelahiran: 'uploadSuratKelahiran',
    dokumenTambahan: 'uploadDokumenTambahan'
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
  if (formData.value.nik.length !== 16) {
    alert('NIK harus 16 digit!');
    return;
  }
  // Cek minimal 1 dokumen dipilih
  const dokumenDipilih = Object.values(formData.value.jenisDokumen).some(Boolean);
  if (!dokumenDipilih) {
    alert('Pilih minimal 1 jenis dokumen yang akan diajukan.');
    return;
  }
  // Validasi file wajib
  const requiredFiles = ['ktpPemohon', 'kk', 'pengantarRT'];
  for (const key of requiredFiles) {
    if (!formData.value.files[key]) {
      const labels = {
        ktpPemohon: 'KTP Pemohon',
        kk: 'Kartu Keluarga',
        pengantarRT: 'Surat Pengantar RT/RW'
      };
      alert(`Dokumen "${labels[key]}" wajib diunggah!`);
      return;
    }
  }
  // Validasi tambahan: surat kelahiran untuk akta
  if (formData.value.jenisDokumen.aktaKelahiran && !formData.value.files.suratKelahiran) {
    alert('Surat Keterangan Kelahiran wajib diunggah untuk pengajuan Akta Kelahiran.');
    return;
  }

  isSubmitting.value = true;
  try {
    const pengajuan = {
      noTiket: generateTicketNumber(),
      jenisSurat: 'Surat Pengantar KK, KTP, dan Akta Lahir',
      tanggalPengajuan: new Date().toISOString(),
      status: 'Belum Dikerjakan',
      catatanAdmin: null,
      waktuSelesai: null,
      data: { // <-- INI ADALAH PERUBAHAN UTAMA
        ...formData.value,
        files: {
          ktpPemohon: formData.value.files.ktpPemohon ? { name: formData.value.files.ktpPemohon.name, size: formData.value.files.ktpPemohon.size } : null,
          kk: formData.value.files.kk ? { name: formData.value.files.kk.name, size: formData.value.files.kk.size } : null,
          pengantarRT: formData.value.files.pengantarRT ? { name: formData.value.files.pengantarRT.name, size: formData.value.files.pengantarRT.size } : null,
          suratKelahiran: formData.value.files.suratKelahiran ? { name: formData.value.files.suratKelahiran.name, size: formData.value.files.suratKelahiran.size } : null,
          dokumenTambahan: formData.value.files.dokumenTambahan ? { name: formData.value.files.dokumenTambahan.name, size: formData.value.files.dokumenTambahan.size } : null
        }
      }
    };

    console.log('📄 Data Pengajuan Surat Pengantar KK/KTP/Akta:', pengajuan);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (savePengajuan(pengajuan)) {
      alert(`✅ Permohonan Surat Pengantar berhasil diajukan!\nNo. Tiket: ${pengajuan.noTiket}`);
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

.sk-pengantar-form-container {
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shared styles — identik dengan SK Domisili */
.page-header {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
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
  background: #e8edf3;
  border-left: 4px solid #2c3e50;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex; gap: 1rem; align-items: flex-start;
}
.alert-info .material-icons { color: #2c3e50; font-size: 24px; }
.alert-info strong { color: #1a252f; }

.sk-pengantar-form {
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
.sub-section { margin-top: 1.5rem; }
.sub-title {
  font-size: 1.1rem; font-weight: 600; color: #2c3e50;
  margin: 1rem 0 1rem;
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
  outline: none; border-color: #2c3e50; box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}

.phone-input {
  display: flex; align-items: center; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden;
  transition: all 0.3s ease;
}
.phone-input:focus-within {
  border-color: #2c3e50; box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}
.phone-prefix { background: #f5f5f5; padding: 0.85rem 1rem; font-weight: 600; color: #666; }
.phone-input input { border: none !important; flex: 1; box-shadow: none !important; }

/* Checkbox Group */
.checkbox-group { display: grid; gap: 1rem; }
.checkbox-option {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1.25rem; border: 2px solid #e0e0e0; border-radius: 8px;
  cursor: pointer; transition: all 0.3s ease;
}
.checkbox-option:hover { border-color: #2c3e50; background: #f8fafc; }
.checkbox-option input[type="checkbox"] { margin-top: 6px; width: 20px; height: 20px; cursor: pointer; }
.checkbox-option input[type="checkbox"]:checked + .checkbox-content { color: #2c3e50; }
.checkbox-option input[type="checkbox"]:checked { accent-color: #2c3e50; }
.checkbox-content { flex: 1; }
.checkbox-content .material-icons { font-size: 32px; color: #2c3e50; }
.checkbox-content strong { display: block; margin-bottom: 0.25rem; }
.checkbox-content small { color: #666; font-size: 0.85rem; }

/* File Upload */
.file-upload-wrapper { display: flex; gap: 0.75rem; align-items: center; }
.file-upload-label {
  flex: 1; display: flex; align-items: center; gap: 0.75rem;
  padding: 0.85rem 1.25rem; border: 2px dashed #d0d0d0; border-radius: 8px;
  cursor: pointer; background: #fafafa; transition: all 0.3s ease;
}
.file-upload-label:hover { border-color: #2c3e50; background: #e8edf3; }
.file-upload-label .material-icons { color: #2c3e50; font-size: 24px; }
.remove-file-btn {
  width: 40px; height: 40px; border: none; background: #eef; color: #2c3e50;
  border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.remove-file-btn:hover { background: #2c3e50; color: white; }
.file-hint { color: #666; font-size: 0.85rem; margin-top: 0.5rem; }

/* Radio Group */
.radio-group { display: grid; gap: 1rem; }
.radio-option {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem; border: 2px solid #e0e0e0; border-radius: 8px;
  cursor: pointer; transition: all 0.3s ease;
}
.radio-option:hover { border-color: #2c3e50; background: #e8edf3; }
.radio-option input[type="radio"] { width: 20px; height: 20px; cursor: pointer; }
.radio-option input[type="radio"]:checked + .radio-content { color: #2c3e50; }
.radio-option input[type="radio"]:checked { accent-color: #2c3e50; }
.radio-content { display: flex; align-items: center; gap: 1rem; flex: 1; }
.radio-content .material-icons { font-size: 32px; color: #2c3e50; }
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
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
}
.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #1a252f, #2c3e50);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
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
  .sk-pengantar-form-container { padding: 0; }
  .page-header { padding: 1.5rem; }
  .page-title { font-size: 1.5rem; }
  .sk-pengantar-form { padding: 1.5rem; }
  .form-row { grid-template-columns: 1fr; gap: 1rem; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}
</style>