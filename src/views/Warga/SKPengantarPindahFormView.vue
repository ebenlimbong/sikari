<template>
  <div class="sk-pindah-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/ajukan-surat" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Formulir Surat Pengantar Pindah</h1>
        <p class="page-subtitle">Lengkapi data berikut untuk mengajukan Surat Pengantar Pindah</p>
      </div>
    </div>
    <!-- Alert Info -->
    <div class="alert-info">
      <span class="material-icons">info</span>
      <div>
        <strong>Perhatian:</strong> Data harus diisi lengkap. Dokumen wajib: KTP, KK, dan Surat Pengantar RT/RW.
        Format file: PDF, JPG, PNG (maks. 2MB/file).
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="sk-pindah-form">
      <!-- Section A: Data Pemohon -->
      <div class="form-section">
        <h2 class="section-title">A. Data Pemohon (Kepala Keluarga)</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="namaLengkap">Nama Lengkap <span class="required">*</span></label>
            <input 
              type="text" 
              id="namaLengkap"
              v-model="formData.namaLengkap"
              placeholder="Nama kepala keluarga"
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
              placeholder="Tempat lahir"
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
              <option value="Kawin">Kawin</option>
              <option value="Belum Kawin">Belum Kawin</option>
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
          <label for="alamatAsal">Alamat Lengkap Saat Ini <span class="required">*</span></label>
          <textarea 
            id="alamatAsal"
            v-model="formData.alamatAsal"
            rows="2"
            placeholder="Jalan, RT/RW, Dusun/Kampung, Desa, Kecamatan"
            required
          ></textarea>
        </div>
      </div>

      <!-- Section B: Data Keluarga yang Pindah -->
      <div class="form-section">
        <h2 class="section-title">B. Data Keluarga yang Pindah</h2>
        <div class="form-group full-width">
          <label for="jumlahAnggota">Jumlah Anggota Keluarga yang Pindah <span class="required">*</span></label>
          <input 
            type="number" 
            id="jumlahAnggota"
            v-model.number="formData.jumlahAnggota"
            min="1"
            placeholder="Termasuk pemohon"
            required
          />
        </div>
        <div class="form-group full-width">
          <label for="namaAnggota">Daftar Nama Lengkap Anggota Keluarga <span class="required">*</span></label>
          <textarea 
            id="namaAnggota"
            v-model="formData.namaAnggota"
            rows="3"
            placeholder="Contoh: 
