<template>
  <section class="hero-section">
    <AppHeader /> 

    <div class="hero-content">
      <h1>Sistem Administrasi Surat Menyurat</h1>
      <p>Kelola semua surat menyurat desa dengan mudah, cepat, dan transparan.</p>
      
      <div class="action-buttons">
        <router-link to="/register" class="btn btn-primary">Mulai Sekarang</router-link>
        <button class="btn btn-secondary">Pelajari Lebih Lanjut</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppHeader from '@/components/layouts/AppHeader.vue';
</script>

<style scoped>
.hero-section {
  background-color: #006400; 
  color: white;
  /* Padding bawah dihilangkan agar AppHeader yang mengatur padding total */
}
.hero-content {
  text-align: center;
  padding: 4rem 10%;
  padding-bottom: 5rem; /* Memberikan padding di bawah konten */
}
.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin: 0 0.5rem;
  border: none;
}
.btn-primary {
  background-color: #ff9900; 
  color: white;
}
.btn-secondary {
  background-color: white; 
  color: #006400;
  border: 1px solid white;
}
</style>