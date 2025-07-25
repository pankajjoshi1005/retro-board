// Replace with your Firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDvjlC54ZawABxwcDwmQU-G_7uetvX0zs4",
  authDomain: "retro-board-caa2a.firebaseapp.com",
  projectId: "retro-board-caa2a",
  storageBucket: "retro-board-caa2a.firebasestorage.app",
  messagingSenderId: "575689719399",
  appId: "1:575689719399:web:26bb601da9fbaab3345ec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const db = getFirestore(app);
export { auth ,database ,db};