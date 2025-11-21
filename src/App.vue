<template>
  <div id="app">
    <!-- Conditional Layout: Hanya tampil di rute terproteksi -->
    <AppLayout v-if="isAuthenticatedRoute">
      <router-view />
    </AppLayout>

    <!-- Tanpa Layout: Untuk halaman publik (Home, Login, Register) -->
    <router-view v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/components/layouts/AppLayout.vue';

const route = useRoute();

// Daftar rute yang memerlukan layout dengan sidebar
const authenticatedRoutes = [
  '/dashboard',
  '/ajukan-surat',
  '/surat-saya',
  '/profil',
  // '/bantuan' removed
];

// Cek apakah rute saat ini perlu layout
const isAuthenticatedRoute = computed(() => {
  return authenticatedRoutes.some(authRoute =>
    route.path.startsWith(authRoute)
  );
});
</script>

<style>
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
}
</style>
