import { createRouter, createWebHistory } from 'vue-router'
import PomodoroTimerView from '../views/PomodoroView.vue';
import SettingsView from '../views/SettingsView.vue';
import AnalyticsViewVue from '@/views/AnalyticsView.vue';

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
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsViewVue
    }
  ]
})

export default router;
