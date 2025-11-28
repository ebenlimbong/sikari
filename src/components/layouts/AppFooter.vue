<template>
  <footer class="app-footer">
    <div class="footer-content">
      
      <div class="footer-column about">
        <h3>Tentang Kami</h3>
        <p>
          Sistem Administrasi Surat Menyurat Desa Karang Sari adalah solusi digital
          untuk mempermudah pengelolaan surat menyurat di tingkat desa.
        </p>
        <p class="copyright">
          © 2025 Sistem Administrasi Surat Menyurat Desa Karang Sari. Semua hak dilindungi.
        </p>
      </div>

      <div class="footer-column menu-cepat">
        <h3>Menu Cepat</h3>
        <ul>
          <li><router-link to="/">Beranda</router-link></li>
          <li><router-link to="/">Fitur</router-link></li>
          <li><router-link to="/">Cara Kerja</router-link></li>
          <li><router-link to="/login">Masuk</router-link></li>
          <li><router-link to="/register">Daftar</router-link></li>
        </ul>
      </div>

      <div class="footer-column contact">
        <h3>Kontak</h3>
        <p>📧 Email: admin@karangsari.desa.id</p>
        <p>📞 Telepon: 0821-1234-5678</p>
        <p>📍 Alamat: Desa Karang Sari,Lampung selatan</p>
      </div>

    </div>
  </footer>
</template>

<script setup>
// Kosong
</script>

<style scoped>
.app-footer {
  background-color: #006400;
  color: #ffffff;
  padding: 3rem 10%;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

/* Layout grid footer */
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2.25rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Kolom-kolom footer */
.footer-column h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.footer-column p,
.footer-column li {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0.1rem 0;
}

/* List menu cepat */
.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li + li {
  margin-top: 0.4rem;
}

/* Link */
.footer-column a {
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.15s ease;
}

.footer-column a:hover {
  opacity: 0.85;
  transform: translateX(2px);
}

/* Copyright */
.copyright {
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* RESPONSIVE */

/* Tablet */
@media (max-width: 1024px) {
  .app-footer {
    padding: 2.5rem 6%;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .app-footer {
    padding: 2.25rem 1.5rem;
  }

  .footer-content {
    text-align: center;
  }

  .footer-column h3 {
    margin-bottom: 0.75rem;
  }

  .footer-column li + li {
    margin-top: 0.3rem;
  }

  .copyright {
    margin-top: 1.25rem;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .app-footer {
    padding: 2rem 1.25rem;
  }

  .footer-content {
    gap: 1.75rem;
  }
}
</style>
