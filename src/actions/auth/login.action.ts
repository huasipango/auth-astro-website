import { defineAction } from 'astro:actions';
import { object, z } from 'astro:schema';
import { firebase } from '@/firebase/config';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

export const login = defineAction({
    accept: "form",
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me }, { cookies }) => {

        //Cookies
        if (remember_me) {
            cookies.set("email", email, {
                expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000), // 30 days
                path: "/",
            })
        } else {
            cookies.delete("email", {
                path: "/",
            })
        }

        try {
            // Login con Firebase
            const user = await signInWithEmailAndPassword(firebase.auth, email, password);

            return {
                id: user.user.uid,
                email: user.user.email,
            };

        } catch (error) {
            const firebaseError = error as AuthError;
            console.log("🚀 ~ handler: ~ firebaseError:", firebaseError)

            throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
        }
    }
});