// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgdcRTRUFsVTFcD1BBQ6DfDj5Tv98unPI",
  authDomain: "skopelos-e6391.firebaseapp.com",
  projectId: "skopelos-e6391",
  storageBucket: "skopelos-e6391.appspot.com",
  messagingSenderId: "968188557194",
  appId: "1:968188557194:web:393a8125cf51319ea87a73",
  measurementId: "G-2290ZST4Z4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };