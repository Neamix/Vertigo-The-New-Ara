//Routes creating importing
import { createRouter,createWebHistory } from "vue-router";

// Components importing
import masterLayout from '../components/laytouts/master.vue';
import authLayout from '../Pages/Auth/Auth.vue';
import NotFound from '../Pages/Main/Errors/404.vue';
import ServerError from '../Pages/Main/Errors/500.vue';

// Routing importing
import masterRoutes from "./master";
import authRoutes from "./auth";

// Register Component
import registerLayout from '../components/laytouts/register.vue';
import CompanyInfo from '../Pages/Auth/Register/CompanyInfo.vue';
import PersonalInfo from '../Pages/Auth/Register/PersonalInfo.vue';
import Checkout from '../Pages/Auth/Register/Checkout.vue';

// Guards 
import beforeGuard from "./guards/beforeGuard";

//Create Paths
let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: masterLayout,
            children: masterRoutes,
        },
        {
            path: '/auth',
            component: authLayout,
            children: authRoutes
        },
        { 
            path: '/:pathMatch(.*)', 
            name: 'not-found', 
            component: NotFound 
        },
        { 
            path: '/500', 
            name: 'server-error', 
            component: ServerError 
        },
        {
            path: '/register',
            component: registerLayout,
            name: 'register',
            children: [
                {
                    path: '',
                    component: CompanyInfo,
                    name: 'CompanyInfo'
                },
                {
                    path: 'personal',
                    component: PersonalInfo,
                    name: 'PersonalInfo'
                },
                {
                    path: 'checkout',
                    component: Checkout,
                    name: 'Checkout'
                }
            ]
        }
    ]
});

beforeGuard(router)

export default router;
