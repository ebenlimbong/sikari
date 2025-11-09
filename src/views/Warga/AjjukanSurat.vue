<template>
  <div class="ajukan-surat-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Ajukan Surat Baru</h1>
      <p class="page-subtitle">Pilih jenis surat yang ingin Anda ajukan dan lengkapi data yang diperlukan</p>
    </div>

    <!-- Surat Cards Grid -->
    <div class="surat-grid">
      <SuratCard 
        v-for="(surat, index) in jenisSurat" 
        :key="index"
        :title="surat.title"
        :description="surat.description"
        :dokumen="surat.dokumen"
        :icon="surat.icon"
        :iconColor="surat.iconColor"
        @click="handleCardClick(surat)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SuratCard from '@/components/ui/SuratCard.vue';

const router = useRouter();

const handleCardClick = (surat) => {
  // Mapping surat ke route
  const suratRoutes = {
    'Surat Keterangan Tidak Mampu': '/ajukan-surat/sktm',
    'Surat Keterangan Domisili': '/ajukan-surat/domisili'
  };

  const route = suratRoutes[surat.title];
  
  if (route) {
    router.push(route);
  } else {
    alert(`Form untuk ${surat.title} sedang dalam pengembangan.`);
  }
};

const jenisSurat = ref([
  // 1. Surat Keterangan Tidak Mampu
  { 
    title: 'Surat Keterangan Tidak Mampu', 
    description: 'Surat untuk mengajukan bantuan sosial, beasiswa, dan program kesejahteraan.', 
    dokumen: 'Kartu Keluarga, KTP, Surat Pernyataan Tidak Mampu', 
    icon: 'sentiment_dissatisfied',
    iconColor: '#e74c3c'
  },
  // 2. Surat Keterangan Domisili
  { 
    title: 'Surat Keterangan Domisili', 
    description: 'Surat resmi sebagai bukti tempat tinggal seseorang atau badan hukum di wilayah desa.', 
    dokumen: 'KTP, Kartu Keluarga, Bukti Kepemilikan/Sewa Rumah', 
    icon: 'location_on', 
    iconColor: '#3498db'
  },
  // 3. Surat Keterangan Penghasilan
  { 
    title: 'Surat Keterangan Penghasilan', 
    description: 'Surat untuk keperluan administrasi pinjaman, kredit, dan verifikasi penghasilan.', 
    dokumen: 'KTP, Kartu Keluarga, Bukti Usaha/Pekerjaan', 
    icon: 'attach_money', 
    iconColor: '#f39c12'
  },
  // 4. Surat Pengantar Pindah
  { 
    title: 'Surat Pengantar Pindah', 
    description: 'Surat untuk keperluan perubahan alamat dan perpindahan tempat tinggal ke desa lain.', 
    dokumen: 'Kartu Keluarga, KTP, Bukti Kepemilikan Rumah', 
    icon: 'home', 
    iconColor: '#9b59b6'
  },
  // 5. Surat Pengantar KK, KTP, dan Akta Lahir
  { 
    title: 'Surat Pengantar KK, KTP, dan Akta Lahir', 
    description: 'Surat pengantar untuk pengurusan dokumen identitas dan akta kelahiran di instansi terkait.', 
    dokumen: 'Kartu Keluarga, KTP, Surat Permohonan', 
    icon: 'badge', 
    iconColor: '#2c3e50'
  },
  // 6. Surat Keterangan Usaha
  { 
    title: 'Surat Keterangan Usaha', 
    description: 'Surat untuk mendirikan usaha kecil, izin usaha, dan keperluan administrasi bisnis.', 
    dokumen: 'KTP, Kartu Keluarga, Bukti Lokasi Usaha', 
    icon: 'store', 
    iconColor: '#34495e'
  },
  // 7. Surat Keterangan Meninggal Dunia
  { 
    title: 'Surat Keterangan Meninggal Dunia', 
    description: 'Surat resmi untuk keperluan administrasi kematian, asuransi, dan pengurusan warisan.', 
    dokumen: 'Kartu Keluarga, KTP, Surat Kematian dari Rumah Sakit', 
    icon: 'description', 
    iconColor: '#27ae60'
  },
  // 8. Surat Keterangan Kelahiran
  { 
    title: 'Surat Keterangan Kelahiran', 
    description: 'Surat untuk keperluan administrasi kelahiran dan pencatatan akta kelahiran.', 
    dokumen: 'KTP Orang Tua, Kartu Keluarga, Surat Keterangan Bidan', 
    icon: 'child_care', 
    iconColor: '#ff6b6b'
  },
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.ajukan-surat-container {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #006400, #228B22);
  padding: 2rem 2.5rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 100, 0, 0.2);
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
}

/* Surat Grid */
.surat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .ajukan-surat-container {
    padding: 0;
  }

  .page-header {
    padding: 1.75rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .surat-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (min-width: 1400px) {
  .surat-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>