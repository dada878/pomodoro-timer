import { createRouter, createWebHistory } from 'vue-router'
import PomodoroTimerView from '../views/PomodoroView.vue';
import SettingsView from '../views/SettingsView.vue';
import StopwatchViewVue from '@/views/StopwatchView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PomodoroTimerView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/stopwatch',
      name: 'stopwatch',
      component: StopwatchViewVue
    }
  ]
})

export default router
