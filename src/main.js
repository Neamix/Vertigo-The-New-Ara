import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueSplide from '@splidejs/vue-splide';
import { createPinia } from 'pinia';

// Routing
import router from "./routes/index.js";

// Import main index
import './assets/css/index.css';

// Import Locale
import locale from './Helpers/localization/locale';

// Assets js
import $ from "jquery";
import '@/assets/js/dropdown.js';

let app = createApp(App);


// Plugins Using
app.use(router)
app.use(createPinia());
app.use(VueSplide)

// Call Globals
app.config.globalProperties.$helper = {
    locale: function localization(word) {
        return locale(word)
    }
}; 

// App Initialization
app.mount('#app');
