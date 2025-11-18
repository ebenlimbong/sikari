<template>
  <div class="sk-kelahiran-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/ajukan-surat" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Formulir Surat Keterangan Kelahiran</h1>
        <p class="page-subtitle">Lengkapi data berikut untuk mengajukan Surat Keterangan Kelahiran</p>
      </div>
    </div>
    <!-- Alert Info -->
    <div class="alert-info">
      <span class="material-icons">info</span>
      <div>
        <strong>Perhatian:</strong> Data anak dan orang tua harus diisi lengkap. Dokumen pendukung (KTP orang tua, KK, surat keterangan kelahiran dari bidan/RS) wajib diunggah.
        Format file: PDF, JPG, PNG (maks. 2MB/file).
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="sk-kelahiran-form">
      <!-- Section A: Data Anak -->
      <div class="form-section">
        <h2 class="section-title">A. Data Anak</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="namaAnak">Nama Anak <span class="required">*</span></label>
            <input
              type="text"
              id="namaAnak"
              v-model="formData.namaAnak"
              placeholder="Nama lengkap bayi (boleh kosong jika belum diberi nama)"
              required
            />
          </div>
          <div class="form-group">
            <label for="jenisKelaminAnak">Jenis Kelamin <span class="required">*</span></label>
            <select
              id="jenisKelaminAnak"
              v-model="formData.jenisKelaminAnak"
              required
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="tanggalLahir">Tanggal Lahir <span class="required">*</span></label>
            <input
              type="date"
              id="tanggalLahir"
              v-model="formData.tanggalLahir"
              :max="today"
              required
            />
          </div>
          <div class="form-group">
            <label for="jamLahir">Jam Lahir <span class="required">*</span></label>
            <input
              type="time"
              id="jamLahir"
              v-model="formData.jamLahir"
              required
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="tempatLahir">Tempat Lahir <span class="required">*</span></label>
          <input
            type="text"
            id="tempatLahir"
            v-model="formData.tempatLahir"
            placeholder="Contoh: Rumah Sakit Umum Daerah X, BPS Ny. Y, Rumah Sendiri"
            required
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="beratBadan">Berat Badan (kg) <span class="required">*</span></label>
            <input
              type="number"
              step="0.01"
              id="beratBadan"
              v-model="formData.beratBadan"
              placeholder="Contoh: 3.2"
              required
            />
          </div>
          <div class="form-group">
            <label for="tinggiBadan">Tinggi Badan (cm) <span class="required">*</span></label>
            <input
              type="number"
              id="tinggiBadan"
              v-model="formData.tinggiBadan"
              placeholder="Contoh: 50"
              required
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="alamatLahir">Alamat Tempat Lahir <span class="required">*</span></label>
          <textarea
            id="alamatLahir"
            v-model="formData.alamatLahir"
            rows="2"
            placeholder="Alamat lengkap tempat kelahiran"
            required
          ></textarea>
        </div>
      </div>

      <!-- Section B: Data Orang Tua -->
      <div class="form-section">
        <h2 class="section-title">B. Data Orang Tua</h2>
        <!-- Ayah -->
        <div class="sub-section">
          <h3 class="sub-title">Data Ayah</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="namaAyah">Nama Ayah <span class="required">*</span></label>
              <input
                type="text"
                id="namaAyah"
                v-model="formData.namaAyah"
                placeholder="Nama lengkap ayah"
                required
              />
            </div>
            <div class="form-group">
              <label for="nikAyah">NIK Ayah <span class="required">*</span></label>
              <input
                type="text"
                id="nikAyah"
                v-model="formData.nikAyah"
                placeholder="16 digit NIK"
                maxlength="16"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="umurAyah">Umur Ayah (tahun)</label>
              <input
                type="number"
                id="umurAyah"
                v-model="formData.umurAyah"
                placeholder="Contoh: 32"
              />
            </div>
            <div class="form-group">
              <label for="pekerjaanAyah">Pekerjaan Ayah</label>
              <input
                type="text"
                id="pekerjaanAyah"
                v-model="formData.pekerjaanAyah"
                placeholder="Contoh: Petani, PNS, Pedagang"
              />
            </div>
          </div>
          <div class="form-group full-width">
            <label for="alamatAyah">Alamat Ayah <span class="required">*</span></label>
            <textarea
              id="alamatAyah"
              v-model="formData.alamatAyah"
              rows="2"
              placeholder="Alamat sesuai KTP ayah"
              required
            ></textarea>
          </div>
        </div>
        <!-- Ibu -->
        <div class="sub-section">
          <h3 class="sub-title">Data Ibu</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="namaIbu">Nama Ibu <span class="required">*</span></label>
              <input
                type="text"
                id="namaIbu"
                v-model="formData.namaIbu"
                placeholder="Nama lengkap ibu"
                required
              />
            </div>
            <div class="form-group">
              <label for="nikIbu">NIK Ibu <span class="required">*</span></label>
              <input
                type="text"
                id="nikIbu"
                v-model="formData.nikIbu"
                placeholder="16 digit NIK"
                maxlength="16"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="umurIbu">Umur Ibu (tahun)</label>
              <input
                type="number"
                id="umurIbu"
                v-model="formData.umurIbu"
                placeholder="Contoh: 28"
              />
            </div>
            <div class="form-group">
              <label for="pekerjaanIbu">Pekerjaan Ibu</label>
              <input
                type="text"
                id="pekerjaanIbu"
                v-model="formData.pekerjaanIbu"
                placeholder="Contoh: Ibu Rumah Tangga, Guru"
              />
            </div>
          </div>
          <div class="form-group full-width">
            <label for="alamatIbu">Alamat Ibu <span class="required">*</span></label>
            <textarea
              id="alamatIbu"
              v-model="formData.alamatIbu"
              rows="2"
              placeholder="Alamat sesuai KTP ibu"
              required
            ></textarea>
          </div>
        </div>
        <!-- Pernikahan -->
        <div class="sub-section">
          <h3 class="sub-title">Data Pernikahan Orang Tua</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="statusPernikahan">Status Pernikahan <span class="required">*</span></label>
              <select
                id="statusPernikahan"
                v-model="formData.statusPernikahan"
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
              <label for="tanggalPernikahan">Tanggal Pernikahan</label>
              <input
                type="date"
                id="tanggalPernikahan"
                v-model="formData.tanggalPernikahan"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section C: Lampiran Persyaratan -->
      <div class="form-section">
        <h2 class="section-title">C. Lampiran Persyaratan</h2>
        <div class="form-group">
          <label>Unggah KTP Ayah <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadKT PAyah"
              @change="handleFileUpload($event, 'ktpAyah')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKT PAyah" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.ktpAyah ? formData.files.ktpAyah.name : 'Pilih berkas KTP Ayah' }}</span>
            </label>
            <button
              v-if="formData.files.ktpAyah"
              type="button"
              @click="removeFile('ktpAyah')"
              class="remove-file-btn"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <small class="file-hint">Format: PDF, JPG, PNG. Maksimal 2MB</small>
        </div>
        <div class="form-group">
          <label>Unggah KTP Ibu <span class="required">*</span></label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadKT PIbu"
              @change="handleFileUpload($event, 'ktpIbu')"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              hidden
            />
            <label for="uploadKT PIbu" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.ktpIbu ? formData.files.ktpIbu.name : 'Pilih berkas KTP Ibu' }}</span>
            </label>
            <button
              v-if="formData.files.ktpIbu"
              type="button"
              @click="removeFile('ktpIbu')"
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
        <div class="form-group">
          <label>Unggah Buku Nikah/Akta Perkawinan (Opsional)</label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              id="uploadBukuNikah"
              @change="handleFileUpload($event, 'bukuNikah')"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
            />
            <label for="uploadBukuNikah" class="file-upload-label">
              <span class="material-icons">upload_file</span>
              <span>{{ formData.files.bukuNikah ? formData.files.bukuNikah.name : 'Pilih berkas Buku Nikah (opsional)' }}</span>
            </label>
            <button
              v-if="formData.files.bukuNikah"
              type="button"
              @click="removeFile('bukuNikah')"
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
  // Data Pemohon (dari profil)
  namaLengkap: '',
  nik: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  statusPerkawinan: '',
  pendidikan: '',
  nomorPonsel: '',
  kewarganegaraan: 'Indonesia',
  alamatLengkap: '',

  // Data Anak
  namaAnak: '',
  jenisKelaminAnak: '',
  tanggalLahirAnak: '',  // ✅ Ubah nama field ini
  jamLahir: '',
  tempatLahirAnak: '',   // ✅ Ubah nama field ini
  beratBadan: '',
  tinggiBadan: '',
  alamatLahir: '',

  // Data Orang Tua
  namaAyah: '',
  nikAyah: '',
  umurAyah: '',
  pekerjaanAyah: '',
  alamatAyah: '',
  namaIbu: '',
  nikIbu: '',
  umurIbu: '',
  pekerjaanIbu: '',
  alamatIbu: '',
  statusPernikahan: '',
  tanggalPernikahan: '',

  // Files
  files: {
    ktpAyah: null,
    ktpIbu: null,
    kk: null,
    suratKelahiran: null,
    bukuNikah: null
  },

  // Pengambilan
  metodePengambilan: '',
  jadwalPengambilan: ''
});

