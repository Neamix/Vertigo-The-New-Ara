// Components Importing
import dashboard from '../Pages/Main/Dashboard.vue';
import Members from '../Pages/Main/Members.vue';
import Boards from '../Pages/Main/Tasks/Boards.vue';
import List from '../Pages/Main/Tasks/List.vue';
import Forbidden from '../Pages/Main/Errors/403.vue'

// Master Routes
let master = [
    {
        path: '/',
        component: dashboard,
        name: 'dashboard',
        meta: {requiresAuth: true}
    },
    {
        path: '/members',
        component: Members,
        name: 'members',
        meta: {requiresAuth: true}
    },
    {
        path: 'boards',
        component: Boards,
        meta: {requiresAuth: true},
    },
    {
        path: 'list',
        component: List,
        meta: {requiresAuth: true}
    },
    {
        path: 'forbidden',
        name: "forbidden",
        component: Forbidden,
        meta: {requiresAuth: true}
    },
]

export default master;