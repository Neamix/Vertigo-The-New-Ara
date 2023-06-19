import { useAuthStore } from "../../stores/AuthStore";
import { useGlobalStore } from "../../stores/GlobalStore";
import AuthMiddleware from './Middlewares/AuthMiddleware';

let beforeGuard = ($router) => {
    $router.beforeEach(async (to,from,next) => {
        // Middleware: Check if user is Authunticated and redirect to login if not
        await AuthMiddleware(to,from,$router);
        next();
    });
}

export default beforeGuard;