import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Routing
import router from "./routes/index.js";

// Import main index
import './assets/css/index.css';

let app = createApp(App);



// Plugins Using
app.use(router)


// App Initialization
app.mount('#app');
