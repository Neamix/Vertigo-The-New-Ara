import { useAuthStore } from "../../../stores/AuthStore";
import { useGlobalStore } from "../../../stores/GlobalStore";

export default async function AuthMiddleware(to,from,$router,next) {
    /** Check if Auth is required */
    if ( to.meta.requiresAuth ) {
        // Add token from local storage if exist
        let token = localStorage.getItem('token');
        useAuthStore().bearer_token = token;

        // Identify the store 
        let authStore   = useAuthStore();
        let globalStore  = useGlobalStore();
        let relevent_user = authStore.user;

        // Check if token exist and valid
        if ( authStore.bearer_token  && ! authStore.user.name && ! authStore.user.email && !authStore.user.company_id) {
            await useAuthStore().me().then((response) => {
                let user = response.data.data.me;
                
                // Fetch user 
                if ( user ) {
                    authStore.user.name  = user.name;
                    authStore.user.email = user.email;
                    authStore.user.status = user.status.id;
                    authStore.user.company_id = user.active_company_id;
                    authStore.user.companies = user.companies;
                }

                setTimeout(() => {
                    globalStore.mainLoader = false;
                }, 1000);
            });

        }

        /** If the user already loaded before */
        if ( ! relevent_user.name ) {
            $router.push({
                name: 'login' 
            })
        }
    }
}