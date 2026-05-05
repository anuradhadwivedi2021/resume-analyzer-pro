import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Yahan apna Firebase config paste karo
const firebaseConfig = {
  apiKey: "AIzaSyD-3W8CN4uguf4V_Ooj5ejO9T54mDfd4BI",
  authDomain: "resume-analyzer-2d563.firebaseapp.com",
  projectId: "resume-analyzer-2d563",
  storageBucket: "resume-analyzer-2d563.firebasestorage.app",
  messagingSenderId: "612531699674",
  appId: "1:612531699674:web:795feb0bc3e53663368ae3",
  measurementId: "G-5JBWPC412R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };