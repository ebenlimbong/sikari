<template>
  <div class="admin-dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Dashboard Admin</h1>
      <p class="page-subtitle">Kelola semua pengajuan surat dari warga.</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-cards">
      <div class="stat-card card-pending">
        <div class="stat-icon">
          <span class="material-icons">schedule</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Belum Dikerjakan</p>
          <h3 class="stat-number">{{ stats.belumDikerjakan }}</h3>
        </div>
      </div>

      <div class="stat-card card-processing">
        <div class="stat-icon">
          <span class="material-icons">hourglass_empty</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Sedang Diproses</p>
          <h3 class="stat-number">{{ stats.sedangDiproses }}</h3>
        </div>
      </div>

      <div class="stat-card card-done">
        <div class="stat-icon">
          <span class="material-icons">check_circle</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">Selesai</p>
          <h3 class="stat-number">{{ stats.selesai }}</h3>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        @click="activeTab = 'belum'"
        :class="{ active: activeTab === 'belum' }"
      >
        Belum Dikerjakan ({{ stats.belumDikerjakan }})
      </button>
      <button
        @click="activeTab = 'sedang'"
        :class="{ active: activeTab === 'sedang' }"
      >
        Sedang Diproses ({{ stats.sedangDiproses }})
      </button>
      <button
        @click="activeTab = 'selesai'"
        :class="{ active: activeTab === 'selesai' }"
      >
        Selesai ({{ stats.selesai }})
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Memuat data surat...</p>
    </div>

    <!-- Table -->
    <div v-else class="table-wrapper">
      <table class="admin-surat-table">
        <thead>
          <tr>
            <th>No</th>
            <th>No. Tiket</th>
            <th>Tgl Pengajuan</th>
            <th>Jenis Surat</th>
            <th>Pemohon</th>
            <th>Status</th>
            <th>Catatan Admin</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(surat, index) in filteredSurat" :key="surat.id">
            <td>{{ index + 1 }}</td>
            <td><span class="tiket-badge">{{ surat.noTiket }}</span></td>
            <td>{{ formatDate(surat.createdAt) }}</td>
            <td>{{ surat.jenisSurat }}</td>
            <td>
              {{ surat.user?.firstName }} {{ surat.user?.lastName }}<br>
              <small>{{ surat.user?.username }}</small>
            </td>
            <td>
              <span :class="['status-badge', getStatusClass(surat.status)]">
                {{ surat.status }}
              </span>
            </td>
            <td>
              <span v-if="surat.catatanAdmin" class="catatan-text">{{ surat.catatanAdmin }}</span>
              <span v-else>-</span>
            </td>
            <td>
              <button @click="openDetailModal(surat)" class="btn-detail">
                <span class="material-icons">visibility</span>
                Detail
              </button>
              <button @click="openEditModal(surat)" class="btn-edit">
                <span class="material-icons">edit</span>
                Ubah
              </button>
              <button @click="deleteSurat(surat.id)" class="btn-delete">
                <span class="material-icons">delete</span>
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="filteredSurat.length === 0">
            <td colspan="8" class="empty-row">Tidak ada surat dalam kategori ini.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <Teleport to="body">
      <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2>Edit Status Surat</h2>
            <button @click="closeEditModal" class="close-btn">
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Status</label>
              <select v-model="editData.status">
                <option value="Belum Dikerjakan">Belum Dikerjakan</option>
                <option value="Sedang Diproses">Sedang Diproses</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div class="form-group">
              <label>Catatan Admin (Opsional)</label>
              <textarea v-model="editData.catatanAdmin" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="closeEditModal" class="btn-cancel">Batal</button>
            <button @click="saveEdit" class="btn-save" :disabled="isSaving">
              <span v-if="!isSaving">Simpan Perubahan</span>
              <span v-else>Sedang menyimpan...</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ✅ Detail Modal (SAMA seperti di user) -->
    <DetailSuratModal
      :isOpen="showDetailModal"
      :surat="selectedSurat"
      @close="closeDetailModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/api';
import DetailSuratModal from '@/components/ui/DetailSuratModal.vue'; // ✅ Import modal

// ✅ Inisialisasi sebagai objek, bukan array
const suratList = ref({
  belumDikerjakan: { count: 0, list: [] },
  sedangDiproses: { count: 0, list: [] },
  selesai: { count: 0, list: [] }
});

const stats = ref({
  belumDikerjakan: 0,
  sedangDiproses: 0,
  selesai: 0
});

const activeTab = ref('belum');
const showEditModal = ref(false);
const showDetailModal = ref(false); // ✅ baru
const editData = ref({
  id: '',
  status: '',
  catatanAdmin: ''
});
const selectedSurat = ref(null); // ✅ baru

const isLoading = ref(false);
const isSaving = ref(false);

onMounted(() => {
  loadSuratList();
});

