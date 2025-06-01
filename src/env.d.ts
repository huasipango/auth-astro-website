/// <reference types="astro/client" />

interface User {
    email: string;
    name: string;
    avatar: string;
    emailVerified: boolean;
}


declare namespace App {
    interface Locals {
        /** Indica si el usuario está logueado */
        isLoggedIn: boolean;
        user: User | null;
    }
}