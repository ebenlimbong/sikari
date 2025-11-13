<template>
  <div class="dashboard-container">
    <!-- ✅ Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Memuat data...</p>
    </div>

    <!-- ✅ Error Message -->
    <div v-if="error && !isLoading" class="error-message">
      <span class="material-icons">error</span>
      <p>{{ error }}</p>
      <button @click="loadSuratData" class="btn-retry">
        <span class="material-icons">refresh</span>
        Coba Lagi
      </button>
    </div>

    <!-- Welcome Header -->
    <div class="welcome-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <p class="dashboard-subtitle">Kelola pengajuan surat Anda dengan mudah dan cepat</p>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-wrapper">
      <h2 class="section-title">Statistik Pengajuan Surat</h2>
      <div class="stats-grid">
        <!-- Card 1: Total Pengajuan -->
        <div class="stat-card card-blue">
          <div class="stat-icon">
            <span class="material-icons">description</span>
          </div>
          <div class="stat-info">
            <p class="stat-label">Total Pengajuan</p>
            <h3 class="stat-number">{{ totalPengajuan }}</h3>
            <span class="stat-percentage">100%</span>
          </div>
          <div class="stat-progress">
            <div class="progress-fill blue" style="width: 100%"></div>
          </div>
        </div>

        <!-- Card 2: Belum Dikerjakan -->
        <div class="stat-card card-orange">
          <div class="stat-icon">
            <span class="material-icons">schedule</span>
          </div>
          <div class="stat-info">
            <p class="stat-label">Belum Dikerjakan</p>
            <h3 class="stat-number">{{ belumDikerjakan }}</h3>
            <span class="stat-percentage">{{ percentageBelumDikerjakan }}%</span>
          </div>
          <div class="stat-progress">
            <div class="progress-fill orange" :style="{ width: percentageBelumDikerjakan + '%' }"></div>
          </div>
        </div>

        <!-- Card 3: Sedang Diproses -->
        <div class="stat-card card-gray">
          <div class="stat-icon">
            <span class="material-icons">hourglass_empty</span>
          </div>
          <div class="stat-info">
            <p class="stat-label">Sedang Diproses</p>
            <h3 class="stat-number">{{ sedangDiproses }}</h3>
            <span class="stat-percentage">{{ percentageSedangDiproses }}%</span>
          </div>
          <div class="stat-progress">
            <div class="progress-fill gray" :style="{ width: percentageSedangDiproses + '%' }"></div>
          </div>
        </div>

        <!-- Card 4: Selesai -->
        <div class="stat-card card-green">
          <div class="stat-icon">
            <span class="material-icons">check_circle</span>
          </div>
          <div class="stat-info">
            <p class="stat-label">Selesai</p>
            <h3 class="stat-number">{{ selesai }}</h3>
            <span class="stat-percentage">{{ percentageSelesai }}%</span>
          </div>
          <div class="stat-progress">
            <div class="progress-fill green" :style="{ width: percentageSelesai + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h2 class="section-title">Aksi Cepat</h2>
      <div class="actions-grid">
        <div @click="goToAjukanSurat" class="action-btn btn-primary">
          <span class="material-icons">add_circle</span>
          <span>Ajukan Surat Baru</span>
        </div>
        <router-link to="/surat-saya" class="action-btn btn-secondary">
          <span class="material-icons">list_alt</span>
          <span>Lihat Status Surat</span>
        </router-link>
        <router-link to="/profil" class="action-btn btn-tertiary">
          <span class="material-icons">person</span>
          <span>Kelola Profil</span>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="recent-activity" v-if="recentSurat.length > 0 && !isLoading">
      <h2 class="section-title">Pengajuan Terbaru</h2>
      <div class="activity-list">
        <div 
          v-for="surat in recentSurat" 
          :key="surat.noTiket" 
          class="activity-item"
          @click="goToSuratSaya"
        >
          <div class="activity-icon">
            <span class="material-icons">description</span>
          </div>
          <div class="activity-content">
            <h4 class="activity-title">{{ surat.jenisSurat }}</h4>
            <p class="activity-meta">
              <span class="activity-tiket">{{ surat.noTiket }}</span>
              <span class="activity-dot">•</span>
              <span class="activity-date">{{ formatDate(surat.tanggalPengajuan) }}</span>
            </p>
          </div>
          <span :class="['activity-status', getStatusClass(surat.status)]">
            {{ surat.status }}
          </span>
        </div>
      </div>
      <router-link to="/surat-saya" class="view-all-link">
        Lihat Semua Pengajuan
        <span class="material-icons">arrow_forward</span>
      </router-link>
    </div>

    <!-- Empty State -->
    <div class="empty-dashboard" v-else-if="!isLoading">
      <div class="empty-illustration">
        <span class="material-icons">inbox</span>
      </div>
      <h3>Belum Ada Pengajuan Surat</h3>
      <p>Mulai ajukan surat untuk keperluan administrasi Anda</p>
      <button @click="goToAjukanSurat" class="btn-start">
        <span class="material-icons">add_circle</span>
        Ajukan Surat Sekarang
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';

