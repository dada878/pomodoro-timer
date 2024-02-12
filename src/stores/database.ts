import { defineStore } from 'pinia'
import { watch, ref, onMounted, type Ref } from 'vue';
import { useConfig } from './config';


interface Database {
  [date: string]: {
    pomodoros: number,
    minutes: number
  }
}

function formatDate(date: Date) : string {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
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
