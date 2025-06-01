import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
const notAuthenticatedRoutes = ["/login", "/register"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({ url, request, locals, redirect }, next) => {

    const isLoggedIn = !!firebase.auth.currentUser; // Check if the user is logged in
    const user = firebase.auth.currentUser;

    locals.isLoggedIn = isLoggedIn;

    if (user) {
        locals.user = {
            avatar: user.photoURL ?? "",
            email: user.email!,
            name: user.displayName!,
            emailVerified: user.emailVerified,
        }
    }
    // Redirección si no está logueado y quiere entrar a una ruta privada
    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
        return redirect("/");
    }
    // Redirección si está logueado y quiere entrar a una ruta para no autenticados
    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
        return redirect("/");
    }
    return next();
});