// ✅ Isi otomatis dari profil
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
    formData.value.statusPerkawinan = user.statusPerkawinan || '';
    formData.value.pendidikan = user.pendidikan || '';
    formData.value.nomorPonsel = user.phoneNumber.replace('+62', '').replace(/^0/, '');
    formData.value.kewarganegaraan = user.kewarganegaraan || 'Indonesia';
    formData.value.alamatLengkap = user.alamatLengkap || '';
  } catch (err) {
    console.error('Gagal muat profil:', err);
  }
});

const today = computed(() => new Date().toISOString().split('T')[0]);

const minDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split('T')[0];
});

const handleFileUpload = (event, fileType) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("Ukuran file maksimal 2MB");
    event.target.value = "";
    return;
  }

  const allowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  if (!allowed.includes(file.type)) {
    alert("Format file harus PDF/JPG/PNG");
    event.target.value = "";
    return;
  }

  formData.value.files[fileType] = file;
};

const removeFile = (fileType) => {
  formData.value.files[fileType] = null;
  const inputMap = {
    ktpAyah: "uploadKTPAyah",
    ktpIbu: "uploadKTPIbu",
    kk: "uploadKK",
    suratKelahiran: "uploadSuratKelahiran",
    bukuNikah: "uploadBukuNikah"
  };
  const id = inputMap[fileType];
  if (id) {
    const inputElement = document.getElementById(id);
    if (inputElement) inputElement.value = "";
  }
};

