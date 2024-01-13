<template>
  <button @click="fullScreen" v-show="showFullScreenButton">Fullscreen</button>
  <div class="timer-container">
    <CircleTimer />
  </div>
</template>
<style scoped>
.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import CircleTimer from '../components/CircleTimer.vue'

const showFullScreenButton : Ref<Boolean> = ref(true);

function fullScreen() {
  showFullScreenButton.value = false;
  document.documentElement.requestFullscreen();
}
</script>