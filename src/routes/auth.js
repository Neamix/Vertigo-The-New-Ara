import Login from '../Pages/Auth/Login.vue';
import Forget from '../Pages/Auth/Passwords/Forget.vue';
import Otp from '../Pages/Auth/Passwords/Otp.vue';
import Reset from '../Pages/Auth/Passwords/Reset.vue';
import Verify from '../Pages/Auth/Passwords/Verify.vue';



// Auth Routes
let authRoutes = [
    {
        path: 'login',
        name: 'login',
        component: Login
    },
    {
        path: 'forget',
        name: 'forget',
        component: Forget
    },
    {
        path: 'otp',
        name: 'otp',
        component: Otp
    },
    {
        path: 'reset',
        name: 'reset',
        component: Reset
    },
    {
        path: 'verify',
        name: 'verify',
        component: Verify
    }
]

export default authRoutes;