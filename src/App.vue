<template>
  <RouterView 
  v-touch:swipe.left="swipeLeft"
  v-touch:swipe.right="swipeRight"
  @dblclick="toggleFullScreen"
  />
</template>
<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();

const pages : Array<string> = [
  'stopwatch',
  '/',
  'settings'
];

let currentPageIndex = 1;

function swipeLeft() {
  if (currentPageIndex < pages.length - 1) {
    currentPageIndex++;
    router.push(pages[currentPageIndex]);
  }
}
function swipeRight() {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    router.push(pages[currentPageIndex]);
  }
}

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
}
</style>