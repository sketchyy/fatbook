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

const authService = {
  subscribeToAuthChanged: (setUser) => onAuthStateChanged(auth, setUser),

  waitForUser: (): Promise<User> => {
    const p = new Promise<User>((resolve, reject) => {
      const unsub = authService.subscribeToAuthChanged((user) => {
        resolve(user);
        unsub();
      });
    });

    return p;
  },

  login: async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      alert((e as Error).message);
    }
  },

  logout: () => {
    signOut(auth);
  },
};

export default authService;
