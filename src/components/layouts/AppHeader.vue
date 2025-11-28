<template>
  <header class="header-container">
    <div class="logo">
      <router-link to="/" class="logo-link">
        Desa Karang Sari
      </router-link>
    </div>

    <nav class="main-nav">
      <router-link to="/" class="nav-item">Fitur</router-link>
      <router-link to="/" class="nav-item">Cara Kerja</router-link>
      <router-link to="/" class="nav-item">Kontak</router-link>
    </nav>

    <div class="auth-buttons">
      <!-- Jika belum login -->
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="btn btn-masuk">Masuk</router-link>
        <router-link to="/register" class="btn btn-daftar">Daftar</router-link>
      </template>

      <!-- Jika sudah login ke sistem -->
      <template v-else>
        <div class="user-menu">
          <span class="user-name">
            <span class="material-icons">person</span>
            {{ username }}
          </span>
          <button @click="handleLogout" class="btn btn-logout">
            <span class="material-icons">logout</span>
            Keluar
          </button>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

const isLoggedIn = computed(() => !!user.value);
const username = computed(() => user.value?.username || 'Warga');

const handleLogout = () => {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('pengajuanSurat'); // hapus data lama
    user.value = null;
    router.push('/');
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: #006400;
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #006400;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  transition: all 0.3s;
}

.btn-masuk {
  background: #f5f5f5;
  color: #666;
}
.btn-masuk:hover {
  background: #e0e0e0;
}

.btn-daftar {
  background: #006400;
  color: white;
}
.btn-daftar:hover {
  background: #004d00;
}

.btn-logout {
  background: #e74c3c;
  color: white;
}
.btn-logout:hover {
  background: #c0392b;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-weight: 600;
}
</style>