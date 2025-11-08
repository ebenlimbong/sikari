<template>
  <section class="features-section">
    <h2 class="section-title">Fitur Unggulan</h2>
    
    <div class="features-grid">
      <FeatureCard 
        v-for="(feature, index) in features" 
        :key="index" 
        :feature="feature" 
      />
    </div>
  </section>
</template>

<script setup>
// Pastikan path ini benar!
import FeatureCard from '@/components/ui/FeatureCard.vue'; 
import { ref } from 'vue';

const features = ref([
  { title: "Pengajuan Surat", description: "Ajukan berbagai jenis surat dengan mudah melalui platform digital kami.", icon: '📄' },
  { title: "Verifikasi Cepat", description: "Proses verifikasi yang transparan dan dapat dilacak secara real-time.", icon: '✅' },
  { title: "Laporan Lengkap", description: "Dapatkan laporan komprehensif tentang semua aktivitas surat menyurat.", icon: '📊' },
  { title: "Keamanan Data", description: "Data Anda dilindungi dengan enkripsi tingkat enterprise.", icon: '🔒' },
  { title: "Akses Mudah", description: "Akses dari mana saja, kapan saja melalui perangkat apa pun.", icon: '🌐' },
  { title: "Dukungan 24/7", description: "Tim support kami siap membantu Anda kapan pun dibutuhkan.", icon: '🧑‍💻' }
]);
</script>

<style scoped>
.features-section {
  padding: 4rem 10%;
  background-color: #f9f9f9;
}
.section-title {
  text-align: center;
  font-size: 2rem;
  color: #006400;
  margin-bottom: 3rem;
  font-weight: 700;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>