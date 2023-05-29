// Components Importing
import dashboard from '../Pages/Main/Dashboard.vue';
import Members from '../Pages/Main/Members.vue';
import Boards from '../Pages/Main/Tasks/Boards.vue';
import List from '../Pages/Main/Tasks/List.vue'

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
        children: [
           
        ],
    },
    {
        path: 'list',
        component: List,
        meta: {requiresAuth: true}
    },
]

export default master;