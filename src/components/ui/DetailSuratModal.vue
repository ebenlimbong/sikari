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
                <p>{{ formatDate(surat.tanggalPengajuan) }}</p>
              </div>
              <div class="info-item">
                <label>Status</label>
                <span :class="['status-badge', getStatusClass(surat.status)]">
                  {{ surat.status }}
                </span>
              </div>
              <div class="info-item">
                <label>Metode Pengambilan</label>
                <p>{{ surat.data.metodePengambilan === 'online' ? 'Online (Download)' : 'Offline (Ambil di Kantor)' }}</p>
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
                <p>{{ surat.data.namaLengkap }}</p>
              </div>
              <div class="info-item">
                <label>NIK</label>
                <p>{{ surat.data.nik }}</p>
              </div>
              <div class="info-item">
                <label>Tempat, Tanggal Lahir</label>
                <p>{{ surat.data.tempatLahir }}, {{ formatDate(surat.data.tanggalLahir) }}</p>
              </div>
              <div class="info-item">
                <label>Jenis Kelamin</label>
                <p>{{ surat.data.jenisKelamin }}</p>
              </div>
              <div class="info-item">
                <label>Agama</label>
                <p>{{ surat.data.agama }}</p>
              </div>
              <div class="info-item">
                <label>Pekerjaan</label>
                <p>{{ surat.data.pekerjaan }}</p>
              </div>
              <div class="info-item">
                <label>Nomor Ponsel</label>
                <p>+62{{ surat.data.nomorPonsel }}</p>
              </div>
              <div class="info-item" v-if="surat.data.kewarganegaraan">
                <label>Kewarganegaraan</label>
                <p>{{ surat.data.kewarganegaraan }}</p>
              </div>
            </div>
          </div>

          <!-- Data Khusus Berdasarkan Jenis Surat -->
          <!-- SKTM -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Tidak Mampu'">
            <div class="info-header">
              <span class="material-icons">assignment</span>
              <h3>Informasi Tambahan</h3>
            </div>
            <div class="info-grid">
              <div class="info-item full-width">
                <label>Alamat KTP</label>
                <p>{{ surat.data.alamatKTP }}</p>
              </div>
              <div class="info-item">
                <label>Digunakan Untuk</label>
                <p>{{ surat.data.digunakan }}</p>
              </div>
            </div>
          </div>

          <!-- Domisili -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Domisili'">
            <div class="info-header">
              <span class="material-icons">home</span>
              <h3>Data Alamat Domisili</h3>
            </div>
            <div class="info-grid">
              <div class="info-item full-width">
                <label>Alamat Lengkap</label>
                <p>{{ surat.data.alamatDomisili }}</p>
              </div>
              <div class="info-item">
                <label>RT / RW</label>
                <p>{{ surat.data.rt }} / {{ surat.data.rw }}</p>
              </div>
              <div class="info-item">
                <label>Desa/Kelurahan</label>
                <p>{{ surat.data.desa }}</p>
              </div>
              <div class="info-item">
                <label>Kecamatan</label>
                <p>{{ surat.data.kecamatan }}</p>
              </div>
              <div class="info-item">
                <label>Kabupaten/Kota</label>
                <p>{{ surat.data.kabupaten }}</p>
              </div>
              <div class="info-item">
                <label>Provinsi</label>
                <p>{{ surat.data.provinsi }}</p>
              </div>
              <div class="info-item" v-if="surat.data.kodePos">
                <label>Kode Pos</label>
                <p>{{ surat.data.kodePos }}</p>
              </div>
              <div class="info-item">
                <label>Lama Tinggal</label>
                <p>{{ surat.data.lamaTinggal }}</p>
              </div>
              <div class="info-item">
                <label>Status Tempat Tinggal</label>
                <p>{{ surat.data.statusTempatTinggal }}</p>
              </div>
              <div class="info-item">
                <label>Tujuan Pembuatan</label>
                <p>{{ surat.data.tujuanPembuatan }}</p>
              </div>
            </div>
          </div>

          <!-- Penghasilan -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Penghasilan'">
            <div class="info-header">
              <span class="material-icons">attach_money</span>
              <h3>Data Pekerjaan & Penghasilan</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Pekerjaan/Jabatan</label>
                <p>{{ surat.data.pekerjaan }}</p>
              </div>
              <div class="info-item">
                <label>Bidang Pekerjaan</label>
                <p>{{ surat.data.bidangPekerjaan }}</p>
              </div>
              <div class="info-item" v-if="surat.data.namaPerusahaan">
                <label>Nama Perusahaan</label>
                <p>{{ surat.data.namaPerusahaan }}</p>
              </div>
              <div class="info-item" v-if="surat.data.alamatPerusahaan">
                <label>Alamat Perusahaan</label>
                <p>{{ surat.data.alamatPerusahaan }}</p>
              </div>
              <div class="info-item">
                <label>Penghasilan Per Bulan</label>
                <p>Rp {{ surat.data.penghasilanPerBulan }}</p>
              </div>
              <div class="info-item">
                <label>Lama Bekerja</label>
                <p>{{ surat.data.lamaBekerja }}</p>
              </div>
              <div class="info-item full-width">
                <label>Sumber Penghasilan</label>
                <p>{{ surat.data.sumberPenghasilan }}</p>
              </div>
              <div class="info-item full-width">
                <label>Tujuan Pembuatan</label>
                <p>{{ surat.data.tujuanPembuatan }}</p>
              </div>
            </div>
          </div>

          <!-- Usaha -->
          <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Usaha'">
            <div class="info-header">
              <span class="material-icons">store</span>
              <h3>Data Usaha</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Nama Usaha</label>
                <p>{{ surat.data.namaUsaha }}</p>
              </div>
              <div class="info-item">
                <label>Jenis Usaha</label>
                <p>{{ surat.data.jenisUsaha }}</p>
              </div>
              <div class="info-item full-width">
                <label>Bidang Usaha</label>
                <p>{{ surat.data.bidangUsaha }}</p>
              </div>
              <div class="info-item">
                <label>Modal Usaha</label>
                <p>Rp {{ surat.data.modalUsaha }}</p>
              </div>
              <div class="info-item">
                <label>Jumlah Karyawan</label>
                <p>{{ surat.data.jumlahKaryawan }} Orang</p>
              </div>
              <div class="info-item">
                <label>Tanggal Mulai Usaha</label>
                <p>{{ formatDate(surat.data.tanggalMulaiUsaha) }}</p>
              </div>
              <div class="info-item">
                <label>Status Tempat Usaha</label>
                <p>{{ surat.data.statusTempat }}</p>
              </div>
              <div class="info-item full-width">
                <label>Alamat Lokasi Usaha</label>
                <p>{{ surat.data.alamatUsaha }}</p>
              </div>
              <div class="info-item full-width">
                <label>Deskripsi Usaha</label>
                <p>{{ surat.data.deskripsiUsaha }}</p>
              </div>
              <div class="info-item full-width">
                <label>Tujuan Pembuatan</label>
                <p>{{ surat.data.tujuanPembuatan }}</p>
              </div>
            </div>
          </div>

          <!-- Kelahiran  -->
            <div class="info-section" v-if="surat.jenisSurat === 'Surat Keterangan Kelahiran'">
              <div class="info-header">
                <span class="material-icons">child_care</span>
                <h3>Data Anak</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <label>Nama Anak</label>
                  <p>{{ surat.data.namaAnak || '(Belum diberi nama)' }}</p>
                </div>
                <div class="info-item">
                  <label>Jenis Kelamin</label>
                  <p>{{ surat.data.jenisKelaminAnak }}</p>
                </div>
                <div class="info-item">
                  <label>Tanggal & Jam Lahir</label>
                  <p>
                    {{ formatDate(surat.data.tanggalLahir) }}
                    {{ surat.data.jamLahir ? `pukul ${surat.data.jamLahir}` : '' }}
                  </p>
                </div>
                <div class="info-item">
                  <label>Tempat Lahir</label>
                  <p>{{ surat.data.tempatLahir }}</p>
                </div>
                <div class="info-item">
                  <label>Berat / Tinggi</label>
                  <p>
                    {{ surat.data.beratBadan }} kg /
                    {{ surat.data.tinggiBadan }} cm
                  </p>
                </div>
                <div class="info-item full-width">
                  <label>Alamat Lahir</label>
                  <p>{{ surat.data.alamatLahir }}</p>
                </div>
                <div class="info-item full-width">
                  <label>Nama Ayah</label>
                  <p>{{ surat.data.namaAyah }}</p>
                </div>
                <div class="info-item full-width">
                  <label>Nama Ibu</label>
                  <p>{{ surat.data.namaIbu }}</p>
                </div>
              </div>
            </div>

            <!-- Pengantar KK/KTP/Akta -->
            <div class="info-section" v-if="surat.jenisSurat === 'Surat Pengantar KK, KTP, dan Akta Lahir'">
              <div class="info-header">
                <span class="material-icons">badge</span>
                <h3>Dokumen yang Diajukan</h3>
              </div>
              <div class="info-grid">
                <div class="info-item full-width">
                  <label>Jenis Dokumen</label>
                  <p>
                    <span v-if="surat.data.jenisDokumen.kk">✅ KK</span>
                    <span v-if="surat.data.jenisDokumen.ktp" class="ml-2">✅ KTP</span>
                    <span v-if="surat.data.jenisDokumen.aktaKelahiran" class="ml-2">✅ Akta Kelahiran</span>
                  </p>
                </div>

                <!-- KK -->
                <div v-if="surat.data.jenisDokumen.kk && surat.data.dataTambahan.kk.alasan" class="info-item full-width">
                  <label>KK: Alasan</label>
                  <p>{{ surat.data.dataTambahan.kk.alasan }}</p>
                </div>
                <div v-if="surat.data.jenisDokumen.kk && surat.data.dataTambahan.kk.namaAnggotaBaru" class="info-item full-width">
                  <label>KK: Nama Anggota Baru</label>
                  <p>{{ surat.data.dataTambahan.kk.namaAnggotaBaru }}</p>
                </div>

                <!-- KTP -->
                <div v-if="surat.data.jenisDokumen.ktp && surat.data.dataTambahan.ktp.alasan" class="info-item full-width">
                  <label>KTP: Alasan</label>
                  <p>{{ surat.data.dataTambahan.ktp.alasan }}</p>
                </div>

                <!-- Akta -->
                <div v-if="surat.data.jenisDokumen.aktaKelahiran" class="info-item full-width">
                  <label>Akta: Nama Anak</label>
                  <p>{{ surat.data.dataTambahan.aktaKelahiran.namaAnak }}</p>
                </div>
                <div v-if="surat.data.jenisDokumen.aktaKelahiran" class="info-grid">
                  <div class="info-item">
                    <label>Tanggal Lahir Anak</label>
                    <p>{{ formatDate(surat.data.dataTambahan.aktaKelahiran.tanggalLahir) }}</p>
                  </div>
                  <div class="info-item">
                    <label>Nama Ayah</label>
                    <p>{{ surat.data.dataTambahan.aktaKelahiran.namaAyah }}</p>
                  </div>
                  <div class="info-item">
                    <label>NIK Ayah</label>
                    <p>{{ surat.data.dataTambahan.aktaKelahiran.nikAyah }}</p>
                  </div>
                  <div class="info-item">
                    <label>Nama Ibu</label>
                    <p>{{ surat.data.dataTambahan.aktaKelahiran.namaIbu }}</p>
                  </div>
                  <div class="info-item">
                    <label>NIK Ibu</label>
                    <p>{{ surat.data.dataTambahan.aktaKelahiran.nikIbu }}</p>
                  </div>
                </div>
              </div>
            </div>

          <!-- Dokumen yang Diunggah -->
          <div class="info-section">
            <div class="info-header">
              <span class="material-icons">attach_file</span>
              <h3>Dokumen yang Diunggah</h3>
            </div>
            <div class="file-list">
              <div v-for="(file, key) in surat.data.files" :key="key" class="file-item">
                <span class="material-icons">insert_drive_file</span>
                <span class="file-name">{{ getFileLabel(key) }}: {{ file?.name || 'File tidak tersedia' }}</span>
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
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  surat: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
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

