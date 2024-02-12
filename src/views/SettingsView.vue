<template>
  <div>
    <div class="container">
      <div class="setting-container">
        <h2>General</h2>
        <div class="input-container">
          <label>Work time</label>
          <input type="number" :max="24 * 60" :min="1" v-model="workTime" />
        </div>
        <div class="input-container">
          <label>Break time</label>
          <input type="number" :max="24 * 60" :min="1" v-model="breakTime" />
        </div>
        <div class="input-container">
          <label>Enable sound</label>
          <div>
            <label class="switch">
              <input type="checkbox" v-model="enableSound" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="input-container">
          <label>Auto start</label>
          <div>
            <label class="switch">
              <input type="checkbox" v-model="autoStart" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="input-container">
          <label>Show toast message</label>
          <div>
            <label class="switch">
              <input type="checkbox" v-model="showToast" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <h2>Appearance</h2>
        <div class="input-container">
          <label>Dark mode</label>
          <div>
            <label class="switch">
              <input type="checkbox" v-model="hideButtons" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="input-container">
          <label>Hide reset and skip button</label>
          <div>
            <label class="switch">
              <input type="checkbox" v-model="hideButtons" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <h2>Advance</h2>
        <div class="input-container">
          <label>Fast mode</label>
          <div>
            <label class="switch">
              <input type="checkbox" v-model="hideButtons" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.setting-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  color: white;
  padding: 0rem 2rem;

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

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 2rem;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #58585b;
    transition: 200ms;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: calc(2rem * 0.7);
    width: calc(2rem * 0.7);
    left: calc(2rem * 0.2);
    bottom: calc(2rem * 0.15);
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #4772f9;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #4772f9;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}
</style>

<script lang="ts" setup>
import { useConfig } from '@/stores/config'
import { ref, watch } from 'vue'

// get the store
const pomodoroStore = useConfig()

// create local state for workTime, breakTime, enableSound, and autoStart
const workTime = ref(pomodoroStore.workTime)
const breakTime = ref(pomodoroStore.breakTime)
const enableSound = ref(pomodoroStore.enableSound)
const autoStart = ref(pomodoroStore.autoStart)
const showToast = ref(pomodoroStore.showToast)
const hideButtons = ref(pomodoroStore.hideButtons)

watch(
  () => hideButtons.value,
  (newVal) => {
    pomodoroStore.hideButtons = newVal
  }
)

watch(
  () => pomodoroStore.hideButtons,
  (newVal) => {
    hideButtons.value = newVal
  }
)

watch(
  () => showToast.value,
  (newVal) => {
    pomodoroStore.showToast = newVal
  }
)

watch(
  () => pomodoroStore.showToast,
  (newVal) => {
    showToast.value = newVal
  }
)

watch(
  () => enableSound.value,
  (newVal) => {
    pomodoroStore.enableSound = newVal
  }
)

watch(
  () => pomodoroStore.enableSound,
  (newVal) => {
    enableSound.value = newVal
  }
)

watch(
  () => autoStart.value,
  (newVal) => {
    pomodoroStore.autoStart = newVal
  }
)

watch(
  () => pomodoroStore.autoStart,
  (newVal) => {
    autoStart.value = newVal
  }
)

// watch for changes in the store and update the local state
watch(
  () => pomodoroStore.workTime,
  (newVal) => {
    workTime.value = newVal
  }
)

// watch for changes in the local state and update the store
watch(
  () => workTime.value,
  (newVal) => {
    pomodoroStore.workTime = newVal
  }
)

// watch for changes in the store and update the local state
watch(
  () => pomodoroStore.breakTime,
  (newVal) => {
    breakTime.value = newVal
  }
)

// watch for changes in the local state and update the store
watch(
  () => breakTime.value,
  (newVal) => {
    pomodoroStore.breakTime = newVal
  }
)
</script>
4772f9
@/stores/config