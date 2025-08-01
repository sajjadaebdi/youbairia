// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ7C8fjH1VZXA3Z_rUkqjy0MsSujI3vJM",
  authDomain: "youbairia-9ad27.firebaseapp.com",
  projectId: "youbairia-9ad27",
  storageBucket: "youbairia-9ad27.firebasestorage.app",
  messagingSenderId: "201572817250",
  appId: "1:201572817250:web:e5486ae78e44f6332bf43b",
  measurementId: "G-HVES78ZVZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);