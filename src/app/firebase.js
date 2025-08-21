// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ-_xuIWiGd7dysGVrvib3hQverpr83zw",
  authDomain: "ideaz-2.firebaseapp.com",
  projectId: "ideaz-2",
  storageBucket: "ideaz-2.firebasestorage.app",
  messagingSenderId: "718944847799",
  appId: "1:718944847799:web:82c91f91d60be562e5ca32",
  measurementId: "G-ENMZ2YTNT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);