const loadSuratList = async () => {
  isLoading.value = true;
  try {
    const response = await api.get('/admin/surat');

    if (response.data?.success) {
      suratList.value = {
        belumDikerjakan: {
          count: response.data.belumDikerjakan?.count || 0,
          list: response.data.belumDikerjakan?.list || []
        },
        sedangDiproses: {
          count: response.data.sedangDiproses?.count || 0,
          list: response.data.sedangDiproses?.list || []
        },
        selesai: {
          count: response.data.selesai?.count || 0,
          list: response.data.selesai?.list || []
        }
      };

      stats.value.belumDikerjakan = suratList.value.belumDikerjakan.count;
      stats.value.sedangDiproses = suratList.value.sedangDiproses.count;
      stats.value.selesai = suratList.value.selesai.count;
    } else {
      throw new Error('Respons tidak valid');
    }
  } catch (error) {
    console.error('❌ Gagal memuat daftar surat:', error);
    alert('Gagal memuat data surat. Silakan coba lagi.');
  } finally {
    isLoading.value = false;
  }
};

const filteredSurat = computed(() => {
  switch (activeTab.value) {
    case 'belum': return suratList.value.belumDikerjakan?.list || [];
    case 'sedang': return suratList.value.sedangDiproses?.list || [];
    case 'selesai': return suratList.value.selesai?.list || [];
    default: return [];
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusClass = (status) => {
  const map = {
    'Belum Dikerjakan': 'status-pending',
    'Sedang Diproses': 'status-processing',
    'Selesai': 'status-done'
  };
  return map[status] || 'status-pending';
};

// ✅ Fungsi Detail Baru
const openDetailModal = (surat) => {
  // Siapkan struktur data agar kompatibel dengan DetailSuratModal.vue
  // Masukkan `createdAt` ke `tanggalPengajuan` karena modal user mengharapkan itu
  const suratForModal = {
    ...surat,
    tanggalPengajuan: surat.createdAt // ✅ Penyesuaian utama!
  };
  selectedSurat.value = suratForModal;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedSurat.value = null;
};

// --- Fungsi Edit & Delete (tidak berubah) ---
const openEditModal = (surat) => {
  editData.value.id = surat.id;
  editData.value.status = surat.status;
  editData.value.catatanAdmin = surat.catatanAdmin || '';
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editData.value = { id: '', status: '', catatanAdmin: '' };
};

const saveEdit = async () => {
  isSaving.value = true;
  try {
    await api.put(`/admin/surat/${editData.value.id}`, {
      status: editData.value.status,
      catatanAdmin: editData.value.catatanAdmin
    });

    alert('✅ Status surat berhasil diperbarui!');
    closeEditModal();
    loadSuratList();
  } catch (error) {
    console.error('❌ Gagal memperbarui status:', error);
    alert('Gagal memperbarui status surat. Silakan coba lagi.');
  } finally {
    isSaving.value = false;
  }
};

const deleteSurat = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus surat ini? Tindakan ini tidak bisa dibatalkan.')) return;

  try {
    await api.delete(`/admin/surat/${id}`);
    alert('✅ Surat berhasil dihapus!');
    loadSuratList();
  } catch (error) {
    console.error('❌ Gagal menghapus surat:', error);
    alert('Gagal menghapus surat. Silakan coba lagi.');
  }
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  background: linear-gradient(135deg, #006400, #228B22);
  padding: 1.5rem;
  border-radius: 10px;
  color: white;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.5rem;
  margin: 0;
}

.page-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  background: #e8f5e8;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #006400;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  padding: 0.75rem 1.5rem;
  background: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.tabs button.active {
  background: #006400;
  color: white;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6c757d;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #006400;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.table-wrapper {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.admin-surat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.admin-surat-table th,
.admin-surat-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.admin-surat-table th {
  background: #f8f9fa;
  font-weight: 600;
}

.empty-row {
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.tiket-badge {
  background: #e8f5e8;
  color: #006400;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.status-pending { background: #ffc107; }
.status-processing { background: #17a2b8; }
.status-done { background: #28a745; }

.catatan-text {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-edit {
  background: #ffc107;
  color: #212529;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-edit:hover { background: #e0a800; }

.btn-delete {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-delete:hover { background: #c82333; }

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 450px;
  max-width: 95vw;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.modal-body .form-group {
  margin-bottom: 1.25rem;
}

.modal-body .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.modal-body select,
.modal-body textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
}

.btn-save {
  background: #006400;
  color: white;
}

.btn-save:hover {
  background: #004d00;
}

.btn-save:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

/* ✅ Tambahkan gaya untuk tombol Detail */
.btn-detail {
  background: #17a2b8;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.btn-detail:hover {
  background: #138496;
}

/* ✅ Gaya spinner & loading (copy-paste dari user jika sudah ada) */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6c757d;
}
.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #006400;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ✅ Modal Overlay & Container (jika belum ada di global) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-container {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 500px;
  max-width: 95vw;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
</style>
