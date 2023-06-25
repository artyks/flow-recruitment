import { createApp } from 'vue';
import App from './App.vue';
import { router } from './common/router';

createApp(App).use(router).mount('#app');
