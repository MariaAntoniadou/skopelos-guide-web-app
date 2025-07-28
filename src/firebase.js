import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgdcRTRUFsVTFcD1BBQ6DfDj5Tv98unPI",
  authDomain: "skopelos-e6391.firebaseapp.com",
  projectId: "skopelos-e6391",
  storageBucket: "skopelos-e6391.appspot.com",
  messagingSenderId: "968188557194",
  appId: "1:968188557194:web:393a8125cf51319ea87a73",
  measurementId: "G-2290ZST4Z4"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };