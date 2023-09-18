// Components Importing
import dashboard from '../Pages/Main/Dashboard.vue';
import Members from '../Pages/Main/Members.vue';
import Boards from '../Pages/Main/Tasks/Boards.vue';
import List from '../Pages/Main/Tasks/List.vue';
import Projects from '../Pages/Main/Projects/Project.vue';
import ProjectCreate from '../Pages/Main/Projects/Create.vue';
import ProjectSingle from '../Pages/Main/Projects/Single.vue';
import Forbidden from '../Pages/Main/Errors/403.vue'

// Master Routes
let master = [
    {
        path: '/',
        component: dashboard,
        name: 'dashboard',
        meta: {requiresAuth: true,mustBeRoot: true}
    },
    {
        path: '/members',
        component: Members,
        name: 'members',
        meta: {requiresAuth: true}
    },
    {
        path: '/members',
        name: 'boards',
        meta: {requiresAuth: true}
    },
    {
        path: 'list',
        component: List,
        meta: {requiresAuth: true}
    },
    {
        path: 'projects',
        meta: {requiresAuth: true},
        children: [
            {
                path: '',
                name: 'projects',
                component: Projects,
            },
            {
                path: 'create',
                component: ProjectCreate,
                name: 'project_create',
            },
            {
                path: ':slug',
                component: ProjectSingle,
                name: 'project_single',
            }
        ]
    },
    {
        path: 'forbidden',
        name: "forbidden",
        component: Forbidden,
        meta: {requiresAuth: true}
    },
]

export default master;