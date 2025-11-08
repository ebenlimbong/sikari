<template>
  <div class="surat-card" @click="handleClick">
    <div class="card-header">
      <div 
        class="card-icon-wrapper" 
        :style="{ backgroundColor: iconColorBackground }"
      >
        <span class="material-icons card-icon" :style="{ color: iconColor }">
          {{ icon }}
        </span>
      </div>
    </div>
    
    <h3 class="card-title">{{ title }}</h3>
    <p class="description">{{ description }}</p>
    
    <div class="dokumen-wrapper">
      <p class="dokumen-title">Dokumen yang diperlukan:</p>
      <p class="dokumen-list">{{ dokumen }}</p>
    </div>

    <button class="btn-ajukan" @click.stop="handleClick">
      <span class="material-icons">send</span>
      Ajukan Sekarang
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dokumen: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: '#006400'
  }
});

const emit = defineEmits(['click']);

const iconColorBackground = computed(() => {
  const color = props.iconColor || '#006400';
  return color + '20';
});

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.surat-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.75rem;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  min-height: 380px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.surat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #006400, #228B22);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.surat-card:hover {
  box-shadow: 0 8px 20px rgba(0, 100, 0, 0.12);
  transform: translateY(-4px);
  border-color: #006400;
}

.surat-card:hover::before {
  opacity: 1;
}

.card-header {
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: flex-start;
}

.card-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  font-size: 32px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.25rem;
  flex-grow: 1;
  line-height: 1.6;
}

.dokumen-wrapper {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid #006400;
}

.dokumen-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #006400;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dokumen-list {
  font-size: 0.85rem;
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.btn-ajukan {
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, #006400 0%, #228B22 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 100, 0, 0.2);
}

.btn-ajukan:hover {
  background: linear-gradient(135deg, #004d00 0%, #1a7a1a 100%);
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3);
  transform: translateY(-2px);
}

.btn-ajukan .material-icons {
  font-size: 18px !important;
  display: inline-flex !important;
}
</style>