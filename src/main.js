import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueSplide from '@splidejs/vue-splide';
// axios & pinia
import "./axios";
import { createPinia } from 'pinia';

// Routing
import router from "./routes/index.js";

// Import main index
import './assets/css/index.css';

let app = createApp(App);
const pinia = createPinia();
// Import Locale
import locale from './Helpers/localization/locale';


// Plugins Using
app.use(router)
app.use(createPinia());
app.use(VueSplide)
app.use(pinia)

// Call Globals
app.config.globalProperties.$helper = {
    locale: function localization(word) {
        return locale(word)
    }
}; 

// App Initialization
app.mount('#app');
