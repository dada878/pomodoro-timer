<template>
  <div class="timer-container">
    <div class="timer">
      <!-- pomodoro timer -->
      <div class="base-timer">
        <CircleShape :circle-dasharray="circleDasharray" :color="timerColor" />
        <p class="timer-label">{{ timerLabel }}</p>
        <p class="timer-tip" v-show="sessionType === 'break'">Relaxing</p>
      </div>
      <!-- control penal -->
      <div class="buttons-section">
        <ActionButton :disabled="isStarted" @click="timer.skip()" v-show="!config.hideButtons">
          <font-awesome-icon icon="fa-solid fa-forward" />
        </ActionButton>
        <button
          class="timer-button"
          :class="{ 'button-outline': isStarted }"
          @click="timer.start()"
        >
          {{ isStarted ? 'Pause' : 'Start' }}
        </button>
        <ActionButton :disabled="isStarted" @click="timer.reset()" v-show="!config.hideButtons">
          <font-awesome-icon icon="fa-solid fa-rotate-right" />
        </ActionButton>
      </div>
      <!-- popup window -->
      <PopupWindow :show-popup="isPopupShown" :content="popupContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import PopupWindow from '../components/layout/PopupWindow.vue'
import CircleShape from '../components/pomodoro/CircleShape.vue'
import ActionButton from '../components/pomodoro/ActionButton.vue'
import { useConfig } from '@/stores/config'
import { useDatabase } from '@/stores/database'
import sound from '../assets/sound.wav'
import { useTimer } from '@/stores/timer'
import { formatTime } from '@/utils/time'

function getSessionColor(sessionType: string) {
  return sessionType === 'work' ? '#4772f9' : '#f9a847'
}

const timer = useTimer()
const database = useDatabase()
const config = useConfig()

const sessionType = ref(timer.sessionType)
const timerColor = ref(getSessionColor(timer.sessionType))
const timerLabel = ref(formatTime(timer.timeLeft))
const circleDasharray = ref(timer.circleDasharray)
const isStarted = ref(timer.isStarted)
const isPopupShown = ref(false)
const popupContent = ref('')

function showPopup(content: string) {
  isPopupShown.value = true
  popupContent.value = content
  setTimeout(() => {
    isPopupShown.value = false
  }, 4000)
}

function playSound() {
  const audio = new Audio(sound)
  audio.volume = 0.1
  audio.play()
}

// init timer when component is mounted because we it's need to access local storage
onMounted(() => {
  timer.init()
})

// sync isStarted with timer.isStarted
watch(
  () => timer.isStarted,
  () => {
    isStarted.value = timer.isStarted
  }
)

// sync timeLeft with timer.timeLeft and check if the timer is finished
watch(
  () => timer.timeLeft,
  () => {
    if (timer.timeLeft === 0) {
      timer.pause()
      if (sessionType.value == 'work') {
        database.addPomodoro()
      }
      if (sessionType.value === 'work' && config.showToast) showPopup("You've got a pomodoro!")
      else if (config.showToast) showPopup('Time to continue you work!')
      timer.skip()
      if (config.enableSound) playSound()
      if (config.autoStart) timer.start()
    }
    timerLabel.value = formatTime(timer.timeLeft)
    circleDasharray.value = timer.circleDasharray
  }
)

// sync sessionType with timer.sessionType
watch(
  () => timer.sessionType,
  () => {
    sessionType.value = timer.sessionType
    timerColor.value = getSessionColor(timer.sessionType)
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