const router = useRouter();
const suratList = ref([]);
const isLoading = ref(false);
const error = ref(null);

// ✅ FIX: Proper async handling dengan loading state
const loadSuratData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    console.log('🔄 Fetching surat data...');
    
    const response = await api.get('/surat/me');
    
    // ✅ FIX: Handle berbagai response structure
    if (response.data) {
      suratList.value = response.data.suratList || response.data.data || response.data || [];
    } else {
      suratList.value = [];
    }
    
    console.log('✅ Data loaded:', suratList.value.length, 'items');
    
  } catch (err) {
    console.error('❌ Error loading surat:', err);
    error.value = err.response?.data?.message || 'Gagal memuat data';
    suratList.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Statistics
const totalPengajuan = computed(() => suratList.value.length);
const belumDikerjakan = computed(() => 
  suratList.value.filter(s => s.status === 'Belum Dikerjakan').length
);
const sedangDiproses = computed(() => 
  suratList.value.filter(s => s.status === 'Sedang Diproses').length
);
const selesai = computed(() => 
  suratList.value.filter(s => s.status === 'Selesai').length
);

// Percentages
const percentageBelumDikerjakan = computed(() => 
  totalPengajuan.value ? Math.round((belumDikerjakan.value / totalPengajuan.value) * 100) : 0
);
const percentageSedangDiproses = computed(() => 
  totalPengajuan.value ? Math.round((sedangDiproses.value / totalPengajuan.value) * 100) : 0
);
const percentageSelesai = computed(() => 
  totalPengajuan.value ? Math.round((selesai.value / totalPengajuan.value) * 100) : 0
);

// Recent 5 surat (terbaru di atas)
const recentSurat = computed(() => suratList.value.slice(0, 5));

// Methods
const goToAjukanSurat = () => router.push('/ajukan-surat');
const goToSuratSaya = () => router.push('/surat-saya');

const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  } catch {
    return '-';
  }
};

const getStatusClass = (status) => {
  const map = {
    'Belum Dikerjakan': 'status-pending',
    'Sedang Diproses': 'status-processing',
    'Selesai': 'status-done',
    'Ditolak': 'status-rejected'
  };
  return map[status] || 'status-pending';
};

// ✅ FIX: onMounted untuk initial load
onMounted(() => {
  console.log('📍 Dashboard mounted');
  loadSuratData();
});

