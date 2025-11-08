<template>
  <div class="step-card">
    <div class="step-number">{{ step.number }}</div>
    <h4>{{ step.title }}</h4>
    <p>{{ step.description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  step: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.step-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  min-height: 200px;
}
.step-number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #006400; /* Hijau tua */
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #006400;
  margin-bottom: 0.5rem;
}
p {
  color: #555;
  font-size: 0.95rem;
}
</style>