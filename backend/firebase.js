// Import the functions you need from the SDKs you need
import { initializeApp,getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCApdSgrytndPGZciZdXP9mvshDfMMXWtg",
  authDomain: "studentsystem-ffc06.firebaseapp.com",
  projectId: "studentsystem-ffc06",
  storageBucket: "studentsystem-ffc06.firebasestorage.app",
  messagingSenderId: "566916690669",
  appId: "1:566916690669:web:54efbb6924b142dbf752e4",
  measurementId: "G-C39CF9DL9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

module.exports = {app,analytics,auth}