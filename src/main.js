import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// axios & pinia
import "./axios";
import { createPinia } from 'pinia';

// Routing
import router from "./routes/index.js";

// Import main index
import './assets/css/index.css';

// Import Locale
import locale from './Helpers/localization/locale';

// Swal
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@assets/js/dropdown.js';
import error_schema from './error_schema';

// Plugins Using
let app = createApp(App);
app.use(router)
app.use(createPinia());
app.use(VueSweetalert2);

// Global axios catch  errors
error_schema();

// Call Globals
app.config.globalProperties.$helper = {
    locale: function localization(word) {
        return locale(word)
    }
}; 

// App Initialization
app.mount('#app');
