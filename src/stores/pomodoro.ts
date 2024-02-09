import { defineStore } from 'pinia';

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    workTime: 30,  // 初始工作時間，以秒為單位
    breakTime: 5,  // 初始休息時間，以秒為單位
    timerRunning: false, // 計時器是否正在運行
    timeRemaining: 30, // 剩餘時間，以秒為單位，初始為工作時間
    config: {
      // 其他配置選項，如果有的話
    },
  }),
  getters: {
    // 計算剩餘時間的百分比
    timeRemainingPercent(): number {
      return this.timeRemaining / this.workTime * 100;
    },
  },
});