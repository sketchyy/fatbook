import { initializeApp } from "firebase/app";
import { devFirebaseConfig } from "./firebase.dev";
import { prodFirebaseConfig } from "./firebase.prod";

// Initialize Firebase
console.log("ENV=", import.meta.env.MODE);
let firebaseApp;
if (import.meta.env.MODE === "production") {
  firebaseApp = initializeApp(prodFirebaseConfig);
} else {
  firebaseApp = initializeApp(devFirebaseConfig);
}

export default firebaseApp;
