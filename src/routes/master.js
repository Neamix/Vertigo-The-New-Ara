// Components Importing
import dashboard from '../Pages/Main/Dashboard.vue';
import Members from '../Pages/Main/Members.vue';

// Master Routes
let master = [
    {
        path: '/',
        component: dashboard,
        name: 'dashboard'
    },
    {
        path: '/members',
        component: Members,
        name: 'members'
    }
]

export default master;