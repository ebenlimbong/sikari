<template>
  <div class="app-layout-container">
    <AppSidebar />
    
    <main class="content-wrapper" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="main-content-area">
        <router-view /> 
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AppSidebar from '@/components/layouts/AppSidebar.vue';

const sidebarCollapsed = ref(false);

// Cek state sidebar (berbasis class, supaya sinkron sama komponen sidebar)
const checkSidebarState = () => { 
  const sidebar = document.querySelector('.sidebar-container');
  if (sidebar) {
    sidebarCollapsed.value = sidebar.classList.contains('collapsed');
  }
};

onMounted(() => {
  window.addEventListener('resize', checkSidebarState);
  checkSidebarState();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkSidebarState);
});
</script>

<style scoped>
/* Layout utama */
.app-layout-container {
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle at top left, #eef3ff 0, #f5f7fa 40%, #edf1f7 100%);
  color: #1f2933;
}

/* Wrapper konten utama (kanan) */
.content-wrapper {
  margin-left: 260px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
  transition:
    margin-left 0.3s ease,
    width 0.3s ease,
    transform 0.25s ease;
  padding: 1.5rem 1.75rem;
  box-sizing: border-box;
}

/* Saat sidebar collapse */
.content-wrapper.sidebar-collapsed {
  margin-left: 70px;
  width: calc(100% - 70px);
}

/* Area isi utama */
.main-content-area {
  flex-grow: 1;
  max-width: 100%;
  overflow-x: hidden;
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow:
    0 14px 30px rgba(15, 23, 42, 0.06),
    0 2px 6px rgba(15, 23, 42, 0.03);
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Scroll behavior yang lebih halus */
.main-content-area {
  scroll-behavior: smooth;
}

/* Responsive breakpoint tablet */
@media (max-width: 1024px) {
  .content-wrapper {
    margin-left: 70px;
    width: calc(100% - 70px);
    padding: 1.25rem;
  }

  .main-content-area {
    padding: 1.5rem 1.5rem;
    border-radius: 16px;
  }
}

/* Responsive breakpoint mobile */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
  }

  .content-wrapper.sidebar-collapsed {
    margin-left: 0;
    width: 100%;
  }

  .main-content-area {
    padding: 1.25rem 1rem;
    border-radius: 14px;
    box-shadow:
      0 10px 24px rgba(15, 23, 42, 0.05),
      0 1px 4px rgba(15, 23, 42, 0.04);
  }
}

/* Extra small devices */
@media (max-width: 480px) {
  .content-wrapper {
    padding: 0.75rem;
  }

  .main-content-area {
    padding: 0.9rem 0.85rem;
    border-radius: 12px;
  }
}
</style>
