  <template>
      <div class="dashboard-container">
        <!-- Welcome Header -->
        <div class="welcome-header">
          <h1 class="dashboard-title">Dashboard</h1>
          <p class="dashboard-subtitle">Kelola pengajuan surat Anda dengan mudah dan cepat</p>
        </div>

        <!-- Statistics Cards - 4 Kartu -->
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
                <h3 class="stat-number">5</h3>
                <span class="stat-percentage">100%</span>
              </div>
              <div class="stat-progress">
                <div class="progress-fill blue" style="width: 100%"></div>
              </div>
            </div>

            <!-- Card 2: Sedang Diproses -->
            <div class="stat-card card-orange">
              <div class="stat-icon">
                <span class="material-icons">schedule</span>
              </div>
              <div class="stat-info">
                <p class="stat-label">Sedang Diproses</p>
                <h3 class="stat-number">3</h3>
                <span class="stat-percentage">60%</span>
              </div>
              <div class="stat-progress">
                <div class="progress-fill orange" style="width: 60%"></div>
              </div>
            </div>

            <!-- Card 3: Menunggu Proses -->
            <div class="stat-card card-gray">
              <div class="stat-icon">
                <span class="material-icons">hourglass_empty</span>
              </div>
              <div class="stat-info">
                <p class="stat-label">Menunggu Proses</p>
                <h3 class="stat-number">0</h3>
                <span class="stat-percentage">0%</span>
              </div>
              <div class="stat-progress">
                <div class="progress-fill gray" style="width: 0%"></div>
              </div>
            </div>

            <!-- Card 4: Selesai -->
            <div class="stat-card card-green">
              <div class="stat-icon">
                <span class="material-icons">check_circle</span>
              </div>
              <div class="stat-info">
                <p class="stat-label">Selesai</p>
                <h3 class="stat-number">2</h3>
                <span class="stat-percentage">40%</span>
              </div>
              <div class="stat-progress">
                <div class="progress-fill green" style="width: 40%"></div>
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
      </div>
  </template>

  <script setup>
  import { useRouter } from 'vue-router';
  import AppLayout from '@/components/layouts/AppLayout.vue';

  const router = useRouter();

  const goToAjukanSurat = () => {
    router.push('/ajukan-surat');
  };
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
    margin-bottom: 2rem;
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
  }
  </style>