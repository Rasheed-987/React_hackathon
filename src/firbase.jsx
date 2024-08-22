import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCqe2oKT6BBS0zNPNRZvdlPxcJZCxLPy_A",
  authDomain: "smitprojecthackathon.firebaseapp.com",
  projectId: "smitprojecthackathon",
  storageBucket: "smitprojecthackathon.appspot.com",
  messagingSenderId: "352395203809",
  appId: "1:352395203809:web:5b4674ecbe9473ccac53a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
