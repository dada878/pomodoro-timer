
import { defineStore } from 'pinia';
import { watch, ref, onMounted } from 'vue';

export const usePomodoroStore = defineStore('pomodoro', () => {
  const workTime = ref(30);
  const breakTime = ref(5);
  const enableSound = ref(true);
  const autoStart = ref(true);
  const showToast = ref(true); // Added showToast configuration option

  const saveToLocalStorage = () => {
    const data = {
      workTime: workTime.value,
      breakTime: breakTime.value,
      enableSound: enableSound.value,
      autoStart: autoStart.value,
      showToast: showToast.value, // Added showToast value to the data object
    };
    localStorage.setItem('pomodoro', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('pomodoro');
    if (data) {
      const parsedData = JSON.parse(data);
      workTime.value = parsedData.workTime || 25;
      breakTime.value = parsedData.breakTime || 5;
      enableSound.value = parsedData.enableSound || true;
      autoStart.value = parsedData.autoStart || false;
      showToast.value = parsedData.showToast || true; // Added showToast value from the parsed data
    }
  };

  onMounted(() => {
    loadFromLocalStorage();
  });

  watch([workTime, breakTime, enableSound, autoStart, showToast], () => {
    saveToLocalStorage();
  });

  return {
    workTime,
    breakTime,
    saveToLocalStorage,
    loadFromLocalStorage,
    enableSound,
    autoStart,
    showToast, // Added showToast to the returned object
  };
});