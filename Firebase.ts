// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAigUhCD4GClLWS0VSlMRx4o9zdFmq7AIo",
  authDomain: "my-app-f471a.firebaseapp.com",
  projectId: "my-app-f471a",
  storageBucket: "my-app-f471a.firebasestorage.app",
  messagingSenderId: "530708799132",
  appId: "1:530708799132:web:813b6449af69afcad2d759",
  measurementId: "G-E8GV4JKQ0Q"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);