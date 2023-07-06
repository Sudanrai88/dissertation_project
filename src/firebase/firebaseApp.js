// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA74fkfmWmw6JLmIOQyfkoaYzQBaVqj48U",
  authDomain: "touristic-itinerary-planner.firebaseapp.com",
  projectId: "touristic-itinerary-planner",
  storageBucket: "touristic-itinerary-planner.appspot.com",
  messagingSenderId: "486671686285",
  appId: "1:486671686285:web:c52d9651f5f0e6debda0c4",
  measurementId: "G-PPVWRR4JF4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export function to initialize firebase.

export const initFirebase = () => {
    return app;
}