//Routes creating importing
import { createRouter,createWebHistory } from "vue-router";

// Components importing
import masterLayout from '../components/laytouts/master.vue';
import authLayout from '../components/laytouts/auth.vue';
import registerLayout from '../components/laytouts/register.vue';
import NotFound from '../Pages/Main/404.vue';

// Register Component
import CompanyInfo from '../Pages/Main/Register/CompanyInfo.vue';
import PersonalInfo from '../Pages/Main/Register/PersonalInfo.vue';
import Checkout from '../Pages/Main/Register/Checkout.vue';

// Routing importing
import masterRoutes from "./master";


//Create Paths
let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: masterLayout,
            children: masterRoutes,
            name: "dashboard"
        },
        {
            path: '/login',
            component: authLayout,
            name: 'login'
        },
        {
            path: '/register',
            component: registerLayout,
            name: 'register',
            children: [
                {
                    path: 'company',
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
        },
        { 
            path: '/:pathMatch(.*)', 
            name: 'not-found', 
            component: NotFound 
        }
    ]
});


export default router;
