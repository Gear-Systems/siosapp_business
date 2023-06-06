import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHjAy76lh3RqU2rGk5mIevIjiESjp1aT8",
  authDomain: "siosapp-business.firebaseapp.com",
  databaseURL: "https://siosapp-business-default-rtdb.firebaseio.com",
  projectId: "siosapp-business",
  storageBucket: "siosapp-business.appspot.com",
  messagingSenderId: "998061503599",
  appId: "1:998061503599:web:d5456e0392893b68b8899a",
  measurementId: "G-NPCJPCTMF4"
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099");

const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);

export { auth, db }