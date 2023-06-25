import { createApp } from 'vue';
import App from './App.vue';
import { router } from './common/router';

/**
 * Configure app
 */
createApp(App).use(router).mount('#app');
