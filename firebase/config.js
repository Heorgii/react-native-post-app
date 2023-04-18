import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_bkrdHGYxA3HtGPJeUd18elwnvRkaL54",
  authDomain: "rn-post-app-d0dfa.firebaseapp.com",
  projectId: "rn-post-app-d0dfa",
  storageBucket: "rn-post-app-d0dfa.appspot.com",
  messagingSenderId: "780566848183",
  appId: "1:780566848183:web:c4cec8a177ff3f8e5ca332",
  measurementId: "G-Q2N2TY1YQZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
