// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
//import { getAnalytics } from "firebase/analytics";
//import { FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAujmMmrbvZ7JIwDEf5HrL_1IizeDpPgQ",
  authDomain: "balmy-outcome-351511.firebaseapp.com",
  projectId: "balmy-outcome-351511",
  storageBucket: "balmy-outcome-351511.appspot.com",
  messagingSenderId: "816151167755",
  appId: "1:816151167755:web:3289f375d96f3f67e3580e",
  measurementId: "G-NGNF0KX5TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore();
//const analytics = getAnalytics(app);

export {app,fireStore};

