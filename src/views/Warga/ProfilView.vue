<template>
  <div class="profil-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Profil Warga</h1>
      <p class="page-subtitle">Data profil Anda yang terdaftar di sistem</p>
    </div>

    <div class="profile-actions">
  <router-link to="/profil/edit" class="btn-edit">
    <span class="material-icons">edit</span>
    Edit Profil
  </router-link>
</div>


    <!-- Profile Info -->
<div class="profile-card">
  <div class="profile-info-grid">
    <!-- Kolom Kiri: Identitas Diri -->
    <div class="info-column">
      <h3 class="info-group-title">Identitas Diri</h3>
      <div class="info-item">
        <label>Nama Lengkap</label>
        <p>{{ userProfile.firstName }} {{ userProfile.lastName }}</p>
      </div>
      <div class="info-item">
        <label>Username</label>
        <p>{{ userProfile.username }}</p>
      </div>
      <div class="info-item">
        <label>NIK</label>
        <p>{{ userProfile.nik }}</p>
      </div>
      <div class="info-item">
        <label>Nomor HP</label>
        <p>+62{{ userProfile.phoneNumber }}</p>
      </div>
      <div class="info-item">
        <label>Tempat, Tanggal Lahir</label>
        <p>
          {{ userProfile.tempatLahir }},
          {{ new Date(userProfile.tanggalLahir).toLocaleDateString('id-ID') }}
        </p>
      </div>
      <div class="info-item">
        <label>Jenis Kelamin</label>
        <p>{{ userProfile.jenisKelamin }}</p>
      </div>
      <div class="info-item">
        <label>Agama</label>
        <p>{{ userProfile.agama }}</p>
      </div>
    </div>

    <!-- Kolom Kanan: Data Sosial & Alamat -->
    <div class="info-column">
      <div class="info-section">
        <h3 class="info-group-title">Data Sosial</h3>
        <div class="info-item">
          <label>Status Perkawinan</label>
          <p>{{ userProfile.statusPerkawinan }}</p>
        </div>
        <div class="info-item">
          <label>Pendidikan Terakhir</label>
          <p>{{ userProfile.pendidikan }}</p>
        </div>
        <div class="info-item">
          <label>Pekerjaan</label>
          <p>{{ userProfile.pekerjaan }}</p>
        </div>
      </div>

      <div class="info-section">
        <h3 class="info-group-title">Alamat</h3>
        <div class="info-item full-width">
          <label>Alamat Lengkap</label>
          <p>{{ userProfile.alamatLengkap }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
    <!-- Change Password Form -->
    <div class="change-password-section">
      <h2>Ubah Kata Sandi</h2>
      <form @submit.prevent="handleChangePassword">
        <div class="form-group">
          <label>Kata Sandi Lama</label>
          <input v-model="passwordForm.oldPassword" type="password" placeholder="Masukkan kata sandi lama" required />
        </div>
        <div class="form-group">
          <label>Kata Sandi Baru</label>
          <input v-model="passwordForm.newPassword" type="password" placeholder="Minimal 8 karakter, kombinasi huruf & angka" required />
        </div>
        <div class="form-group">
          <label>Konfirmasi Kata Sandi Baru</label>
          <input v-model="passwordForm.confirmNewPassword" type="password" placeholder="Ulangi kata sandi baru" required />
        </div>
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Memproses...' : 'Ubah Kata Sandi' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';

const userProfile = ref({});
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});
const isSubmitting = ref(false);

onMounted(async () => {
  try {
    // ✅ Token otomatis disisipkan oleh interceptor — tidak perlu manual headers
    const response = await api.get('/auth/profile');

    // ✅ Ambil .user, bukan seluruh response.data
    userProfile.value = response.data.user; // ← INI YANG HARUS DIRUBAH

  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    alert('Gagal memuat profil. Silakan login ulang.');
  }
});

const handleChangePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmNewPassword) {
    alert('Kata sandi baru dan konfirmasinya tidak cocok.');
    return;
  }

  isSubmitting.value = true;
  try {
    // ✅ Tidak perlu header manual — interceptor sudah handle
    await api.post('/auth/change-password', {
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword
    });

    alert('Kata sandi berhasil diubah!');
    passwordForm.value = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  } catch (error) {
    console.error('❌ Error changing password:', error);
    alert('Gagal mengubah kata sandi. Periksa kata sandi lama Anda.');
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style scoped>
.profil-container {
  max-width: 1000px;
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

.page-title {
  font-size: 1.5rem;
  margin: 0;
}

.page-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0;
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

.profile-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

/* Grid 2 Kolom */
.profile-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-group-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #006400;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item label {
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
}

.info-item p {
  font-size: 1rem;
  color: #2c3e50;
  margin: 0;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-item.full-width {
  width: 100%;
}

/* Change Password Section */
.change-password-section {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.change-password-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #006400;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #004d00;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
