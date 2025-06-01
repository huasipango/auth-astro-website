import { registerUser, logout, login, loginWithGoogle } from "./auth";

export const server = {
    //Auth
    registerUser,
    //Login
    login,
    //Logout
    logout,
    //login Google
    loginWithGoogle,
}