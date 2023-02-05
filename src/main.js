import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueSplide from '@splidejs/vue-splide';

// Routing
import router from "./routes/index.js";

// Import main index
import './assets/css/index.css';

let app = createApp(App);



// Plugins Using
app.use(router)
app.use(VueSplide)


// App Initialization
app.mount('#app');