const getFileLabel = (key) => {
  const labels = {
    ktp: 'KTP',
    kk: 'Kartu Keluarga',
    pengantarRT: 'Pengantar RT/RW',
    buktiRumah: 'Bukti Kepemilikan/Sewa Rumah'
  };
  return labels[key] || key;
};

const downloadSurat = () => {
  alert('Fitur download akan tersedia setelah integrasi backend.');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.modal-title .material-icons {
  font-size: 28px;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.info-section {
  margin-bottom: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
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
  color: #006400;
  font-size: 24px;
}

.info-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item p {
  font-size: 0.95rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 500;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
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

.catatan-box {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #006400;
}

.catatan-box p {
  margin: 0;
  color: #2c3e50;
  line-height: 1.6;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.file-item .material-icons {
  color: #006400;
  font-size: 24px;
}

.file-name {
  color: #2c3e50;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 2px solid #e0e0e0;
  background: #f8f9fa;
}

.btn-close,
.btn-download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-close {
  background: #e0e0e0;
  color: #666;
}

.btn-close:hover {
  background: #d0d0d0;
}

.btn-download {
  background: linear-gradient(135deg, #006400, #228B22);
  color: white;
}

.btn-download:hover {
  background: linear-gradient(135deg, #004d00, #1a7a1a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
}

.btn-close .material-icons,
.btn-download .material-icons {
  font-size: 20px;
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

/* Scrollbar */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #006400;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #004d00;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .modal-footer {
    flex-direction: column;
    padding: 1.25rem 1.5rem;
  }

  .btn-close,
  .btn-download {
    width: 100%;
    justify-content: center;
  }
}

.ml-2 { margin-left: 0.5rem; }
</style>
