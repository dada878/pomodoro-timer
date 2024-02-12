<template>
  <div class="timer-container">
    <div class="timer">
    <PopupWindow :show-popup="isPopupShown" :content="popupContent" />
    <div class="base-timer">
      <svg class="timer" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="timer-circle">
          <circle class="timer-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            :stroke-dasharray="circleDasharray"
            class="timer-remaining arc"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <p class="timer-label">{{ timerLabel }}</p>
      <p class="timer-tip" v-show="isRelaxing">Relaxing</p>
    </div>
    <div class="buttons-section">
      <button
        class="icon-button"
        :class="{ 'button-outline': isStarted }"
        @click="nextSession"
      >
        <font-awesome-icon icon="fa-solid fa-forward" />
      </button>
      <button class="timer-button" :class="{ 'button-outline': isStarted }" @click="startTimer">
        {{ buttonText }}
      </button>
      <button
        class="icon-button"
        :class="{ 'button-outline': isStarted }"
        @click="resetTimer"
      >
        <font-awesome-icon icon="rotate-right" />
      </button>
    </div>
  </div>
  </div>
</template>
<style>

.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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

.timer-circle {
  fill: none;
  stroke: none;
}

.timer-elapsed {
  stroke-width: 3px;
  stroke: #353535;
}

.timer-remaining {
  stroke-width: 3px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all,
              350ms ease-in-out color;
              
  fill-rule: nonzero;
  stroke: currentColor;
}

.timer-remaining.arc {
  color: var(--color-primary);
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
  transition: border-color 350ms,
              color 350ms,
              background-color 350ms;
}

.icon-button {
  border: 1.5px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  outline: none;
  padding: 0.5rem;
  border-radius: 5rem;
  width: 2.3rem;
  height: 2.3rem;
  font-size: 1rem;
  scale: 1.5;
  opacity: v-bind(buttonOpacity);
  transition: opacity 200ms,
              border-color 350ms,
              color 350ms;
  pointer-events: v-bind(buttonPointerEvents);
}
</style>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import sound from '../assets/sound.wav'
import PopupWindow from '../components/PopupWindow.vue';
import { usePomodoroStore } from '@/stores/pomodoro';

const pomodoroStore = usePomodoroStore();

const WORK_TIME = pomodoroStore.workTime;
const BREAK_TIME = pomodoroStore.breakTime;
const SECOND = 60
const FULL_DASH_ARRAY = 283

let timeLimit = WORK_TIME * SECOND
let timePassed = -1
let timeLeft = WORK_TIME * SECOND

const isRelaxing = ref(false)
const isStarted = ref(false)
const buttonText = ref('Start')
const timerColor = ref('#4772f9')
const circleDasharray: Ref<string> = ref(`${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`);
const buttonOpacity = ref(1);
const buttonPointerEvents = ref('auto');

let sessionType = 'work'

function pauseTimer() {
  clearInterval(timerInterval)
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction)
}

let timerInterval: any = null

const isPopupShown = ref(false)
const popupContent = ref('Time to relax!')

function showPopup(content: string) {
  isPopupShown.value = true;
  popupContent.value = content;
  setTimeout(() => {
    isPopupShown.value = false;
  }, 4000)
}

function startTimerInterval() {
  timerInterval = setInterval(() => {
    setCircleDasharray();
  }, 1000)
}

function resetTimer() {
  pauseTimer()
  buttonText.value = 'Start'
  isStarted.value = false
  buttonOpacity.value = 1;
  buttonPointerEvents.value = 'auto';
  initTimer()
}

function nextSession() {
  pauseTimer()
  buttonText.value = 'Start'
  isStarted.value = false
  buttonOpacity.value = 1;
  buttonPointerEvents.value = 'auto';
  sessionType = sessionType == 'work' ? 'break' : 'work'
  initTimer()
}

function startTimer() {
  if (isStarted.value === false) {
    buttonText.value = 'Pause';
    isStarted.value = true;
    buttonOpacity.value = 0.3;
    buttonPointerEvents.value = 'none';
    startTimerInterval();
  } else {
    buttonText.value = 'Start';
    isStarted.value = false;
    buttonOpacity.value = 1;
    buttonPointerEvents.value = 'auto';
    pauseTimer();
  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  let seconds: number | string = time % 60
  if (seconds < 10) seconds = `0${seconds}`
  if (minutes < 10) return `0${minutes}:${seconds}`
  return `${minutes}:${seconds}`
}

const timerLabel = ref(formatTime(timeLeft))

function initTimer() {
  timePassed = -1
  timeLimit = sessionType === 'work' ? WORK_TIME * SECOND : BREAK_TIME * SECOND
  timeLeft = timeLimit
  timerLabel.value = formatTime(timeLeft)
  circleDasharray.value = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`
  isRelaxing.value = sessionType === 'break'
  timerColor.value = sessionType === 'work' ? '#4772f9' : '#f9a847'
}

function playSound() {
  if (!pomodoroStore.enableSound) return;
  const audio = new Audio(sound)
  audio.volume = 0.1
  audio.play()
}

function setCircleDasharray() {
  timePassed = timePassed += 1
  timeLeft = timeLimit - timePassed
  timerLabel.value = formatTime(timeLeft)
  if (timeLeft == 0) {
    pauseTimer()
    buttonText.value = 'Start'
    isStarted.value = false
    if (sessionType === 'work' && pomodoroStore.showToast) showPopup("You've got a pomodoro!")
    else if (pomodoroStore.showToast) showPopup('Time to continue you work!')
    sessionType = sessionType == 'work' ? 'break' : 'work'
    initTimer();
    playSound();
    buttonOpacity.value = 1;
    buttonPointerEvents.value = 'auto';
    if (pomodoroStore.autoStart) startTimer();
  }
  circleDasharray.value = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`
}
</script>
