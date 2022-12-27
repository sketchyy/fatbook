// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// TODO: dev/prod configs
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxM6G4F9V5eeV09JqAR10lb6Rdt_Gn7Uw",
  authDomain: "calories-diary-3fa55.firebaseapp.com",
  databaseURL:
    "https://calories-diary-3fa55-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "calories-diary-3fa55",
  storageBucket: "calories-diary-3fa55.appspot.com",
  messagingSenderId: "894888133141",
  appId: "1:894888133141:web:25ce698f548f30c681041c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const subscribeToAuthChanged = (setUser) => onAuthStateChanged(auth, setUser);

const login = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (e) {
    alert(e.message);
  }
};

const logout = () => {
  signOut(auth);
};

const firebaseService = {
  firebaseApp,
  subscribeToAuthChanged,
  login,
  logout,
};

export default firebaseService;
