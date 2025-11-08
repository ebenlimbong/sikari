<template>
  <aside :class="['sidebar-container', { collapsed: isCollapsed }]">
    <!-- Toggle Button -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      <span class="material-icons">
        {{ isCollapsed ? 'menu' : 'menu_open' }}
      </span>
    </button>

    <div class="sidebar-header">
      <div class="logo-section">
        <span class="material-icons logo-icon">article</span>
        <div class="logo-text" v-show="!isCollapsed">
          <h3 class="app-name">Surat Desa</h3>
          <p class="app-subtitle">Sistem Pengajuan</p>
        </div>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <p class="nav-label" v-show="!isCollapsed">MENU UTAMA</p>
      
      <router-link to="/dashboard" class="nav-item" active-class="is-active">
        <span class="material-icons">dashboard</span>
        <span class="nav-text" v-show="!isCollapsed">Dashboard</span>
      </router-link>
      
      <router-link to="/ajukan-surat" class="nav-item" active-class="is-active">
        <span class="material-icons">note_add</span>
        <span class="nav-text" v-show="!isCollapsed">Ajukan Surat</span>
      </router-link>
      
      <router-link to="/surat-saya" class="nav-item" active-class="is-active">
        <span class="material-icons">email</span>
        <span class="nav-text" v-show="!isCollapsed">Surat Saya</span>
      </router-link>
      
      <router-link to="/profil" class="nav-item" active-class="is-active">
        <span class="material-icons">account_circle</span>
        <span class="nav-text" v-show="!isCollapsed">Profil</span>
      </router-link>
      
      <p class="nav-label" v-show="!isCollapsed" style="margin-top: 2rem;">LAINNYA</p>
      
      <router-link to="/bantuan" class="nav-item" active-class="is-active">
        <span class="material-icons">help_outline</span>
        <span class="nav-text" v-show="!isCollapsed">Bantuan</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button @click="handleLogout" class="btn-logout">
        <span class="material-icons">logout</span>
        <span v-show="!isCollapsed">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLogout = () => {
  localStorage.removeItem('user_token');
  router.push('/login');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.sidebar-container {
  width: 260px;
  background: linear-gradient(180deg, #006400 0%, #004d00 100%);
  color: white;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: width 0.3s ease;
}

.sidebar-container.collapsed {
  width: 70px;
}

/* Toggle Button */
.sidebar-toggle {
  position: absolute;
  top: 1rem;
  right: -15px;
  width: 30px;
  height: 30px;
  background: #006400;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background: #004d00;
  transform: scale(1.1);
}

.sidebar-toggle .material-icons {
  font-size: 18px !important;
  color: white;
}

.sidebar-header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-container.collapsed .logo-section {
  justify-content: center;
}

.logo-icon {
  font-size: 2.5rem !important;
  color: white !important;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0.5rem;
  border-radius: 10px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  flex: 1;
  overflow: hidden;
}

.app-name {
  margin: 0;
  font-size: 1.3rem;
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.app-subtitle {
  margin: 0.2rem 0 0 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  white-space: nowrap;
}

.sidebar-nav {
  flex-grow: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 1.25rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

.nav-item {
  display: flex !important;
  align-items: center;
  padding: 0.85rem 1.25rem;
  margin: 0.2rem 1rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  position: relative;
}

.sidebar-container.collapsed .nav-item {
  justify-content: center;
  padding: 0.85rem 0.5rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.is-active,
.nav-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.95) !important;
  color: #006400 !important;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-item .material-icons {
  margin-right: 12px;
  font-size: 22px !important;
  display: inline-flex !important;
  align-items: center;
  vertical-align: middle;
  flex-shrink: 0;
}

.sidebar-container.collapsed .nav-item .material-icons {
  margin-right: 0;
}

.nav-text {
  flex: 1;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-footer {
  padding: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.sidebar-container.collapsed .btn-logout {
  padding: 0.85rem 0.5rem;
}

.btn-logout:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-logout .material-icons {
  font-size: 20px !important;
  flex-shrink: 0;
}

/* Scrollbar Styling */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar-container {
    width: 70px;
  }
  
  .sidebar-toggle {
    display: none;
  }
  
  .nav-text,
  .logo-text,
  .nav-label {
    display: none !important;
  }
  
  .nav-item {
    justify-content: center;
    padding: 0.85rem 0.5rem;
  }
  
  .nav-item .material-icons {
    margin-right: 0;
  }
}
</style>