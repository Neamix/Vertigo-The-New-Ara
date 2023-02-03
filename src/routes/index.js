//Routes creating importing
import { createRouter,createWebHistory } from "vue-router";

// Components importing
import masterLayout from '../components/laytouts/master.vue';

// Routing importing
import masterRoutes from "./master";


//Create Paths
let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: masterLayout,
            children: masterRoutes
        }
    ]
});

export default router;
