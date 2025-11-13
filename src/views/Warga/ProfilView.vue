<template>
  <div class="profil-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Profil Warga</h1>
      <p class="page-subtitle">Data profil Anda yang terdaftar di sistem</p>
    </div>
    <!-- Profile Info -->
    <div class="profile-card">
      <div class="profile-info">
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
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda belum login. Silakan login terlebih dahulu.');
      return;
    }

    const response = await api.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    userProfile.value = response.data;
  } catch (error) {
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
    const token = localStorage.getItem('token');
    await api.post('/auth/change-password', {
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Kata sandi berhasil diubah!');
    // Reset form
    passwordForm.value = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  } catch (error) {
    alert('Gagal mengubah kata sandi. Periksa kata sandi lama Anda.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.profil-container {
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
.page-title {
  font-size: 1.5rem;
  margin: 0;
}
.page-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0;
}
.profile-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}
.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
.info-item {
  display: flex;
  flex-direction: column;
}
.info-item label {
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}
.info-item p {
  font-size: 1rem;
  color: #2c3e50;
  margin: 0;
}
.change-password-section {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.change-password-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
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