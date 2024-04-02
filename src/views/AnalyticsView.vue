<template>
  <div>
    <div class="container">
      <div class="analytics">
        <h1>Analytics</h1>
        <p>You've got {{ lastWeedTotalPomodoros }} pomos in last 7 days</p>
        <Bar
          :options="{
            responsive: true,
            backgroundColor: '#4772f9',
            plugins: {
              legend: {
                display: false
              }
            }
          }"
          :data="{
            labels: lastWeekDates,
            datasets: [{ data: lastWeekPomodoros }]
          }"
        />
        <p>You've focused {{ lastWeedTotalMinutes }} minutes in last 7 days</p>
        <Bar
          :options="{
            responsive: true,
            backgroundColor: '#4772f9',
            plugins: {
              legend: {
                display: false
              }
            }
          }"
          :data="{
            labels: lastWeekDates,
            datasets: [{ data: lastWeekMinutes }]
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useDatabase } from '@/stores/database'
import { formatDate } from '@/utils/date';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import { Bar } from 'vue-chartjs'

const lastWeekPomodoros: Ref<Array<number>> = ref([])
const lastWeedTotalPomodoros: Ref<number> = ref(0)

const lastWeekMinutes: Ref<Array<number>> = ref([])
const lastWeedTotalMinutes: Ref<number> = ref(0)

const lastWeekDates: Ref<Array<string>> = ref([])

const database = useDatabase()

for (let i = 6; i >= 0; i--) {
  const date = new Date()
  date.setDate(date.getDate() - i)
  const data = database.getData(formatDate(date))
  lastWeekDates.value.push(formatDate(date).split('-').slice(1).join('/'))
  lastWeekMinutes.value.push(data.minutes)
  lastWeekPomodoros.value.push(data.pomodoros)
  lastWeedTotalPomodoros.value += data.pomodoros
  lastWeedTotalMinutes.value += data.minutes
}
</script>
<style>
.container {
  height: 100vh;
  width: 100vw;
}
.analytics {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0rem 1rem;
  background-color: #1e1e1e;
  color: #fff;
}
</style>
