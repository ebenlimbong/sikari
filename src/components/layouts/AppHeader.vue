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
      <router-link to="/login" class="btn btn-masuk">Masuk</router-link>
      <router-link to="/register" class="btn btn-daftar">Daftar</router-link>
    </div>
  </header>
</template>

<script setup>
// Script minimal
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%; 
  background-color: #006400; 
  color: white;
}
.logo-link {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}
.main-nav .nav-item {
  margin: 0 1rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}
.main-nav .nav-item:hover {
    opacity: 0.8;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 0.5rem;
  font-weight: bold;
}
.btn-masuk {
  background: none;
  border: 1px solid white;
  color: white;
}
.btn-daftar {
  background-color: #ff9900; 
  color: white;
}
</style>