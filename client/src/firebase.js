// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fight-track.firebaseapp.com",
  projectId: "fight-track",
  storageBucket: "fight-track.appspot.com",
  messagingSenderId: "637006399270",
  appId: "1:637006399270:web:d6c61b8b4015008bcaa3e7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
