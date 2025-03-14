// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8ldjF1Ep8co4GthgrSp6V-_apFe_VXfc",
  authDomain: "tribe-6a392.firebaseapp.com",
  projectId: "tribe-6a392",
  storageBucket: "tribe-6a392.firebasestorage.app",
  messagingSenderId: "213065827904",
  appId: "1:213065827904:web:0908f28dd1a285e4f741a5",
  measurementId: "G-0GFF463M7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});




export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD8ldjF1Ep8co4GthgrSp6V-_apFe_VXfc",
    authDomain: "tribe-6a392.firebaseapp.com",
    projectId: "tribe-6a392",
    storageBucket: "tribe-6a392.firebasestorage.app",
    messagingSenderId: "213065827904",
    appId: "1:213065827904:web:0908f28dd1a285e4f741a5",
    measurementId: "G-0GFF463M7M"
  };
  
  // Initialize Firebase
  return initializeApp(firebaseConfig);
  
}

export { auth };  