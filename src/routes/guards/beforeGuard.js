// Middleware Import
import AuthMiddleware from './Middlewares/AuthMiddleware';
import RootMiddleware from './Middlewares/RootMiddleware';

let beforeGuard = ($router) => {
    $router.beforeEach(async (to,from,next) => {
        // Middleware: Check if user is Authunticated and redirect to login if not
        await AuthMiddleware(to,from,$router);

        // Middleware: Check if user is rooted user or not and prevent it from access in rooted pages
        await RootMiddleware(to,from,$router);
        next();
    });
}

export default beforeGuard;