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
        name: 'dashboard'
    },
    {
        path: '/members',
        component: Members,
        name: 'members'
    },
    {
        path: 'boards',
        component: Boards,
        children: [
           
        ],
    },
    {
        path: 'list',
        component: List,
      },
]

export default master;