<template>
  <div class="profil-edit-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <router-link to="/profil" class="back-button">
          <span class="material-icons">arrow_back</span>
          <span>Kembali</span>
        </router-link>
        <h1 class="page-title">Edit Profil</h1>
        <p class="page-subtitle">Lengkapi data profil Anda untuk memudahkan pengajuan surat.</p>
      </div>
    </div>



    <!-- Form Edit Profil -->
    <form @submit.prevent="handleSubmit" class="edit-profile-form">
      <!-- Nama Lengkap -->
      <div class="form-group">
        <label for="namaLengkap">Nama Lengkap</label>
        <input
          type="text"
          id="namaLengkap"
          v-model="formData.firstName"
          placeholder="Nama depan"
          required
        />
        <input
          type="text"
          v-model="formData.lastName"
          placeholder="Nama belakang"
          required
        />
      </div>

      <!-- NIK -->
      <div class="form-group">
        <label for="nik">NIK</label>
        <input
          type="text"
          id="nik"
          v-model="formData.nik"
          placeholder="16 digit NIK"
          maxlength="16"
          required
        />
      </div>

      <!-- Nomor HP -->
      <div class="form-group">
        <label for="phoneNumber">Nomor HP</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="formData.phoneNumber"
          placeholder="+62812..."
          required
        />
      </div>

      <!-- Data Tambahan -->
      <div class="form-section">
        <h2 class="section-title">Data Tambahan</h2>

        <div class="form-row">
          <div class="form-group">
            <label for="tempatLahir">Tempat Lahir</label>
            <input
              type="text"
              id="tempatLahir"
              v-model="formData.tempatLahir"
              placeholder="Contoh: Bandung"
            />
          </div>
          <div class="form-group">
            <label for="tanggalLahir">Tanggal Lahir</label>
            <input
              type="date"
              id="tanggalLahir"
              v-model="formData.tanggalLahir"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="jenisKelamin">Jenis Kelamin</label>
            <select
              id="jenisKelamin"
              v-model="formData.jenisKelamin"
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="form-group">
            <label for="agama">Agama</label>
            <select
              id="agama"
              v-model="formData.agama"
            >
              <option value="">Pilih</option>
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
            <label for="pekerjaan">Pekerjaan</label>
            <input
              type="text"
              id="pekerjaan"
              v-model="formData.pekerjaan"
              placeholder="Contoh: PNS, Guru, Pedagang"
            />
          </div>
          <div class="form-group">
            <label for="statusPerkawinan">Status Perkawinan</label>
            <select
              id="statusPerkawinan"
              v-model="formData.statusPerkawinan"
            >
              <option value="">Pilih</option>
              <option value="Kawin">Kawin</option>
              <option value="Belum Kawin">Belum Kawin</option>
              <option value="Cerai Hidup">Cerai Hidup</option>
              <option value="Cerai Mati">Cerai Mati</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="pendidikan">Pendidikan Terakhir</label>
            <select
              id="pendidikan"
              v-model="formData.pendidikan"
            >
              <option value="">Pilih</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="Diploma">Diploma</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>
          <div class="form-group">
            <label for="alamatLengkap">Alamat Lengkap</label>
            <textarea
              id="alamatLengkap"
              v-model="formData.alamatLengkap"
              rows="3"
              placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02, Kelurahan X, Kecamatan Y, Kota Z"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-actions">
        <button type="button" @click="$router.push('/profil')" class="btn-cancel">
          <span class="material-icons">close</span>
          Batal
        </button>
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          <span class="material-icons">save</span>
          <span v-if="!isSubmitting">Simpan Perubahan</span>
          <span v-else>Menyimpan...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';

const isSubmitting = ref(false);
const formData = ref({
  firstName: '',
  lastName: '',
  nik: '',
  phoneNumber: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  pekerjaan: '',
  statusPerkawinan: '',
  pendidikan: '',
  alamatLengkap: ''
});

onMounted(async () => {
  try {
    const response = await api.get('/auth/profile');
    const user = response.data.user;

    // Isi form dengan data user
    formData.value.firstName = user.firstName;
    formData.value.lastName = user.lastName;
    formData.value.nik = user.nik;
    formData.value.phoneNumber = user.phoneNumber;
    formData.value.tempatLahir = user.tempatLahir || '';
    formData.value.tanggalLahir = user.tanggalLahir ? new Date(user.tanggalLahir).toISOString().split('T')[0] : '';
    formData.value.jenisKelamin = user.jenisKelamin || '';
    formData.value.agama = user.agama || '';
    formData.value.pekerjaan = user.pekerjaan || '';
    formData.value.statusPerkawinan = user.statusPerkawinan || '';
    formData.value.pendidikan = user.pendidikan || '';
    formData.value.alamatLengkap = user.alamatLengkap || '';
  } catch (err) {
    console.error('Gagal muat profil:', err);
    alert('Gagal memuat data profil. Silakan coba lagi.');
  }
});

const handleSubmit = async () => {
  if (formData.value.nik.length !== 16) {
    alert('NIK harus 16 digit!');
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      ...formData.value,
      // Gabungkan nama depan & belakang menjadi satu field (jika backend butuh)
      namaLengkap: `${formData.value.firstName} ${formData.value.lastName}`
    };

    const response = await api.put('/auth/profile', payload);

    alert('✅ Profil berhasil diperbarui!');

    // Redirect ke halaman profil
    window.location.href = '/profil'; // atau $router.push('/profil')

  } catch (err) {
    console.error('❌ Gagal update profil:', err);
    alert('Gagal memperbarui profil. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Styling untuk halaman edit profil */
.profil-edit-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  background: linear-gradient(135deg, #006400, #228B22);
  padding: 1.5rem;
  border-radius: 10px;
  color: white;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: 500;
  gap: 8px;
}

.page-title {
  font-size: 1.5rem;
  margin: 0;
}

.page-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0;
}

.edit-profile-form {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.form-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.section-title {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 1.2rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-cancel:hover {
  background: #5a6268;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background: #006400;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-submit:hover {
  background: #004d00;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.profile-actions {
  margin-bottom: 20px;
  text-align: right;
}

.btn-edit {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  gap: 8px;
}

.btn-edit:hover {
  background-color: #45a049;
}
</style>
