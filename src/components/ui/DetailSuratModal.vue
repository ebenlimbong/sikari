<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="material-icons">description</span>
            Detail Pengajuan Surat
          </h2>
          <button @click="closeModal" class="close-btn">
            <span class="material-icons">close</span>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- Info Pengajuan -->
          <div class="info-section">
            <div class="info-header">
              <span class="material-icons">info</span>
              <h3>Informasi Pengajuan</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>No. Tiket</label>
                <p>{{ surat.noTiket }}</p>
              </div>
              <div class="info-item">
                <label>Jenis Surat</label>
                <p>{{ surat.jenisSurat }}</p>
              </div>
              <div class="info-item">
                <label>Tanggal Pengajuan</label>
                <p>{{ formatDate(surat.createdAt) }}</p>
              </div>
              <div class="info-item">
                <label>Status</label>
                <span :class="['status-badge', getStatusClass(surat.status)]">
                  {{ surat.status }}
                </span>
              </div>
              <div class="info-item">
                <label>Metode Pengambilan</label>
                <p>{{ surat.data?.metodePengambilan === 'online' ? 'Online (Download)' : 'Offline (Ambil di Kantor)' }}</p>
              </div>
              <div class="info-item" v-if="surat.waktuSelesai">
                <label>Waktu Selesai</label>
                <p>{{ formatDate(surat.waktuSelesai) }}</p>
              </div>
            </div>
          </div>

          <!-- Catatan Admin -->
          <div class="info-section" v-if="surat.catatanAdmin">
            <div class="info-header">
              <span class="material-icons">note</span>
              <h3>Catatan dari Admin</h3>
            </div>
            <div class="catatan-box">
              <p>{{ surat.catatanAdmin }}</p>
            </div>
          </div>

          <!-- Data Pemohon -->
          <div class="info-section">
            <div class="info-header">
              <span class="material-icons">person</span>
              <h3>Data Pemohon</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Nama Lengkap</label>
                <p>{{ surat.data?.namaLengkap || '-' }}</p>
              </div>
              <div class="info-item">
                <label>NIK</label>
                <p>{{ surat.data?.nik || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Tempat, Tanggal Lahir</label>
                <p>{{ surat.data?.tempatLahir || '-' }}, {{ formatDate(surat.data?.tanggalLahir) }}</p>
              </div>
              <div class="info-item">
                <label>Jenis Kelamin</label>
                <p>{{ surat.data?.jenisKelamin || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Agama</label>
                <p>{{ surat.data?.agama || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Pekerjaan</label>
                <p>{{ surat.data?.pekerjaan || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Nomor Ponsel</label>
                <p>{{ surat.data?.nomorPonsel ? '+62' + surat.data.nomorPonsel : '-' }}</p>
              </div>
              <div class="info-item" v-if="surat.data?.kewarganegaraan">
                <label>Kewarganegaraan</label>
                <p>{{ surat.data.kewarganegaraan }}</p>
              </div>
            </div>
          </div>

          <!-- ========== SKTM ========== -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Tidak Mampu'">
            <div class="info-header">
              <span class="material-icons">assignment</span>
              <h3>Informasi Tambahan</h3>
            </div>
            <div class="info-grid">
              <div class="info-item full-width">
                <label>Alamat KTP</label>
                <p>{{ surat.data?.alamatKTP || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Digunakan Untuk</label>
                <p>{{ surat.data?.digunakan || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- ========== SK DOMISILI ========== -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Domisili'">
            <div class="info-header">
              <span class="material-icons">home</span>
              <h3>Data Alamat Domisili</h3>
            </div>
            <div class="info-grid">
              <div class="info-item full-width">
                <label>Alamat Domisili</label>
                <p>{{ surat.data?.alamatDomisili || '-' }}</p>
              </div>
              <div class="info-item">
                <label>RT / RW</label>
                <p>{{ surat.data?.rt }} / {{ surat.data?.rw }}</p>
              </div>
              <div class="info-item">
                <label>Desa/Kelurahan</label>
                <p>{{ surat.data?.desa || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Kecamatan</label>
                <p>{{ surat.data?.kecamatan || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Kabupaten/Kota</label>
                <p>{{ surat.data?.kabupaten || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Provinsi</label>
                <p>{{ surat.data?.provinsi || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Kode Pos</label>
                <p>{{ surat.data?.kodePos || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Lama Tinggal</label>
                <p>{{ surat.data?.lamaTinggal || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Status Tempat Tinggal</label>
                <p>{{ surat.data?.statusTempatTinggal || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Tujuan Pembuatan</label>
                <p>{{ surat.data?.tujuanPembuatan || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- ========== SK PENGHASILAN ========== -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Penghasilan'">
            <div class="info-header">
              <span class="material-icons">attach_money</span>
              <h3>Data Pekerjaan & Penghasilan</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Bidang Pekerjaan</label>
                <p>{{ surat.data?.bidangPekerjaan || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Nama Perusahaan</label>
                <p>{{ surat.data?.namaPerusahaan || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Alamat Perusahaan</label>
                <p>{{ surat.data?.alamatPerusahaan || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Penghasilan Per Bulan</label>
                <p>Rp {{ surat.data?.penghasilanPerBulan || '0' }}</p>
              </div>
              <div class="info-item">
                <label>Lama Bekerja</label>
                <p>{{ surat.data?.lamaBekerja || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Sumber Penghasilan</label>
                <p>{{ surat.data?.sumberPenghasilan || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Tujuan Pembuatan</label>
                <p>{{ surat.data?.tujuanPembuatan || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- ========== SK USAHA ========== -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Usaha'">
            <div class="info-header">
              <span class="material-icons">store</span>
              <h3>Data Usaha</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Nama Usaha</label>
                <p>{{ surat.data?.namaUsaha || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Jenis Usaha</label>
                <p>{{ surat.data?.jenisUsaha || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Bidang Usaha</label>
                <p>{{ surat.data?.bidangUsaha || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Modal Usaha</label>
                <p>Rp {{ surat.data?.modalUsaha || '0' }}</p>
              </div>
              <div class="info-item">
                <label>Jumlah Karyawan</label>
                <p>{{ surat.data?.jumlahKaryawan || '0' }} Orang</p>
              </div>
              <div class="info-item">
                <label>Tanggal Mulai Usaha</label>
                <p>{{ formatDate(surat.data?.tanggalMulaiUsaha) }}</p>
              </div>
              <div class="info-item">
                <label>Status Tempat Usaha</label>
                <p>{{ surat.data?.statusTempat || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Alamat Lokasi Usaha</label>
                <p>{{ surat.data?.alamatUsaha || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Deskripsi Usaha</label>
                <p>{{ surat.data?.deskripsiUsaha || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Tujuan Pembuatan</label>
                <p>{{ surat.data?.tujuanPembuatan || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- ========== SK KELAHIRAN ========== -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Kelahiran'">
            <div class="info-header">
              <span class="material-icons">child_care</span>
              <h3>Data Anak & Orang Tua</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Nama Anak</label>
                <p>{{ surat.data?.namaAnak || '(Belum diberi nama)' }}</p>
              </div>
              <div class="info-item">
                <label>Jenis Kelamin Anak</label>
                <p>{{ surat.data?.jenisKelaminAnak || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Tempat Lahir</label>
                <p>{{ surat.data?.tempatLahir || '-' }}</p>
              </div>
              <div class="info-item">
                <label>Tanggal & Jam Lahir</label>
                <p>{{ formatDate(surat.data?.tanggalLahir) }} {{ surat.data?.jamLahir ? 'pukul ' + surat.data.jamLahir : '' }}</p>
              </div>
              <div class="info-item">
                <label>Berat / Tinggi Badan</label>
                <p>{{ surat.data?.beratBadan || '-' }} kg / {{ surat.data?.tinggiBadan || '-' }} cm</p>
              </div>
              <div class="info-item full-width">
                <label>Alamat Lahir</label>
                <p>{{ surat.data?.alamatLahir || '-' }}</p>
              </div>
              <div class="info-item full-width">
                <label>Nama Ayah</label>
                <p>{{ surat.data?.namaAyah || '-' }} (NIK: {{ surat.data?.nikAyah || '-' }})</p>
              </div>
              <div class="info-item full-width">
                <label>Nama Ibu</label>
                <p>{{ surat.data?.namaIbu || '-' }} (NIK: {{ surat.data?.nikIbu || '-' }})</p>
              </div>
            </div>
          </div>

          <!-- ========== SK PENGANTAR KK/KTP/AKTA ========== -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Pengantar KK, KTP, dan Akta Lahir'">
            <div class="info-header">
              <span class="material-icons">badge</span>
              <h3>Dokumen yang Diajukan</h3>
            </div>
            <div class="info-grid">
              <div class="info-item full-width">
                <label>Jenis Dokumen</label>
                <p>
                  <span v-if="surat.data?.jenisDokumen?.kk">✅ KK</span>
                  <span v-if="surat.data?.jenisDokumen?.ktp" class="ml-2">✅ KTP</span>
                  <span v-if="surat.data?.jenisDokumen?.aktaKelahiran" class="ml-2">✅ Akta Kelahiran</span>
                </p>
              </div>
            </div>
          </div>

          <!-- ========== DOKUMEN YANG DIUNGGAH ========== -->
          <div class="info-section" v-if="surat.data?.files && Object.keys(surat.data.files).length">
            <div class="info-header">
              <span class="material-icons">attach_file</span>
              <h3>Dokumen yang Diunggah</h3>
            </div>
            <div class="file-list">
              <div v-for="(file, key) in surat.data.files" :key="key" class="file-item">
                <span class="material-icons file-icon">insert_drive_file</span>
                <div class="file-info">
                  <span class="file-label">{{ getFileLabel(key) }}</span>
                  <span class="file-name">{{ file?.name || 'File tidak tersedia' }}</span>
                </div>
                <div class="file-actions" v-if="file?.path">
                  <button @click="previewFile(file)" class="btn-preview">
                    <span class="material-icons">visibility</span>
                    Lihat
                  </button>
                  <a :href="getFileUrl(file.path)" target="_blank" download class="btn-download-file">
                    <span class="material-icons">download</span>
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button @click="closeModal" class="btn-close">
            <span class="material-icons">close</span>
            Tutup
          </button>
          <button v-if="surat.status === 'Selesai'" @click="downloadSurat" class="btn-download">
            <span class="material-icons">download</span>
            Download Surat
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- PREVIEW MODAL -->
  <Teleport to="body">
    <div v-if="showPreview" class="preview-overlay" @click="closePreview">
      <div class="preview-container" @click.stop>
        <div class="preview-header">
          <h3>{{ previewFileName }}</h3>
          <button @click="closePreview" class="close-preview-btn">
            <span class="material-icons">close</span>
          </button>
        </div>
        <div class="preview-body">
          <img v-if="previewType === 'image'" :src="previewUrl" class="preview-image" alt="Preview"/>
          <iframe v-else-if="previewType === 'pdf'" :src="previewUrl" class="preview-pdf"></iframe>
          <div v-else class="preview-unsupported">
            <span class="material-icons">description</span>
            <p>Preview tidak tersedia.</p>
            <p>Silakan download untuk melihat file.</p>
          </div>
        </div>
        <div class="preview-footer">
          <a :href="previewUrl" target="_blank" download class="btn-download-preview">
            <span class="material-icons">download</span>
            Download File
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  surat: { type: Object, required: true }
});

const emit = defineEmits(['close', 'edit']);

const closeModal = () => emit('close');

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
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

const getFileLabel = (key) => {
  const labels = {
    ktp: 'KTP',
    ktpAyah: 'KTP Ayah',
    ktpIbu: 'KTP Ibu',
    ktpPemohon: 'KTP Pemohon',
    kk: 'Kartu Keluarga',
    pengantarRT: 'Pengantar RT/RW',
    buktiRumah: 'Bukti Kepemilikan/Sewa Rumah',
    suratKelahiran: 'Surat Keterangan Kelahiran',
    bukuNikah: 'Buku Nikah',
    dokumenTambahan: 'Dokumen Tambahan'
  };
  return labels[key] || key;
};

const getFileUrl = (filepath) => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${baseURL}/uploads/${filepath}`;
};

const showPreview = ref(false);
const previewUrl = ref('');
const previewType = ref('');
const previewFileName = ref('');

const isImage = (name) => /\.(jpg|jpeg|png)$/i.test(name);
const isPDF = (name) => /\.pdf$/i.test(name);

const previewFile = (file) => {
  if (!file?.path || !file?.name) return;

  previewUrl.value = getFileUrl(file.path);
  previewFileName.value = file.name;

  if (isPDF(file.name)) previewType.value = 'pdf';
  else if (isImage(file.name)) previewType.value = 'image';
  else previewType.value = 'unknown';

  showPreview.value = true;
};

const closePreview = () => (showPreview.value = false);

const downloadSurat = () => {
  alert('Fitur download surat selesai akan tersedia setelah integrasi backend.');
};
</script>

<style scoped>
/* Keep all existing styles from previous version */
/* Just add this for ml-2 spacing */
.ml-2 {
  margin-left: 0.5rem;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* ------------------------------
    PREVIEW OVERLAY
------------------------------- */
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.preview-container {
  background: white;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #006400;
  color: white;
}

.preview-body {
  padding: 1rem;
  overflow: auto;
  flex: 1;
  background: #f5f5f5;
}

.preview-image {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  margin: auto;
  border-radius: 8px;
}

.preview-pdf {
  width: 100%;
  height: 70vh;
  border: none;
}

.preview-unsupported {
  text-align: center;
  padding: 2rem;
  color: #555;
}

.preview-footer {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  background: white;
}

.btn-download-preview {
  display: flex;
  align-items: center;
  gap: .5rem;
  background: #28a745;
  color: white;
  padding: .75rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
}

/* ------------------------------
    FILE ACTION BUTTONS
------------------------------- */
.file-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-preview,
.btn-download-file {
  display: flex;
  align-items: center;
  gap: .3rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: .85rem;
  font-weight: 500;
  border: none;
  text-decoration: none;
}

.btn-preview {
  background: #17a2b8;
  color: white;
}

.btn-preview:hover {
  background: #138496;
}

.btn-download-file {
  background: #28a745;
  color: white;
}

.btn-download-file:hover {
  background: #1e7e34;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

/* Modal Container */
.modal-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-title .material-icons {
  font-size: 28px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: white;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.close-btn .material-icons {
  font-size: 24px;
}

/* Modal Body - SCROLLABLE */
.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  background: #f8f9fa;
}

/* Custom Scrollbar */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #006400;
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #004d00;
}

/* Info Section */
.info-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-section:last-child {
  margin-bottom: 0;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e0e0e0;
}

.info-header .material-icons {
  font-size: 28px;
  color: #006400;
}

.info-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item p {
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.5;
}

/* Status Badge */
.status-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.status-pending {
  background: #ffc107;
}

.status-processing {
  background: #17a2b8;
}

.status-done {
  background: #28a745;
}

.status-rejected {
  background: #dc3545;
}

/* Catatan Box */
.catatan-box {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 1rem;
  border-radius: 6px;
}

.catatan-box p {
  margin: 0;
  color: #856404;
  line-height: 1.6;
}

/* File List */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-item:hover {
  background: #e9ecef;
  border-color: #006400;
}

.file-icon {
  font-size: 32px !important;
  color: #006400;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
}

.file-name {
  font-size: 0.95rem;
  color: #2c3e50;
  word-break: break-word;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.btn-close,
.btn-download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-close {
  background: #6c757d;
  color: white;
}

.btn-close:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.btn-download {
  background: #28a745;
  color: white;
}

.btn-download:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.btn-close .material-icons,
.btn-download .material-icons {
  font-size: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .info-section {
    padding: 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    padding: 1rem;
    flex-direction: column;
  }

  .btn-close,
  .btn-download {
    width: 100%;
    justify-content: center;
  }
}
</style>
