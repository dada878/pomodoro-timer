<template>
  <div @dblclick="toggleFullScreen" class="timer-container">
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
import CircleTimer from '../components/CircleTimer.vue'
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
</script>