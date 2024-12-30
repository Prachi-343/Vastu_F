// Import the required Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgsZ_Fu80Yr-EWSgRKdNTjm9g0hMWF2QE",
  authDomain: "urjasvi-aea0f.firebaseapp.com",
  databaseURL: "https://urjasvi-aea0f-default-rtdb.firebaseio.com",
  projectId: "urjasvi-aea0f",
  storageBucket: "urjasvi-aea0f.firebasestorage.app",
  messagingSenderId: "1055226138959",
  appId: "1:1055226138959:web:b5c5178429f2eb118eb53a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app); // Firestore database
const auth = getAuth(app);    // Authentication
const storage = getStorage(app); // Storage for file uploads

// Export services for use in other files
export { db, auth, storage };
