// router/index.js (FINAL VERSI PERBAIKAN)
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/Auth/LoginView.vue' 
import RegisterView from '@/views/Auth/RegisterView.vue'
import WargaDashboard from '@/views/Warga/WargaDashboard.vue'
import SuratSayaView from '@/views/Warga/SuratSayaView.vue'
import ProfilView from '@/views/Warga/ProfilView.vue'
import BantuanView from '@/views/Warga/BantuanView.vue'
import AjjukanSurat from '@/views/Warga/AjjukanSurat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: LoginView, 
      meta: { requiresGuest: true } 
    },
    { 
      path: '/register', 
      name: 'register', 
      component: RegisterView, 
      meta: { requiresGuest: true } 
    },
    
    // --- RUTE DASHBOARD TERPROTEKSI ---
    {
      path: '/dashboard',
      name: 'dashboard',
      component: WargaDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/ajukan-surat',
      name: 'ajukan-surat',
      component: AjjukanSurat,
      meta: { requiresAuth: true }
    },
    {
      path: '/surat-saya',
      name: 'surat-saya',
      component: SuratSayaView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bantuan',
      name: 'bantuan',
      component: BantuanView,
      meta: { requiresAuth: true }
    },
     {
      path: '/ajukan-surat/sktm',
      name: 'sktm-form',
      component: () => import('@/views/Warga/SKTMFormView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

// --- LOGIKA NAVIGATION GUARD YANG DIPERBAIKI (Sesuai Permintaan) ---
router.beforeEach((to, from, next) => {
  // Cek apakah ada token di localStorage (Simulasi Login)
  const isAuthenticated = localStorage.getItem('user_token'); 
  
  // 1. Jika rute membutuhkan otentikasi (requiresAuth: true, seperti Dashboard)
  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      // User sudah login, izinkan akses
      next();
    } else {
      // User belum login, REDIRECT KE HOME ('/') sesuai permintaan
      console.log('⚠️ Akses ditolak: Dialihkan ke halaman Home.');
      next({ name: 'home' }); 
    }
  } 
  
  // 2. Jika rute hanya untuk tamu (requiresGuest: true, seperti Login/Register)
  else if (to.meta.requiresGuest) {
    if (isAuthenticated) {
      // User sudah login, arahkan ke Dashboard
      console.log('✅ Sudah login, dialihkan ke dashboard');
      next({ name: 'dashboard' }); 
    } else {
      // User belum login, izinkan akses login/register
      next();
    }
  }
  
  // 3. Rute publik lainnya
  else {
    next();
  }
});

export default router