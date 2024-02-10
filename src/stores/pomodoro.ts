import { defineStore } from 'pinia';
import { watch, ref, onMounted } from 'vue';

export const usePomodoroStore = defineStore('pomodoro', () => {
  const workTime = ref(30);
  const breakTime = ref(5);
  const enableSound = ref(true);

  const saveToLocalStorage = () => {
    const data = {
      workTime: workTime.value,
      breakTime: breakTime.value,
      enableSound: enableSound.value,
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
    }
  };

  onMounted(() => {
    loadFromLocalStorage();
  });

  watch([workTime, breakTime, enableSound], () => {
    saveToLocalStorage();
  });

  return {
    workTime,
    breakTime,
    saveToLocalStorage,
    loadFromLocalStorage,
    enableSound,
  };
});