import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faForward, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Vue3TouchEvents from "vue3-touch-events";

library.add(faForward, faRotateRight);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(Vue3TouchEvents);
app.use(router);

app.mount('#app');
