<template>
  <div class="surat-saya-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Daftar Pengajuan Surat</h1>
        <p class="page-subtitle">Pantau status pengajuan surat Anda di sini</p>
      </div>
      <button @click="refreshData" class="btn-refresh">
        <span class="material-icons">refresh</span>
        Refresh
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-cards">
      <div class="stat-card card-total">
        <div class="stat-icon">
          <span class="material-icons">description</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Total Pengajuan</p>
          <h3 class="stat-number">{{ totalPengajuan }}</h3>
        </div>
      </div>

      <div class="stat-card card-pending">
        <div class="stat-icon">
          <span class="material-icons">schedule</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Belum Dikerjakan</p>
          <h3 class="stat-number">{{ belumDikerjakan }}</h3>
        </div>
      </div>

      <div class="stat-card card-processing">
        <div class="stat-icon">
          <span class="material-icons">hourglass_empty</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Sedang Diproses</p>
          <h3 class="stat-number">{{ sedangDiproses }}</h3>
        </div>
      </div>

      <div class="stat-card card-done">
        <div class="stat-icon">
          <span class="material-icons">check_circle</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Selesai</p>
          <h3 class="stat-number">{{ selesai }}</h3>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-section">
      <div class="table-header">
        <h2 class="section-title">Riwayat Pengajuan</h2>
        <div class="search-box">
          <span class="material-icons">search</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari berdasarkan jenis surat atau no. tiket..."
          />
        </div>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <table class="surat-table" v-if="filteredSurat.length > 0">
          <thead>
            <tr>
              <th>No</th>
              <th>Tgl Tiket</th>
              <th>No. Tiket</th>
              <th>Jenis Surat</th>
              <th>Status</th>
              <th>Catatan Admin</th>
              <th>Waktu Selesai</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(surat, index) in paginatedSurat" :key="surat.noTiket">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ formatDate(surat.tanggalPengajuan) }}</td>
              <td><span class="tiket-badge">{{ surat.noTiket }}</span></td>
              <td>{{ surat.jenisSurat }}</td>
              <td>
                <span :class="['status-badge', getStatusClass(surat.status)]">
                  {{ surat.status }}
                </span>
              </td>
              <td>
                <span class="catatan-text">{{ surat.catatanAdmin || '-' }}</span>
              </td>
              <td>{{ surat.waktuSelesai ? formatDate(surat.waktuSelesai) : '-' }}</td>
              <td>
                <button @click="openDetail(surat)" class="btn-detail">
                  <span class="material-icons">visibility</span>
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <span class="material-icons">inbox</span>
          <h3>Belum Ada Pengajuan Surat</h3>
          <p>Anda belum mengajukan surat apapun. Silakan ajukan surat terlebih dahulu.</p>
          <router-link to="/ajukan-surat" class="btn-ajukan">
            <span class="material-icons">add</span>
            Ajukan Surat Baru
          </router-link>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="filteredSurat.length > itemsPerPage">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="page-btn"
        >
          <span class="material-icons">chevron_left</span>
        </button>
        
        <span class="page-info">
          Halaman {{ currentPage }} dari {{ totalPages }}
        </span>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <DetailSuratModal 
      :isOpen="isModalOpen" 
      :surat="selectedSurat" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DetailSuratModal from '@/components/ui/DetailSuratModal.vue';

const suratList = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const selectedSurat = ref(null);
const currentPage = ref(1);
const itemsPerPage = 10;

// Load data from localStorage
const loadSuratData = () => {
  const savedData = localStorage.getItem('pengajuanSurat');
  if (savedData) {
    suratList.value = JSON.parse(savedData);
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

// Filtered and Paginated Data
const filteredSurat = computed(() => {
  if (!searchQuery.value) return suratList.value;
  
  const query = searchQuery.value.toLowerCase();
  return suratList.value.filter(surat => 
    surat.jenisSurat.toLowerCase().includes(query) ||
    surat.noTiket.toLowerCase().includes(query)
  );
});

const totalPages = computed(() => 
  Math.ceil(filteredSurat.value.length / itemsPerPage)
);

const paginatedSurat = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSurat.value.slice(start, end);
});

// Methods
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusClass = (status) => {
  const statusMap = {
    'Belum Dikerjakan': 'status-pending',
    'Sedang Diproses': 'status-processing',
    'Selesai': 'status-done',
    'Ditolak': 'status-rejected'
  };
  return statusMap[status] || 'status-pending';
};

const openDetail = (surat) => {
  selectedSurat.value = surat;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedSurat.value = null;
};

const refreshData = () => {
  loadSuratData();
  currentPage.value = 1;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(() => {
  loadSuratData();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.surat-saya-container {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.header-content p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-refresh:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.3s ease;
  border-left: 4px solid;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.card-total { border-left-color: #3498db; }
.card-pending { border-left-color: #f39c12; }
.card-processing { border-left-color: #9b59b6; }
.card-done { border-left-color: #27ae60; }

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-total .stat-icon {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.card-pending .stat-icon {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.card-processing .stat-icon {
  background: rgba(155, 89, 182, 0.1);
  color: #9b59b6;
}

.card-done .stat-icon {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.stat-icon .material-icons {
  font-size: 32px;
}

.stat-label {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin: 0 0 0.4rem 0;
  font-weight: 600;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

/* Table Section */
.table-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f5f5f5;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  min-width: 300px;
}

.search-box:focus-within {
  border-color: #006400;
  background: white;
}

.search-box .material-icons {
  color: #7f8c8d;
  font-size: 22px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 0.95rem;
  color: #2c3e50;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.surat-table {
  width: 100%;
  border-collapse: collapse;
}

.surat-table thead {
  background: #f8f9fa;
}

.surat-table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 700;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e0e0e0;
}

.surat-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.surat-table tbody tr:hover {
  background: #f8f9fa;
}

.surat-table td {
  padding: 1rem;
  font-size: 0.9rem;
  color: #2c3e50;
}

.tiket-badge {
  background: #e6f7ff;
  color: #0050b3;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.catatan-text {
  max-width: 200px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-detail {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.btn-detail:hover {
  background: linear-gradient(135deg, #004d00, #1a7a1a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
}

.btn-detail .material-icons {
  font-size: 18px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state .material-icons {
  font-size: 80px;
  color: #d0d0d0;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
}

.empty-state p {
  color: #7f8c8d;
  margin: 0 0 2rem 0;
}

.btn-ajukan {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-ajukan:hover {
  background: linear-gradient(135deg, #004d00, #1a7a1a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #2c3e50;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #006400;
  background: #006400;
  color: white;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .btn-refresh {
    width: 100%;
    justify-content: center;
  }

  .table-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: auto;
    width: 100%;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>