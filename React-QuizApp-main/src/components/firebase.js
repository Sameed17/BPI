// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZRQBiGyCOIeX69HLUGaUk16Tq7qwBQb4",
  authDomain: "bright-pakistan-initiative.firebaseapp.com",
  projectId: "bright-pakistan-initiative",
  storageBucket: "bright-pakistan-initiative.firebasestorage.app",
  messagingSenderId: "1077285749148",
  appId: "1:1077285749148:web:7b8e4299401afe0f144859",
  measurementId: "G-V2PKERBCVJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);