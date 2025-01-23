// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxJ3uYwD_ial_sFnYO3D9CpQpy9KoJamA",
  authDomain: "tribedatabase-660fe.firebaseapp.com",
  projectId: "tribedatabase-660fe",
  storageBucket: "tribedatabase-660fe.firebasestorage.app",
  messagingSenderId: "429827516748",
  appId: "1:429827516748:web:214a792a473566287c07e9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