// ✅ INTEGRASI BACKEND - Upload file dengan FormData
const handleSubmit = async () => {
  // Validasi NIK
  if (formData.value.nikAyah.length !== 16) {
    alert("NIK Ayah harus 16 digit");
    return;
  }
  if (formData.value.nikIbu.length !== 16) {
    alert("NIK Ibu harus 16 digit");
    return;
  }

  // File wajib
  const requiredFiles = ["ktpAyah", "ktpIbu", "kk", "suratKelahiran"];
  for (const k of requiredFiles) {
    if (!formData.value.files[k]) {
      const labels = {
        ktpAyah: "KTP Ayah",
        ktpIbu: "KTP Ibu",
        kk: "Kartu Keluarga",
        suratKelahiran: "Surat Keterangan Kelahiran dari Bidan/RS"
      };
      alert(`Dokumen "${labels[k]}" wajib diunggah`);
      return;
    }
  }

  isSubmitting.value = true;

  try {
    // ✅ Buat FormData
    const formDataToSend = new FormData();

    formDataToSend.append('jenisSurat', 'Surat Keterangan Kelahiran');

    // ✅ Data JSON tanpa files
    const jsonData = {
      // Data Pemohon
      namaLengkap: formData.value.namaLengkap,
      nik: formData.value.nik,
      tempatLahir: formData.value.tempatLahir,
      tanggalLahir: formData.value.tanggalLahir,
      jenisKelamin: formData.value.jenisKelamin,
      agama: formData.value.agama,
      statusPerkawinan: formData.value.statusPerkawinan,
      pendidikan: formData.value.pendidikan,
      nomorPonsel: formData.value.nomorPonsel,
      kewarganegaraan: formData.value.kewarganegaraan,
      alamatLengkap: formData.value.alamatLengkap,

      // Data Anak
      namaAnak: formData.value.namaAnak,
      jenisKelaminAnak: formData.value.jenisKelaminAnak,
      tanggalLahirAnak: formData.value.tanggalLahirAnak,
      jamLahir: formData.value.jamLahir,
      tempatLahirAnak: formData.value.tempatLahirAnak,
      beratBadan: formData.value.beratBadan,
      tinggiBadan: formData.value.tinggiBadan,
      alamatLahir: formData.value.alamatLahir,

      // Data Orang Tua
      namaAyah: formData.value.namaAyah,
      nikAyah: formData.value.nikAyah,
      umurAyah: formData.value.umurAyah,
      pekerjaanAyah: formData.value.pekerjaanAyah,
      alamatAyah: formData.value.alamatAyah,
      namaIbu: formData.value.namaIbu,
      nikIbu: formData.value.nikIbu,
      umurIbu: formData.value.umurIbu,
      pekerjaanIbu: formData.value.pekerjaanIbu,
      alamatIbu: formData.value.alamatIbu,
      statusPernikahan: formData.value.statusPernikahan,
      tanggalPernikahan: formData.value.tanggalPernikahan,

      // Pengambilan
      metodePengambilan: formData.value.metodePengambilan,
      jadwalPengambilan: formData.value.jadwalPengambilan
    };
    formDataToSend.append('data', JSON.stringify(jsonData));

    // ✅ Append files
    formDataToSend.append('files[ktpAyah]', formData.value.files.ktpAyah);
    formDataToSend.append('files[ktpIbu]', formData.value.files.ktpIbu);
    formDataToSend.append('files[kk]', formData.value.files.kk);
    formDataToSend.append('files[suratKelahiran]', formData.value.files.suratKelahiran);

    // Buku nikah opsional
    if (formData.value.files.bukuNikah) {
      formDataToSend.append('files[bukuNikah]', formData.value.files.bukuNikah);
    }

    // Kirim
    const response = await api.post("/surat", formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert(`✅ Pengajuan Surat Keterangan Kelahiran berhasil!\nNo. Tiket: ${response.data.surat.noTiket}\n\nSilakan cek halaman "Surat Saya".`);
    router.push("/surat-saya");

  } catch (err) {
    console.error("❌ Error submit:", err);
    const msg = err.response?.data?.error || 'Gagal mengajukan surat, silakan coba lagi.';
    alert(`❌ ${msg}`);
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  if (confirm("Batalkan pengajuan?")) {
    router.push("/ajukan-surat");
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.sk-kelahiran-form-container {
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shared styles — same as SK Domisili, only color adjusted */
.page-header {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
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
  background: #fff0f0;
  border-left: 4px solid #ff6b6b;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex; gap: 1rem; align-items: flex-start;
}
.alert-info .material-icons { color: #ff6b6b; font-size: 24px; }
.alert-info strong { color: #d32f2f; }

.sk-kelahiran-form {
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
  font-size: 1.1rem; font-weight: 600; color: #e74c3c;
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
  outline: none; border-color: #ff6b6b; box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.phone-input {
  display: flex; align-items: center; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden;
  transition: all 0.3s ease;
}
.phone-input:focus-within {
  border-color: #ff6b6b; box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
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
.file-upload-label:hover { border-color: #ff6b6b; background: #fff0f0; }
.file-upload-label .material-icons { color: #ff6b6b; font-size: 24px; }
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
.radio-option:hover { border-color: #ff6b6b; background: #fff0f0; }
.radio-option input[type="radio"] { width: 20px; height: 20px; cursor: pointer; }
.radio-option input[type="radio"]:checked + .radio-content { color: #ff6b6b; }
.radio-option input[type="radio"]:checked { accent-color: #ff6b6b; }
.radio-content { display: flex; align-items: center; gap: 1rem; flex: 1; }
.radio-content .material-icons { font-size: 32px; color: #ff6b6b; }
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
  background: linear-gradient(135deg, #ff6b6b, #e74c3c);
  color: white;
}
.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #e64a19, #c62828);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
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
  .sk-kelahiran-form-container { padding: 0; }
  .page-header { padding: 1.5rem; }
  .page-title { font-size: 1.5rem; }
  .sk-kelahiran-form { padding: 1.5rem; }
  .form-row { grid-template-columns: 1fr; gap: 1rem; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}
</style>
