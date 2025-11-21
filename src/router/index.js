// router/index.js (FINAL VERSI PERBAIKAN)
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import WargaDashboard from '@/views/Warga/WargaDashboard.vue'
import SuratSayaView from '@/views/Warga/SuratSayaView.vue'
import ProfilView from '@/views/Warga/ProfilView.vue'
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
      path: '/ajukan-surat/sktm',
      name: 'sktm-form',
      component: () => import('@/views/Warga/SKTMFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ajukan-surat/domisili',
      name: 'domisili-form',
      component: () => import('@/views/Warga/SKDomisiliFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ajukan-surat/penghasilan',
      name: 'penghasilan-form',
      component: () => import('@/views/Warga/SKPenghasilanFormView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ajukan-surat/usaha',
      name: 'usaha-form',
      component: () => import('@/views/Warga/SKUsahaForm.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ajukan-surat/kelahiran',
      name: 'SKKelahiran',
      component: () => import('@/views/Warga/SKKelahiranForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ajukan-surat/pengantar-dokumen',
      name: 'SKPengantarKKKTPAkta',
      component: () => import('@/views/Warga/SKPengantarKKKTPAktaFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profil',
      name: 'Profil',
      component: () => import('@/views/Warga/ProfilView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profil/edit',
      name: 'profil-edit',
      component: () => import('@/views/Warga/ProfilEditView.vue'),
      meta: { requiresAuth: true }
    },
    // ✅ Benar — nested di dalam AppLayout
    {
      path: '/admin',
      component: () => import('@/components/layouts/AppLayout.vue'), // ✅ Parent layout
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/Admin/AdminDashboard.vue') // ✅ Hanya konten
        }
      ]
    }
  ]
})

const authGuard = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
};

// Di atas router.beforeEach
const adminGuard = (to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (to.meta.requiresAdmin) {
    if (token && user.role === 'ADMIN') {
      next();
    } else {
      console.log('⚠️ Akses admin ditolak');
      next('/dashboard'); // atau next('/') jika ingin redirect ke halaman umum
    }
  } else {
    next();
  }
};

// --- LOGIKA NAVIGATION GUARD YANG BENAR ---
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Rute yang butuh login
  if (to.meta.requiresAuth) {
    if (token) {
      // Cek role admin
      if (to.meta.requiresAdmin && user.role !== 'ADMIN') {
        console.log('❌ User bukan admin');
        next('/dashboard'); // redirect ke dashboard biasa
      } else {
        next();
      }
    } else {
      console.log('⚠️ Akses ditolak: redirect ke /');
      next('/');
    }
  }
  // Rute tamu (login/register): arahkan ke dashboard jika sudah login
  else if (to.meta.requiresGuest) {
    if (token) {
      next({ name: 'dashboard' });
    } else {
      next();
    }
  }
  // Rute publik
  else {
    next();
  }
});



export default router
router.beforeEach(authGuard);
