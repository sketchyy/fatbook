import { initializeApp } from "firebase/app";
import { devFirebaseConfig } from "./firebase.dev";
import { prodFirebaseConfig } from "./firebase.prod";

// Initialize Firebase
console.log("ENV=", process.env.REACT_APP_DEPLOY_ENV);
let firebaseApp;
if (process.env.REACT_APP_DEPLOY_ENV === "production") {
  firebaseApp = initializeApp(prodFirebaseConfig);
} else {
  firebaseApp = initializeApp(devFirebaseConfig);
}

export default firebaseApp;
