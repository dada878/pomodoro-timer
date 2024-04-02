<template>
  <div>
    <div class="container">
      <div class="setting-container">
        <h2>General</h2>
        <FormInput v-model="workTime" name="Work time" />
        <FormInput v-model="breakTime" name="Break time" />
        <FormSwitch v-model="enableSound" name="Enable sound" />
        <FormSwitch v-model="autoStart" name="Auto start" />
        <FormSwitch v-model="showToast" name="Show toast message" />
        <h2>Appearance</h2>
        <FormSwitch v-model="hideButtons" name="Hide reset and skip button" />
        <FormSwitch v-model="hideButtons" name="Dark mode" />
        <h2>Advance</h2>
        <FormSwitch v-model="hideButtons" name="Fast mode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConfig } from '@/stores/config'
import { ref, watch, type Ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import FormSwitch from '@/components/FormSwitch.vue'

// get the store
const pomodoroStore = useConfig()

// create local state for workTime, breakTime, enableSound, and autoStart
const workTime = ref(pomodoroStore.workTime)
const breakTime = ref(pomodoroStore.breakTime)
const enableSound = ref(pomodoroStore.enableSound)
const autoStart = ref(pomodoroStore.autoStart)
const showToast = ref(pomodoroStore.showToast)
const hideButtons = ref(pomodoroStore.hideButtons)

function watchAndSyncState<T>(
  stateRef: Ref<T>,
  storeProperty:
    | 'workTime'
    | 'breakTime'
    | 'enableSound'
    | 'autoStart'
    | 'showToast'
    | 'hideButtons'
) {
  watch(
    () => stateRef.value,
    (newVal) => {
      ;(pomodoroStore[storeProperty] as T) = newVal
    }
  )
  watch(
    () => pomodoroStore[storeProperty],
    (newVal) => {
      stateRef.value = newVal as T
    }
  )
}

watchAndSyncState(workTime, 'workTime')
watchAndSyncState(breakTime, 'breakTime')
watchAndSyncState(enableSound, 'enableSound')
watchAndSyncState(autoStart, 'autoStart')
watchAndSyncState(showToast, 'showToast')
watchAndSyncState(hideButtons, 'hideButtons')
</script>

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
}
</style>
