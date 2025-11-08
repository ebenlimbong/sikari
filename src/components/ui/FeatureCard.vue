<template>
  <div class="feature-card">
    <div class="icon-wrapper">
      <span class="feature-icon">{{ feature.icon }}</span> 
    </div>
    <h3>{{ feature.title }}</h3>
    <p>{{ feature.description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Definisikan properti yang diterima dari FeaturesSection
const props = defineProps({
  feature: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.feature-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}
.feature-card:hover {
  transform: translateY(-5px);
}
.icon-wrapper {
  margin-bottom: 1rem;
  display: inline-block;
  background-color: #e6f7e6; /* Latar belakang hijau muda untuk ikon */
  border-radius: 50%;
  padding: 0.75rem;
}
.feature-icon {
  color: #006400; /* Ikon warna hijau tua */
  font-size: 1.5rem;
}
h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
p {
  color: #555;
}
</style>