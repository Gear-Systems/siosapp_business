import { initializeApp } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDHjAy76lh3RqU2rGk5mIevIjiESjp1aT8",
    authDomain: "siosapp-business.firebaseapp.com",
    projectId: "siosapp-business",
    storageBucket: "siosapp-business.appspot.com",
    messagingSenderId: "998061503599",
    appId: "1:998061503599:web:d5456e0392893b68b8899a",
    measurementId: "G-NPCJPCTMF4"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
// connectDatabaseEmulator(database, '192.168.100.90', 9000);