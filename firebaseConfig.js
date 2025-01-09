// firebaseConfig.js

// Ensure the Firebase object is available globally
if (typeof firebase === "undefined") {
  console.error("Firebase SDK not loaded. Ensure Firebase scripts are included in the correct order.");
} else {
  console.log("Firebase object:", firebase);

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
  const app = firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized:", app);

  // Initialize Firebase services (example)
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
}
