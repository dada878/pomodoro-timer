<template>
  <p>Settings</p>
  <input type="number" v-model="workTime" />
</template>
<script lang="ts">
import { usePomodoroStore } from '@/stores/pomodoro';
import { ref } from 'vue';

const pomodoroStore = usePomodoroStore();

const workTime = defineModel('workTime');

</script>