<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="id" class="input-label">{{ label }} <span v-if="required">*</span></label>
    <input 
      :id="id"
      :type="type" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      class="base-input"
    >
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style scoped>
.base-input-wrapper {
  margin-bottom: 1rem;
}
.input-label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}
.input-label span {
    color: red;
}
.base-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}
.base-input:focus {
  outline: none;
  border-color: #006400;
  box-shadow: 0 0 0 2px rgba(0, 100, 0, 0.2);
}
</style>