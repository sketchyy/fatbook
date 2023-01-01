// Import the functions you need from the SDKs you need
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import firebaseApp from "./firebaseApp";

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

const authService = {
  subscribeToAuthChanged,
  login,
  logout,
};

export default authService;
