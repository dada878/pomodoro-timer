<template>
  <div class="home" id="view" @dblclick="toggleFullScreen">
    <MobileSidebar />
    <RouterContainer :dark-cover="darkCover" />
  </div>
</template>
<script setup lang="ts">
import MobileSidebar from './components/MobileSidebar.vue';

import { onMounted, ref } from 'vue';
import RouterContainer from './components/RouterContainer.vue';

const darkCover = ref(1);

onMounted(() => {
  const view = document.getElementById('view');
  view?.scrollTo(window.innerWidth, 0);
  view?.addEventListener('scroll', (e) => {
    const scrollX = (e.target as HTMLDivElement).scrollLeft;
    const sidebarWidth = window.innerWidth * 0.6;
    if (scrollX < sidebarWidth) {
      darkCover.value = (scrollX / sidebarWidth) * 0.8 + 0.2;
    }
  });
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
</script>
<style>
body {
  color: #fff;
  background-color: #1E1E1E;
}

body, html, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow-y: hidden;
  scroll-snap-points-x: repeat(100vw);
}

@media screen and (min-width: 500px){
  #app {
    & > * {
      display: none;
    }
    &::after {
      content: "Sorry, this app is not available on desktop. Please use a mobile device.";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      text-align: center;
    } 
  }
}

::-webkit-scrollbar {
  display: none;
}

.home {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  scroll-snap-type: x mandatory;	
	display: flex;
	-webkit-overflow-scrolling: touch;
  & > div {
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
    position: relative;
  }
}
</style>