<template>
  <div class="login-page">
    <div class="login-container">
      <div class="icon-header">
        <span class="material-icons">lock</span>
      </div>
      <h2>Masuk</h2>
      <p class="subtitle">Gunakan akun Anda untuk melanjutkan</p>

      <!-- Alert Error -->
      <div v-if="errorMessage" class="alert-error">
        <span class="material-icons">error</span>
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Alert Success -->
      <div v-if="successMessage" class="alert-success">
        <span class="material-icons">check_circle</span>
        <p>{{ successMessage }}</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Email atau Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Masukkan email atau username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-with-icon">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              placeholder="Masukkan password"
              required
            />
            <button type="button" class="pwd-toggle" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'">
              <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        

        <button type="submit" class="btn-submit" :disabled="isLoading">
          <span v-if="!isLoading">Masuk</span>
          <span v-else>Memproses...</span>
        </button>
      </form>

      <p class="register-promo">
        Belum punya akun? <router-link to="/register">Daftar di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';

const router = useRouter();
const formData = ref({
  username: '',
  password: '',
  rememberMe: false
});
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = 'Username dan password harus diisi!';
    return;
  }

  if (formData.value.password.length < 6) {
    errorMessage.value = 'Password minimal 6 karakter!';
    return;
  }

  isLoading.value = true;

  try {
    const response = await api.post('/auth/login', {
      username: formData.value.username,
      password: formData.value.password
    });

    // Simpan token & user ke localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    successMessage.value = 'Login berhasil! Mengalihkan...';

    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Login gagal. Periksa username dan password.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #006400 0%, #228B22 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 450px;
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
}

.subtitle {
  color: #777;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  text-align: center;
}

/* Alert Messages */
.alert-error,
.alert-success {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: slideDown 0.3s ease;
}

.alert-error {
  background-color: #fee;
  border-left: 4px solid #e74c3c;
  color: #c0392b;
}

.alert-success {
  background-color: #e8f8f5;
  border-left: 4px solid #27ae60;
  color: #27ae60;
}

.alert-error .material-icons,
.alert-success .material-icons {
  font-size: 24px;
}

.alert-error p,
.alert-success p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.85rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.input-with-icon { position: relative; }
.input-with-icon input { width: 100%; }
.input-with-icon .pwd-toggle {
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}
.input-with-icon .pwd-toggle .material-icons { font-size: 1.15rem; color: #666; }

.form-group input:focus {
  outline: none;
  border-color: #006400;
  box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 0.5rem;
  cursor: pointer;
}

.forgot-link {
  color: #006400;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.forgot-link:hover {
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
  font-weight: bold;
  transition: background-color 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #004d00;
}

.btn-submit:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.register-promo {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}

.register-promo a {
  color: #006400;
  text-decoration: none;
  font-weight: 600;
}

.register-promo a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    padding: 2rem 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
