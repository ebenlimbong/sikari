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

// Detect sidebar collapse state (optional, untuk animasi smooth)
const checkSidebarState = () => { 
  const sidebar = document.querySelector('.sidebar-container');
  if (sidebar) {
    sidebarCollapsed.value = sidebar.classList.contains('collapsed');
  }
};

onMounted(() => {
  // Listen for sidebar state changes
  window.addEventListener('resize', checkSidebarState);
  checkSidebarState();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkSidebarState);
});
</script>

<style scoped>
.app-layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.content-wrapper {
  margin-left: 260px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
  transition: margin-left 0.3s ease, width 0.3s ease;
}

.content-wrapper.sidebar-collapsed {
  margin-left: 70px;
  width: calc(100% - 70px);
}

.main-content-area {
  padding: 2rem;
  flex-grow: 1;
  max-width: 100%;
  overflow-x: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 70px;
    width: calc(100% - 70px);
  }
  
  .main-content-area {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .main-content-area {
    padding: 0.75rem;
  }
}
</style>  