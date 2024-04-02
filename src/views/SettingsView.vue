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
import FormInput from '@/components/settings/FormInput.vue'
import FormSwitch from '@/components/settings/FormSwitch.vue'

const config = useConfig()
const workTime = ref(config.workTime)
const breakTime = ref(config.breakTime)
const enableSound = ref(config.enableSound)
const autoStart = ref(config.autoStart)
const showToast = ref(config.showToast)
const hideButtons = ref(config.hideButtons)

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
      ;(config[storeProperty] as T) = newVal
    }
  )
  watch(
    () => config[storeProperty],
    (newVal) => {
      stateRef.value = newVal as T
    }
  )
}

// watch all the input states and sync with the store
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
