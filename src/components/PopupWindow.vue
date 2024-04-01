<template>
  <div class="popup">
    <p>{{ content }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  showPopup: Boolean,
  content: String
})

const opacity = ref(0)
const transformY = ref('-50%')
const isShown = ref(props.showPopup)

watch(
  () => props.showPopup,
  (showPopup) => {
    if (showPopup) {
      isShown.value = true
      opacity.value = 1
      transformY.value = '-100%'
      setTimeout(() => {
        isShown.value = false
        opacity.value = 0
        transformY.value = '-50%'
      }, 4000)
    }
  }
)
</script>
<style scoped>
.popup {
  position: fixed;
  top: 88%;
  left: 50%;
  width: 60vw;
  height: 7vh;
  transform: translate(-50%, v-bind(transformY));
  border-radius: 2rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: sans-serif;
  background-color: #323232;
  box-shadow: 0 0 0.3rem #0000004d;
  z-index: 100;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: v-bind(opacity);
}
</style>
