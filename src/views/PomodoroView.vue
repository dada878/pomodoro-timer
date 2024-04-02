<template>
  <div>
    <div class="timer-container">
      <div class="timer">
        <PopupWindow :show-popup="isPopupShown" :content="popupContent" />
        <div class="base-timer">
          <CircleShape :circle-dasharray="circleDasharray" :color="timerColor" />
          <p class="timer-label">{{ timerLabel }}</p>
          <p class="timer-tip" v-show="sessionType === 'break'">Relaxing</p>
        </div>
        <div class="buttons-section">
          <ActionButton
            :disabled="isStarted"
            @click="timer.nextSession()"
            v-show="!config.hideButtons"
          >
            <font-awesome-icon icon="fa-solid fa-forward" />
          </ActionButton>
          <button
            class="timer-button"
            :class="{ 'button-outline': isStarted }"
            @click="timer.startTimer()"
          >
            {{ isStarted ? 'Pause' : 'Start' }}
          </button>
          <ActionButton
            :disabled="isStarted"
            @click="timer.resetTimer()"
            v-show="!config.hideButtons"
          >
            <font-awesome-icon icon="fa-solid fa-rotate-right" />
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import PopupWindow from '../components/layout/PopupWindow.vue'
import CircleShape from '../components/pomodoro/CircleShape.vue'
import ActionButton from '../components/pomodoro/ActionButton.vue'
import { useConfig } from '@/stores/config'
import { useTimer } from '@/stores/timer'

const timer = useTimer()
const config = useConfig()

const sessionType = ref(timer.sessionType)
const timerColor = ref(timer.sessionType === "work" ? '#4772f9' : '#f9a847')

const timerLabel = ref(timer.timerLabel)
const circleDasharray = ref(timer.circleDasharray)
const isStarted = ref(timer.isStarted)
const isPopupShown = ref(timer.isPopupShown)
const popupContent = ref(timer.popupContent)

onMounted(() => {
  timer.initTimer()
})

watch(
  () => timer.circleDasharray,
  () => {
    circleDasharray.value = timer.circleDasharray
  }
)

watch(
  () => timer.timerLabel,
  () => {
    timerLabel.value = timer.timerLabel
  }
)

watch(
  () => timer.isStarted,
  () => {
    isStarted.value = timer.isStarted
  }
)


watch(
  () => timer.sessionType,
  () => {
    sessionType.value = timer.sessionType
    timerColor.value = sessionType.value === 'work' ? '#4772f9' : '#f9a847'
  }
)
defineProps({
  darkCover: {
    type: Number
  }
})
</script>

<style scoped>
.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: v-bind(darkCover);
}

.timer {
  width: 90vw;
  --color-primary: v-bind(timerColor);
}

.buttons-section {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
}

.button-outline {
  background-color: transparent !important;
  color: var(--color-primary);
}

.base-timer {
  position: relative;
}

.timer-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 3rem;
}

.timer-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #727272;
  margin-top: 3rem;
  font-size: 1rem;
  font-family: sans-serif;
}

.timer-button {
  border: 2px solid var(--color-primary);
  background-color: var(--color-primary);
  color: white;
  outline: none;
  padding: 1rem;
  border-radius: 5rem;
  width: 9rem;
  font-size: 1rem;
  transition:
    border-color 350ms,
    color 350ms,
    background-color 350ms;
}
</style>
