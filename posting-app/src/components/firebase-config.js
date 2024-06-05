// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCgq-9vrldQ8ee4nVOtWA1uuAF19hKVyxc",
    authDomain: "connectify-7ab06.firebaseapp.com",
    projectId: "connectify-7ab06",
    storageBucket: "connectify-7ab06.appspot.com",
    messagingSenderId: "467009265918",
    appId: "1:467009265918:web:c036130318d7660a11c5af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