// ✅ FIX: onActivated untuk refresh saat kembali ke halaman (keep-alive)
onActivated(() => {
  console.log('📍 Dashboard activated (kembali ke halaman)');
  loadSuratData();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Container */
.dashboard-container {
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

/* Welcome Header */
.welcome-header {
  background: linear-gradient(135deg, #006400, #228B22);
  padding: 2rem 2.5rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 100, 0, 0.2);
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.dashboard-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
}

/* Section Titles */
.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.25rem;
}

/* Stats Section */
.stats-wrapper {
  margin-bottom: 2.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

/* Stat Cards */
.stat-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.card-blue { border-left-color: #3498db; }
.card-orange { border-left-color: #f39c12; }
.card-gray { border-left-color: #95a5a6; }
.card-green { border-left-color: #27ae60; }

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-blue .stat-icon {
  background: rgba(52, 152, 219, 0.15);
}

.card-orange .stat-icon {
  background: rgba(243, 156, 18, 0.15);
}

.card-gray .stat-icon {
  background: rgba(149, 165, 166, 0.15);
}

.card-green .stat-icon {
  background: rgba(39, 174, 96, 0.15);
}

.card-blue .stat-icon .material-icons { color: #3498db; }
.card-orange .stat-icon .material-icons { color: #f39c12; }
.card-gray .stat-icon .material-icons { color: #95a5a6; }
.card-green .stat-icon .material-icons { color: #27ae60; }

.stat-icon .material-icons {
  font-size: 28px;
}

.stat-info {
  margin-bottom: 1rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.stat-number {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: inline-block;
}

.stat-percentage {
  font-size: 0.85rem;
  color: #95a5a6;
  margin-left: 0.5rem;
  font-weight: 600;
}

/* Progress Bar */
.stat-progress {
  width: 100%;
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s ease;
}

.progress-fill.blue { background: #3498db; }
.progress-fill.orange { background: #f39c12; }
.progress-fill.gray { background: #95a5a6; }
.progress-fill.green { background: #27ae60; }

/* Quick Actions */
.quick-actions {
  margin-bottom: 2.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #3498db, #5dade2);
  color: white;
}

.btn-tertiary {
  background: linear-gradient(135deg, #9b59b6, #bb8fce);
  color: white;
}

.action-btn .material-icons {
  font-size: 24px;
}

/* Recent Activity */
.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.activity-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.activity-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #006400, #228B22);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon .material-icons {
  color: white;
  font-size: 24px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.4rem 0;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin: 0;
}

.activity-tiket {
  font-weight: 600;
  color: #3498db;
}

.activity-dot {
  color: #d0d0d0;
}

.activity-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-processing {
  background: #cce5ff;
  color: #004085;
}

.status-done {
  background: #d4edda;
  color: #155724;
}

.status-rejected {
  background: #f8d7da;
  color: #721c24;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #006400;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all-link:hover {
  gap: 0.75rem;
  color: #004d00;
}

.view-all-link .material-icons {
  font-size: 20px;
}

/* Empty Dashboard */
.empty-dashboard {
  background: white;
  border-radius: 12px;
  padding: 4rem 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.empty-illustration {
  margin-bottom: 1.5rem;
}

.empty-illustration .material-icons {
  font-size: 80px;
  color: #d0d0d0;
}

.empty-dashboard h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
}

.empty-dashboard p {
  color: #7f8c8d;
  margin: 0 0 2rem 0;
}

.btn-start {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-start:hover {
  background: linear-gradient(135deg, #004d00, #1a7a1a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
}

.btn-start .material-icons {
  font-size: 24px;
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0;
  }

  .welcome-header {
    padding: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .dashboard-title {
    font-size: 1.5rem;
  }

  .dashboard-subtitle {
    font-size: 0.9rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .recent-activity {
    padding: 1.5rem;
  }

  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .activity-status {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .welcome-header {
    padding: 1.5rem;
  }

  .dashboard-title {
    font-size: 1.3rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .empty-dashboard {
    padding: 3rem 1.5rem;
  }
}

/* ✅ Tambahkan style untuk loading & error */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #006400;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  margin-top: 1rem;
  color: #666;
  font-weight: 600;
}

.error-message {
  background: #fee;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-message .material-icons {
  font-size: 48px;
  color: #e74c3c;
}

.error-message p {
  color: #e74c3c;
  font-weight: 600;
  margin: 0;
}

.btn-retry {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-retry:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>