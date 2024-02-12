<template>
    <div>
        <div class="container">
            <div class="sidebar">
                <!-- banner -->
                <div class="sidebar-banner">
                    <h2>beta 0.1.2</h2>
                </div>
                <!-- <div class="sidebar-item" @click="scrollToView()">
                    <RouterLink to="settings">
                        <font-awesome-icon icon="fa-solid fa-tasks" />
                        <p>Tasks</p>
                    </RouterLink>
                </div> -->
                <div class="sidebar-item" @click="scrollToView()">
                    <RouterLink to="/analytics">
                        <font-awesome-icon icon="fa-solid fa-chart-line" />
                        <p>Analytics</p>
                    </RouterLink>
                </div>
                <div class="sidebar-item" @click="scrollToView()">
                    <RouterLink to="/">
                        <font-awesome-icon icon="fa-solid fa-stopwatch" />
                    <p>Pomodoro</p>
                    </RouterLink>
                </div>
                <div class="sidebar-item" @click="scrollToView()">
                    <RouterLink to="settings">
                        <font-awesome-icon icon="fa-solid fa-cog" />
                    <p>Settings</p>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .container {
    height: 100vh;
    width: 220px;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    background-color: rgba(50, 50, 50, 0.808);
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }


    .sidebar-item  {
        width: 100%;
        & > a {
            cursor: default;
            color: #fff;
            text-decoration: none;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: 200ms;
        }
        & > a:active {
            background-color: rgba(255, 255, 255, 0.097);
        }
        background-color: rgba(255, 255, 255, 0.114);
        & + .sidebar-item {
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
    }
  </style>
  
  <script lang="ts" setup>
    import { ref } from 'vue';

    const scrollToView = () => {
        const view = document.getElementById('view');
        view?.scrollTo(
            {
                left: 150,
                behavior: 'smooth',
            }
        );
    };
  </script>