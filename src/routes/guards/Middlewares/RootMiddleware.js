import { useAuthStore } from "@/stores/AuthStore";

export default async function AuthMiddleware(to,from,$router,next) {
    let AuthStore  = useAuthStore();
    let isRootUser = AuthStore.user.is_rooted;

    if ( to.meta.mustBeRoot && ! isRootUser) {
        $router.push({
            name: 'members' 
        })
    } 
}