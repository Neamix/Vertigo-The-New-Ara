import { useAuthStore } from "@/stores/AuthStore";

export default async function AuthMiddleware(to,from,$router,next) {
    /** Check if Auth is required */
    if ( to.meta.requiresAuth ) {
        // Add token from local storage if exist
        let token = localStorage.getItem('token');
        useAuthStore().bearer_token = token;

        // Identify the store 
        let authStore   = useAuthStore();
        let relevent_user = authStore.user;

        // Check if token exist and valid
        if ( authStore.bearer_token  && ! authStore.user.name && ! authStore.user.email ) {
            await authStore.fetchUser();
        }

        /** If the user already loaded before */
        if ( ! relevent_user.name ) {
            $router.push({
                name: 'login' 
            })
        }

    }
}