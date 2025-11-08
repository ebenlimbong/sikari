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
          <input 
            type="password" 
            id="password"
            v-model="formData.password" 
            placeholder="Masukkan password"
            required
          />
        </div>

        <div class="form-options">
          <label class="checkbox-container">
            <input type="checkbox" v-model="formData.rememberMe">
            <span class="checkmark"></span>
            Ingat saya
          </label>
          <router-link to="/forgot-password" class="forgot-link">Lupa Password?</router-link>
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

const router = useRouter();

const formData = ref({
  username: '',
  password: '',
  rememberMe: false
});

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const handleLogin = async () => {
  // Reset messages
  errorMessage.value = '';
  successMessage.value = '';

  // Validasi form
  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = 'Username dan password harus diisi!';
    return;
  }

  // Validasi panjang password
  if (formData.value.password.length < 6) {
    errorMessage.value = 'Password minimal 6 karakter!';
    return;
  }

  isLoading.value = true;

  try {
    // SIMULASI LOGIN (Ganti dengan API call yang sebenarnya)
    console.log('🔐 Proses Login:', formData.value);

    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // DEMO: Login berhasil jika username dan password tidak kosong
    // GANTI INI dengan API call yang sebenarnya nanti
    const loginSuccess = formData.value.username && formData.value.password;

    if (loginSuccess) {
      // Simpan token (simulasi)
      const fakeToken = 'fake-jwt-token-' + Date.now();
      localStorage.setItem('user_token', fakeToken);
      
      // Simpan data user (opsional)
      const userData = {
        username: formData.value.username,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('user_data', JSON.stringify(userData));

      successMessage.value = 'Login berhasil! Mengalihkan...';
      
      // Redirect ke dashboard setelah delay
      setTimeout(() => {
        router.push({ name: 'dashboard' });
      }, 500);
    } else {
      errorMessage.value = 'Username atau password salah!';
    }
  } catch (error) {
    console.error('❌ Login Error:', error);
    errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
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