
import { defineStore } from 'pinia';
import { watch, ref, onMounted } from 'vue';

export const useConfig = defineStore('config', () => {
  const workTime = ref(30);
  const breakTime = ref(5);
  const enableSound = ref(true);
  const autoStart = ref(true);
  const showToast = ref(true);
  const hideButtons = ref(false);

  const saveToLocalStorage = () => {
    const data = {
      workTime: workTime.value,
      breakTime: breakTime.value,
      enableSound: enableSound.value,
      autoStart: autoStart.value,
      showToast: showToast.value,
      hideButtons: hideButtons.value,
    };
    localStorage.setItem('config', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('config');
    if (data) {
      const parsedData = JSON.parse(data);
      workTime.value = parsedData.workTime || 25;
      breakTime.value = parsedData.breakTime || 5;
      enableSound.value = parsedData.enableSound || true;
      autoStart.value = parsedData.autoStart || false;
      showToast.value = parsedData.showToast || true;
      hideButtons.value = parsedData.hideButtons || false;
    }
  };

  onMounted(() => {
    loadFromLocalStorage();
  });

  watch([workTime, breakTime, enableSound, autoStart, showToast, hideButtons], () => {
    saveToLocalStorage();
  });

  return {
    workTime,
    breakTime,
    saveToLocalStorage,
    loadFromLocalStorage,
    enableSound,
    autoStart,
    showToast,
    hideButtons
  };
});