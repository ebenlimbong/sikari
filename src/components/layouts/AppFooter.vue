<template>
  <footer class="app-footer">
    <div class="footer-content">

      <div class="footer-column about">
        <h3>Tentang Kami</h3>
        <p>Sistem Administrasi Surat Menyurat Desa Karang Sari adalah solusi digital untuk mempermudah pengelolaan surat menyurat di tingkat desa.</p>
        <p class="copyright">© 2025 Sistem Administrasi Surat Menyurat Desa Karang Sari. Semua hak dilindungi.</p>
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
        <p>📞 Telepon: +62 895-3384-03789</p>
        <p>📍 Alamat: Desa Karang Sari, Lampung Selatan</p>
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
  color: white;
  padding: 3rem 10%;
}
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-column h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
.footer-column p, .footer-column li {
  font-size: 0.9rem;
  line-height: 1.6;
}
.footer-column ul {
  list-style: none;
  padding: 0;
}
.footer-column a {
  color: white;
  text-decoration: none;
}
.copyright {
    margin-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1rem;
}
</style>
