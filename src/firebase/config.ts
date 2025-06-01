// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth if needed

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8cG03uSWkaulib7OzGzhGRHcgZUXoKsg",
    authDomain: "astro-authentication-9c585.firebaseapp.com",
    projectId: "astro-authentication-9c585",
    storageBucket: "astro-authentication-9c585.firebasestorage.app",
    messagingSenderId: "714139796947",
    appId: "1:714139796947:web:3def63f7307caf1f161b26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize Firebase Authentication
auth.languageCode = "es"; // Set the language code for authentication

export const firebase = {
    app,
    auth
}