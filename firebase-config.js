// Replace with your Firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCm-Kt6AVFUuQkZ9IC84EPntznKBP_AVv8",
  authDomain: "idea-board-pankaj-22296.firebaseapp.com",
  projectId: "idea-board-pankaj-22296",
  storageBucket: "idea-board-pankaj-22296.firebasestorage.app",
  messagingSenderId: "202807610637",
  appId: "1:202807610637:web:99f1d1394e4bddb3c3b444"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const db = getFirestore(app);
export { auth ,database ,db};