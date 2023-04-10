// Import the functions you need from the SDKs you need
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import firebaseApp from "./firebaseApp";

const auth = getAuth(firebaseApp);

const subscribeToAuthChanged = (setUser) => onAuthStateChanged(auth, setUser);

const waitForUser = (): Promise<User> => {
  const p = new Promise<User>((resolve, reject) => {
    const unsub = authService.subscribeToAuthChanged((user) => {
      resolve(user);
      unsub();
    });
  });

  return p;
};

const login = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (e) {
    alert((e as Error).message);
  }
};

const logout = () => {
  signOut(auth);
};

// TODO: same as dateService
const authService = {
  subscribeToAuthChanged,
  login,
  logout,
  waitForUser,
};

export default authService;
