<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="id" class="input-label">{{ label }} <span v-if="required">*</span></label>
    <div class="input-with-icon" :class="{ 'has-icon': togglePassword }">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        :required="required"
        :maxlength="maxlength"
        class="base-input"
      >
      <!-- password visibility toggle -->
      <button v-if="togglePassword" type="button" class="pwd-toggle" @click="toggleVisibility" :aria-label="visible ? 'Sembunyikan password' : 'Tampilkan password'">
        <span class="material-icons">{{ visible ? 'visibility_off' : 'visibility' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  maxlength: {
    type: [String, Number],
    default: undefined
  },
  // jika true, komponen akan menampilkan tombol mata untuk toggle visibility
  togglePassword: {
    type: Boolean,
    default: false
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

const visible = ref(false);
const inputType = computed(() => {
  if (props.togglePassword) return visible.value ? 'text' : 'password';
  return props.type;
});

function toggleVisibility() {
  visible.value = !visible.value;
}

function onInput(e) {
  // Emit raw value
  let val = e.target.value;
  // Emit update
  // Keep same behavior as before
  // If maxlength provided, browser already limits, but ensure value not longer than maxlength
  if (props.maxlength) {
    const max = Number(props.maxlength);
    if (!Number.isNaN(max)) {
      val = String(val).slice(0, max);
    }
  }
  // If togglePassword for numeric values (like NIK), don't modify here; parent should sanitize if needed
  // Emit value
  emit('update:modelValue', val);
}
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

/* styles for password toggle */
.input-with-icon {
  position: relative;
}
.input-with-icon.has-icon .base-input {
  padding-right: 3.2rem;
}
.pwd-toggle {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}
.pwd-toggle .material-icons {
  font-size: 1.15rem;
  color: #666;
}

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
