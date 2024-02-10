<template>
  <div class="setting-container">
    <h2>Settings</h2>
    <label>Work time </label>
    <input type="number" v-model="workTime" />
    <br>
    <label>break time </label>
    <input type="number" v-model="breakTime" />
    <br>
    <label>Enable sound</label>
    <input type="checkbox" v-model="enableSound" />
</div>
</template>
<style lang="scss" scoped>
.setting-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-family: sans-serif;
  color: #727272;
  height: 100%;
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  input {
    font-size: 1.5rem;
    padding: 0.5rem;
    background-color: #bfbfbf;
  }
  label {
    font-size: 1.5rem;
  }

}
</style>
<script lang="ts" setup>
import { usePomodoroStore } from '@/stores/pomodoro';
import { ref, watch } from 'vue';

// get the store
const pomodoroStore = usePomodoroStore();

// create local state for workTime and breakTime
const workTime = ref(pomodoroStore.workTime);
const breakTime = ref(pomodoroStore.breakTime);
const enableSound = ref(pomodoroStore.enableSound);

watch(() => enableSound.value, (newVal) => {
  pomodoroStore.enableSound = newVal;
});

watch(() => pomodoroStore.enableSound, (newVal) => {
  enableSound.value = newVal;
});

// watch for changes in the store and update the local state
watch(() => pomodoroStore.workTime, (newVal) => {
  workTime.value = newVal;
});

// watch for changes in the local state and update the store
watch(() => workTime.value, (newVal) => {
  pomodoroStore.workTime = newVal;
});

// watch for changes in the store and update the local state
watch(() => pomodoroStore.breakTime, (newVal) => {
  breakTime.value = newVal;
});

// watch for changes in the local state and update the store
watch(() => breakTime.value, (newVal) => {
  pomodoroStore.breakTime = newVal;
});

</script>