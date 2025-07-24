// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbNFzt6JDsogDh7z8yt2pxEGA5FsES_NE",
  authDomain: "workout-ninja.firebaseapp.com",
  projectId: "workout-ninja",
  storageBucket: "workout-ninja.firebasestorage.app",
  messagingSenderId: "397176983475",
  appId: "1:397176983475:web:b183d718b2437e26f805c6",
  measurementId: "G-J4PK69CPME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
