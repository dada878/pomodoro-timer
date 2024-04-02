<template>
  <div @click="handelClick">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 100%;
  width: 100vw;
  opacity: v-bind(darkCover);
}
</style>
<script setup lang="ts">
const props = defineProps({
  darkCover: {
    type: Number,
    required: true
  }
})
function handelClick() {
  if (props.darkCover <= 0) return
  const view = document.getElementById('view')
  view?.scrollTo({
    left: window.innerWidth,
    behavior: 'smooth'
  })
}
</script>
