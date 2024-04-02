import { defineStore } from 'pinia'
import { useConfig } from './config'
import {ref, type Ref } from 'vue'
import { formatTime } from '@/utils/time'
import sound from '../assets/sound.wav'
import { useDatabase } from './database'

const SECOND = 60
const FULL_DASH_ARRAY = 283

export const useTimer = defineStore('timer', () => {

  const config = useConfig()
  const database = useDatabase()

  const timeLimit = ref(config.workTime * SECOND)
  const timePassed = ref(-1)
  const timeLeft = ref(config.workTime * SECOND)
  const timerInterval: Ref<NodeJS.Timeout | null> = ref(null)
  const isStarted = ref(false)
  const circleDasharray = ref(`${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`)
  const sessionType = ref('work')

  const isPopupShown = ref(false)
  const popupContent = ref('Time to relax!')

  function showPopup(content: string) {
    isPopupShown.value = true
    popupContent.value = content
    setTimeout(() => {
      isPopupShown.value = false
    }, 4000)
  }

  function pauseTimer() {
    clearInterval(timerInterval.value as NodeJS.Timeout)
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft.value / timeLimit.value
    return rawTimeFraction - (1 / timeLimit.value) * (1 - rawTimeFraction)
  }

  function startTimerInterval() {
    timerInterval.value = setInterval(() => {
      setCircleDasharray()
    }, 1000)
  }

  function resetTimer() {
    pauseTimer()
    isStarted.value = false
    initTimer()
  }

  function nextSession() {
    pauseTimer()
    isStarted.value = false
    sessionType.value = sessionType.value == 'work' ? 'break' : 'work'
    initTimer()
  }

  function startTimer() {
    if (isStarted.value === false) {
      isStarted.value = true
      startTimerInterval()
    } else {
      console.log('pauseTimer')
      isStarted.value = false
      pauseTimer()
    }
  }

  const timerLabel = ref(formatTime(timeLeft.value))

  function initTimer() {
    timePassed.value = -1
    timeLimit.value =
      sessionType.value === 'work' ? config.workTime * SECOND : config.breakTime * SECOND
    timeLeft.value = timeLimit.value
    timerLabel.value = formatTime(timeLeft.value)
    circleDasharray.value = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`
  }

  function playSound() {
    if (!config.enableSound) return
    const audio = new Audio(sound)
    audio.volume = 0.1
    audio.play()
  }

  function setCircleDasharray() {
    console.log('setCircleDasharray')
    timePassed.value = timePassed.value += 1
    timeLeft.value = timeLimit.value - timePassed.value
    timerLabel.value = formatTime(timeLeft.value)
    if (timeLeft.value == 0) {
      pauseTimer()
      isStarted.value = false
      if (sessionType.value == 'work') {
        database.addPomodoro()
      }
      if (sessionType.value === 'work' && config.showToast) showPopup("You've got a pomodoro!")
      else if (config.showToast) showPopup('Time to continue you work!')
      sessionType.value = sessionType.value == 'work' ? 'break' : 'work'
      initTimer()
      playSound()
      if (config.autoStart) startTimer()
    }
    circleDasharray.value = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`
  }

  return {
    timeLimit,
    timePassed,
    timeLeft,
    timerInterval,
    isStarted,
    circleDasharray,
    sessionType,
    isPopupShown,
    popupContent,
    showPopup,
    pauseTimer,
    startTimer,
    resetTimer,
    nextSession,
    timerLabel,
    initTimer,
    playSound,
    setCircleDasharray
  }
})