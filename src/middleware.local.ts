import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/protected"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({ url, request }, next) => {

    const authHeaders = request.headers.get("authorization") ?? "";
    console.log("🚀 ~ onRequest ~ authHeaders:", authHeaders)

    if (privateRoutes.includes(url.pathname)) {
        return checkLocalAuth(authHeaders, next);

    }
    return next();
});


const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
    if (authHeaders) {
        const authValue = authHeaders.split(" ").at(-1) ?? "user:password";
        console.log("🚀 ~ checkLocalAuth ~ authValue:", authValue)
        const decodedValue = atob(authValue).split(":");
        console.log("🚀 ~ checkLocalAuth ~ decodedValue:", decodedValue)
        const [username, password] = decodedValue;

        if (username === "admin" && password === "admin1") {
            return next();
        }
    }

    return new Response("Auth necesaria", {
        status: 401,
        headers: {
            "WWW-Authenticate": `Basic realm="Secure Area"`,
        },
    });
}