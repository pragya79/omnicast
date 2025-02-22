
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged ,updateProfile, sendPasswordResetEmail,signOut} from "firebase/auth";
import { getFirestore, doc, setDoc,getDoc,onSnapshot,collection, query, where } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDNURmJHUw_VqEOWpWdZd7DJ0Q4q0A2cvE",
  authDomain: "omnicast-734c5.firebaseapp.com",
  projectId: "omnicast-734c5",
  storageBucket: "omnicast-734c5.firebasestorage.app",
  messagingSenderId: "884161706919",
  appId: "1:884161706919:web:fb15b954afd0a2f1b7d482",
  measurementId: "G-BYG2N17H5C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
   doc, getDoc,setDoc,
   onAuthStateChanged, onSnapshot, 
   updateProfile ,
   collection, query, where ,sendPasswordResetEmail, signOut}; 