1. Bambang Suryadi (Ayah)
2. Siti Aminah (Ibu)
3. Budi Santoso (Anak)
4. Sari Wulandari (Anak)"
            required
          ></textarea>
          <small class="file-hint">Cantumkan nama dan hubungan keluarga</small>
        </div>
      </div>

      <!-- Section C: Data Tujuan Pindah -->
      <div class="form-section">
        <h2 class="section-title">C. Data Tujuan Pindah</h2>
        <div class="form-group full-width">
          <label for="alamatTujuan">Alamat Tujuan Pindah <span class="required">*</span></label>
          <textarea 
            id="alamatTujuan"
            v-model="formData.alamatTujuan"
            rows="2"
            placeholder="Alamat lengkap tujuan pindah"
            required
          ></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="desaTujuan">Desa/Kelurahan Tujuan <span class="required">*</span></label>
            <input 
              type="text" 
              id="desaTujuan"
              v-model="formData.desaTujuan"
              placeholder="Nama desa/kelurahan tujuan"
              required
            />
          </div>
          <div class="form-group">
            <label for="kecamatanTujuan">Kecamatan Tujuan <span class="required">*</span></label>
            <input 
              type="text" 
              id="kecamatanTujuan"
              v-model="formData.kecamatanTujuan"
              placeholder="Nama kecamatan tujuan"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="kabupatenTujuan">Kabupaten/Kota Tujuan <span class="required">*</span></label>
            <input 
              type="text" 
              id="kabupatenTujuan"
              v-model="formData.kabupatenTujuan"
              placeholder="Nama kabupaten/kota tujuan"
              required
            />
          </div>
          <div class="form-group">
            <label for="provinsiTujuan">Provinsi Tujuan <span class="required">*</span></label>
            <input 
              type="text" 
              id="provinsiTujuan"
              v-model="formData.provinsiTujuan"
              placeholder="Nama provinsi tujuan"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="kodePosTujuan">Kode Pos Tujuan</label>
            <input 
              type="text" 
              id="kodePosTujuan"
              v-model="formData.kodePosTujuan"
              placeholder="Contoh: 35131"
              maxlength="5"
            />
          </div>
          <div class="form-group">
            <label for="tanggalPindah">Tanggal Rencana Pindah <span class="required">*</span></label>
            <input 
              type="date" 
              id="tanggalPindah"
              v-model="formData.tanggalPindah"
              :min="today"
              required
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="alasanPindah">Alasan Pindah <span class="required">*</span></label>
          <select 
            id="alasanPindah"
            v-model="formData.alasanPindah"
            required
          >
            <option value="">Pilih alasan pindah</option>
            <option value="Pekerjaan">Pekerjaan</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Perkawinan">Perkawinan</option>
            <option value="Mengikuti Keluarga">Mengikuti Keluarga</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div class="form-group full-width" v-if="formData.alasanPindah === 'Lainnya'">
          <label for="alasanLainnya">Penjelasan Alasan Lainnya <span class="required">*</span></label>
          <input 
            type="text" 
            id="alasanLainnya"
            v-model="formData.alasanLainnya"
            placeholder="Jelaskan alasan pindah"
            required
          />
        </div>
      </div>

      <!-- Section D: Lampiran Persyaratan -->
      <div class="form-section">
        <h2 class="section-title">D. Lampiran Persyaratan</h2>
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
              <span>{{ formData.files.pengantarRT ? formData.files.pengantarRT.name : 'Pilih berkas Surat Pengantar RT/RW' }}</span>
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
        <div class="form-group">
          <label>Unggah Surat Keterangan Belum Memiliki Rumah Tujuan (Opsional)</label>
          <div class="file-upload-wrapper">
            <input 
              type="file" 
              id="uploadSuratBelumPunyaRumah"
              @change="handleFileUpload($event, 'suratBelumPunyaRumah')"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
            />
            <label for="uploadSuratBelumPunyaRumah" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.suratBelumPunyaRumah ? formData.files.suratBelumPunyaRumah.name : 'Pilih berkas (opsional)' }}</span>
            </label>
            <button 
              v-if="formData.files.suratBelumPunyaRumah" 
              type="button" 
              @click="removeFile('suratBelumPunyaRumah')" 
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
  alamatAsal: '',
  // Keluarga
  jumlahAnggota: 1,
  namaAnggota: '',
  // Tujuan Pindah
  alamatTujuan: '',
  desaTujuan: '',
  kecamatanTujuan: '',
  kabupatenTujuan: '',
  provinsiTujuan: '',
  kodePosTujuan: '',
  tanggalPindah: '',
  alasanPindah: '',
  alasanLainnya: '',
  // Files
  files: {
    ktpPemohon: null,
    kk: null,
    pengantarRT: null,
    suratBelumPunyaRumah: null
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
    ktpPemohon: 'uploadKT PPemohon',
    kk: 'uploadKK',
    pengantarRT: 'uploadPengantarRT',
    suratBelumPunyaRumah: 'uploadSuratBelumPunyaRumah'
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

  // Validasi alasan "Lainnya"
  if (formData.value.alasanPindah === 'Lainnya' && !formData.value.alasanLainnya) {
    alert('Penjelasan alasan "Lainnya" wajib diisi.');
    return;
  }

  isSubmitting.value = true;
  try {
    const pengajuan = {
      noTiket: generateTicketNumber(),
      jenisSurat: 'Surat Pengantar Pindah',
      tanggalPengajuan: new Date().toISOString(),
      status: 'Belum Dikerjakan',
      catatanAdmin: null,
      waktuSelesai: null,
      data: {
        ...formData.value,
        files: {
          ktpPemohon: formData.value.files.ktpPemohon ? { name: formData.value.files.ktpPemohon.name, size: formData.value.files.ktpPemohon.size } : null,
          kk: formData.value.files.kk ? { name: formData.value.files.kk.name, size: formData.value.files.kk.size } : null,
          pengantarRT: formData.value.files.pengantarRT ? { name: formData.value.files.pengantarRT.name, size: formData.value.files.pengantarRT.size } : null,
          suratBelumPunyaRumah: formData.value.files.suratBelumPunyaRumah ? { name: formData.value.files.suratBelumPunyaRumah.name, size: formData.value.files.suratBelumPunyaRumah.size } : null
        }
      }
    };

    console.log('📄 Data Pengajuan Surat Pengantar Pindah:', pengajuan);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (savePengajuan(pengajuan)) {
      alert(`✅ Permohonan Surat Pengantar Pindah berhasil diajukan!\nNo. Tiket: ${pengajuan.noTiket}`);
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

.sk-pindah-form-container {
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shared styles — identik dengan SK Domisili, warna disesuaikan */
.page-header {
  background: linear-gradient(135deg, #006400, #228B22);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 100, 0, 0.3);
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
  background: #e6f7ee;
  border-left: 4px solid #006400;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex; gap: 1rem; align-items: flex-start;
}
.alert-info .material-icons { color: #006400; font-size: 24px; }
.alert-info strong { color: #004d00; }

.sk-pindah-form {
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
  outline: none; border-color: #006400; box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
}

.phone-input {
  display: flex; align-items: center; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden;
  transition: all 0.3s ease;
}
.phone-input:focus-within {
  border-color: #006400; box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
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
.file-upload-label:hover { border-color: #006400; background: #e6f7ee; }
.file-upload-label .material-icons { color: #006400; font-size: 24px; }
.remove-file-btn {
  width: 40px; height: 40px; border: none; background: #eef; color: #27ae60;
  border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.remove-file-btn:hover { background: #27ae60; color: white; }
.file-hint { color: #666; font-size: 0.85rem; margin-top: 0.5rem; }

/* Radio Group */
.radio-group { display: grid; gap: 1rem; }
.radio-option {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem; border: 2px solid #e0e0e0; border-radius: 8px;
  cursor: pointer; transition: all 0.3s ease;
}
.radio-option:hover { border-color: #006400; background: #e6f7ee; }
.radio-option input[type="radio"] { width: 20px; height: 20px; cursor: pointer; }
.radio-option input[type="radio"]:checked + .radio-content { color: #006400; }
.radio-option input[type="radio"]:checked { accent-color: #006400; }
.radio-content { display: flex; align-items: center; gap: 1rem; flex: 1; }
.radio-content .material-icons { font-size: 32px; color: #006400; }
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
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
}
.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #004d00, #1a7a1a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
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
  .sk-pindah-form-container { padding: 0; }
  .page-header { padding: 1.5rem; }
  .page-title { font-size: 1.5rem; }
  .sk-pindah-form { padding: 1.5rem; }
  .form-row { grid-template-columns: 1fr; gap: 1rem; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}
</style>