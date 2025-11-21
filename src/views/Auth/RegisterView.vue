<template>
  <div class="register-page">
    <div class="register-container">
      <div class="icon-header">
        <span class="material-icons">person_add</span>
      </div>
      <h2>Daftar Akun</h2>
      <p class="subtitle">Buat akun baru untuk mengakses sistem</p>

      <!-- Alert Info -->
      <div class="alert-info">
        <span class="material-icons">info</span>
        <p>
          <strong>Kode Registrasi Diperlukan</strong><br>
          Anda memerlukan kode registrasi yang diberikan oleh sekretariat desa. Silahkan hubungi sekretariat desa jika Anda belum memilikinya.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegistration">
        <!-- Nama Depan & Belakang -->
        <div class="form-row">
          <BaseInput
            label="Nama Depan"
            type="text"
            v-model="formData.firstName"
            placeholder="Nama depan"
            required
          />
          <BaseInput
            label="Nama Belakang"
            type="text"
            v-model="formData.lastName"
            placeholder="Nama belakang"
            required
          />
        </div>

        <!-- Username -->
        <BaseInput
          label="Username"
          type="text"
          v-model="formData.username"
          placeholder="Masukkan username Anda"
          required
        />

        <!-- Nomor Telepon -->
        <BaseInput
          label="Nomor Telepon"
          type="tel"
          v-model="formData.phoneNumber"
          placeholder="Contoh: 08123456789"
          required
        />

        <!-- NIK -->
        <BaseInput
          label="NIK (Nomor Induk Kependudukan)"
          type="text"
          v-model="formData.nik"
          maxlength="16"
          :toggle-password="false"
          placeholder="Masukkan NIK Anda"
          required
        />

        <!-- Kode Registrasi -->
        <BaseInput
          label="Kode Registrasi"
          type="text"
          v-model="formData.registrationCode"
          placeholder="Masukkan kode registrasi dari desa"
          required
        />

        <!-- Password -->
        <BaseInput
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="Buat password yang kuat"
          required
          :toggle-password="true"
        />

        <!-- Konfirmasi Password -->
        <BaseInput
          label="Konfirmasi Password"
          type="password"
          v-model="formData.password_confirmation"
          placeholder="Ulangi password Anda"
          required
          :toggle-password="true"
        />

        <!-- Agreement Checkbox -->
        <div class="checkbox-agreement">
          <label class="checkbox-container">
            <input type="checkbox" v-model="formData.agreedToTerms" required>
            <span class="checkmark"></span>
            Saya setuju dengan <router-link to="/terms" target="_blank">Syarat dan Ketentuan</router-link> serta <router-link to="/privacy" target="_blank">Kebijakan Privasi</router-link>
          </label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Memproses...' : 'Daftar Akun' }}
        </button>
      </form>

      <!-- Login Promo -->
      <p class="login-promo">
        Sudah punya akun? <router-link to="/login">Masuk di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/global/BaseInput.vue';
import api from '@/api';

const router = useRouter();
const formData = ref({
  firstName: '',
  lastName: '',
  username: '',
  phoneNumber: '',
  nik: '',
  registrationCode: '',
  password: '',
  password_confirmation: '',
  agreedToTerms: false,
});
const isLoading = ref(false);

// sanitize NIK input: hanya angka, maksimal 16 karakter
watch(() => formData.value.nik, (newVal) => {
  if (newVal == null) return;
  const digits = String(newVal).replace(/\D+/g, '').slice(0, 16);
  if (digits !== String(newVal)) {
    formData.value.nik = digits;
  }
});

const handleRegistration = async () => {
  if (!formData.value.agreedToTerms) {
    alert('Harap setuju dengan Syarat dan Ketentuan.');
    return;
  }

  if (formData.value.password !== formData.value.password_confirmation) {
    alert('Password dan konfirmasi password tidak cocok.');
    return;
  }

  // Validasi NIK harus 16 karakter (angka)
  const nikValue = String(formData.value.nik || '');
  if (nikValue.length !== 16) {
    alert('NIK harus terdiri dari 16 digit.');
    return;
  }

  // Validasi password minimal 6 karakter
  if (!formData.value.password || formData.value.password.length < 6) {
    alert('Password minimal 6 karakter.');
    return;
  }

  isLoading.value = true;
  try {
    const response = await api.post('/auth/register', {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      username: formData.value.username,
      phoneNumber: formData.value.phoneNumber,
      nik: formData.value.nik,
      registrationCode: formData.value.registrationCode,
      password: formData.value.password
    });

    alert('Registrasi berhasil! Silakan login.');
    router.push('/login');
  } catch (error) {
    alert(error.response?.data?.error || 'Registrasi gagal. Periksa data Anda.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #006400 0%, #228B22 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.register-container {
  width: 100%;
  max-width: 550px;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  text-align: left;
}

.icon-header {
  background-color: #006400;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}

.icon-header .material-icons {
  font-size: 2.5rem;
  color: white;
}

h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;
}

.subtitle {
  color: #777;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  text-align: center;
}

.alert-info {
  background-color: #e6f7ff;
  border-left: 5px solid #1890ff;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
  color: #0050b3;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: 6px;
}

.alert-info .material-icons {
  font-size: 1.5rem;
  margin-top: 0.1rem;
}

.alert-info p {
  margin: 0;
  line-height: 1.6;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row > div {
  flex: 1;
  margin-bottom: 0 !important;
}

.checkbox-agreement {
  margin: 1.5rem 0;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 0.5rem;
  margin-top: 0.2rem;
  cursor: pointer;
}

.checkbox-container a {
  color: #006400;
  text-decoration: none;
  font-weight: 500;
}

.checkbox-container a:hover {
  text-decoration: underline;
}

.btn-submit {
  width: 100%;
  padding: 0.9rem;
  background-color: #006400;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #004d00;
}

.login-promo {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}

.login-promo a {
  color: #006400;
  text-decoration: none;
  font-weight: 600;
}

.login-promo a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .register-page {
    padding: 1rem;
  }

  .register-container {
    padding: 2rem 1.5rem;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-row > div {
    margin-bottom: 1rem !important;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
