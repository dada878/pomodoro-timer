<template>
  <button class="icon-button" :class="{ 'button-outline': isStarted }">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isStarted: Boolean,
  disabled: Boolean
})

const opacity = ref(1);
const pointerEvents = ref('auto');

watch(() => props.disabled, (value) => {
  opacity.value = value ? 0.3 : 1;
  pointerEvents.value = value ? 'none' : 'auto';
})

</script>
<style scoped>
.icon-button {
  border: 1.5px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  outline: none;
  padding: 0.5rem;
  border-radius: 5rem;
  width: 2.3rem;
  height: 2.3rem;
  font-size: 1rem;
  scale: 1.5;
  opacity: v-bind(opacity);
  transition:
    opacity 200ms,
    border-color 350ms,
    color 350ms;
  pointer-events: v-bind(pointerEvents);
}
</style>