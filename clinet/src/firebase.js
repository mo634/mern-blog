// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_API_KEY,
    authDomain: "mern-dashboard-11b20.firebaseapp.com",
    projectId: "mern-dashboard-11b20",
    storageBucket: "mern-dashboard-11b20.appspot.com",
    messagingSenderId: "827079824389",
    appId: "1:827079824389:web:b2cab5e7162f8c4312386c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
