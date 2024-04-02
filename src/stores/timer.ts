import { defineStore } from 'pinia'
import { useConfig } from './config'
import {ref, type Ref } from 'vue'

const SECONDS_PRE_MINUTE = 60
const FULL_DASH_ARRAY = 283

export const useTimer = defineStore('timer', () => {

  const config = useConfig()

  const timeLimit = ref(config.workTime * SECONDS_PRE_MINUTE)
  const timePassed = ref(-1)
  const timeLeft = ref(config.workTime * SECONDS_PRE_MINUTE)
  const timerInterval: Ref<NodeJS.Timeout | null> = ref(null)
  const isStarted = ref(false)
  const circleDasharray = ref(`${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`)
  const sessionType = ref('work')

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft.value / timeLimit.value
    return rawTimeFraction - (1 / timeLimit.value) * (1 - rawTimeFraction)
  }

  function startTimerInterval() {
    timerInterval.value = setInterval(() => {
      setCircleDasharray()
    }, 1000)
  }

  function pause() {
    isStarted.value = false
    clearInterval(timerInterval.value as NodeJS.Timeout)
  }

  function reset() {
    pause()
    isStarted.value = false
    init()
  }

  function skip() {
    pause()
    isStarted.value = false
    sessionType.value = sessionType.value == 'work' ? 'break' : 'work'
    init()
  }

  function start() {
    if (isStarted.value === false) {
      isStarted.value = true
      startTimerInterval()
    } else {
      isStarted.value = false
      pause()
    }
  }

  function init() {
    timePassed.value = -1
    timeLimit.value =
      sessionType.value === 'work' ? config.workTime * SECONDS_PRE_MINUTE : config.breakTime * SECONDS_PRE_MINUTE
    timeLeft.value = timeLimit.value
    circleDasharray.value = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`
  }

  function setCircleDasharray() {
    timePassed.value = timePassed.value += 1
    timeLeft.value = timeLimit.value - timePassed.value
    circleDasharray.value = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`
  }

  return {
    timeLeft,
    isStarted,
    circleDasharray,
    sessionType,
    pause,
    start,
    reset,
    skip,
    init,
  }
})