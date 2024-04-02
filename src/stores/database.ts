import { defineStore } from 'pinia'
import { ref, onMounted, type Ref } from 'vue';
import { useConfig } from './config';
import { formatDate } from '../utils/date';

interface Database {
  [date: string]: {
    pomodoros: number,
    minutes: number
  }
}

export const useDatabase = defineStore('database', () => {
  const config = useConfig();
  const data : Ref<Database> = ref({});
  const saveToLocalStorage = () => {
    localStorage.setItem('database', JSON.stringify(data.value))
  }
  onMounted(() => {
    const savedData = localStorage.getItem('database')
    if (savedData) {
      data.value = JSON.parse(savedData)
    }
  });
  
  function init(date : string) {
    if (!data.value[date]) {
      data.value[date] = {
        pomodoros: 0,
        minutes: 0
      }
    }
  }
  function addPomodoro() {
    const today = formatDate(new Date());
    init(today);
    data.value[today].pomodoros++;
    data.value[today].minutes += config.workTime;
    saveToLocalStorage();
  }
  function getData(date: string) {
    init(date);
    return data.value[date];
  }
  return {
    addPomodoro,
    getData
  }
})
