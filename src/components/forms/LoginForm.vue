h<template>
  <div class="login-form-panel">
    <h3>Masuk</h3>
    <p class="form-subtitle">Gunakan akun Anda untuk melanjutkan</p>

    <form @submit.prevent="handleLogin">

      <BaseInput
        label="Email atau Username"
        type="email"
        v-model="formData.email"
        placeholder="Masukkan email atau username"
        required
      />

      <BaseInput
        label="Password"
        type="password"
        v-model="formData.password"
        placeholder="Masukkan password"
        required
      />

    

      <button type="submit" class="btn-submit">Masuk</button>
    </form>

    <p class="register-promo">
      Belum punya akun? <router-link to="/register">Daftar di sini</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/global/BaseInput.vue';
import { useRouter } from 'vue-router'; // Untuk navigasi setelah login

const formData = ref({
  email: '',
  password: '',
  rememberMe: false,
});

const router = useRouter(); // Inisialisasi router

const handleLogin = () => {
  console.log('Data Login:', formData.value);
  // TODO: Implementasi logika kirim ke API Backend
  // Setelah berhasil login:
  // - Simpan token autentikasi (misalnya di Pinia store atau Local Storage)
  // - Cek role user (Admin atau Warga)
  // - Arahkan ke dashboard yang sesuai

  // Contoh simulasi redirect (ganti dengan logika real)
  // if (formData.value.email === 'admin@desa.id') {
  //   router.push('/admin/dashboard');
  // } else {
  //   router.push('/warga/dashboard');
  // }
};
</script>

<style scoped>
.login-form-panel {
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
}
.form-subtitle {
  color: #777;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #555;
}
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 3px;
}
.checkbox-container input:checked ~ .checkmark {
  background-color: #006400;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.forgot-link {
  color: #006400;
  text-decoration: none;
  font-weight: 500;
}
.btn-submit {
  width: 100%;
  padding: 0.8rem;
  background-color: #006400; /* Tombol hijau */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}
.btn-submit:hover {
  background-color: #004d00;
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
  font-weight: 500;
}

/* Responsif untuk layar kecil */
@media (max-width: 768px) {
  .login-form-panel {
    padding: 1.5rem;
  }
  .form-options {
    flex-direction: column;
    align-items: flex-start;
  }
  .forgot-link {
    margin-top: 0.5rem;
  }
}
</style>
