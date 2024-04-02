<template>
  <div class="input-container">
    <label>{{ name }}</label>
    <input
      type="number"
      :min="1"
      :max="60 * 24"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['modelValue', 'name'])
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
}

input[type='number'] {
  padding: 0.5rem;
  background-color: #5e5e5eba;
  color: white;
  border-radius: 4px;
  border: none;
  width: 3rem;
}

label {
  color: white;
  flex: 1;
}
</style>
