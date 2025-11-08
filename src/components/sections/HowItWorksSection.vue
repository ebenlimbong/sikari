<template>
  <section class="how-it-works-section">
    <h2 class="section-title">Cara Kerja Sistem</h2>
    
    <div class="steps-grid">
      <StepCard 
        v-for="step in steps" 
        :key="step.number" 
        :step="step" 
      />
    </div>
  </section>
</template>

<script setup>
// Pastikan path ini benar!
import StepCard from '@/components/ui/StepCard.vue'; 
import { ref } from 'vue';

const steps = ref([
  { number: 1, title: "Daftar Akun", description: "Buat akun dengan menggunakan kode registrasi yang diberikan oleh desa." },
  { number: 2, title: "Pilih Jenis Surat", description: "Pilih jenis surat yang Anda butuhkan dari daftar yang tersedia." },
  { number: 3, title: "Isi Formulir", description: "Lengkapi formulir dengan data yang diperlukan dengan akurat." },
  { number: 4, title: "Verifikasi", description: "Sekretariat desa akan memverifikasi pengajuan Anda." },
  { number: 5, title: "Persetujuan", description: "Setelah disetujui, surat siap untuk diambil atau dikirim." },
  { number: 6, title: "Selesai", description: "Terima surat Anda dan nikmati kemudahan layanan digital." }
]);
</script>

<style scoped>
.how-it-works-section {
  padding: 4rem 10%;
  background-color: white;
}
.section-title {
  text-align: center;
  font-size: 2rem;
  color: #006400;
  margin-bottom: 3rem;
  font-weight: 700;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>