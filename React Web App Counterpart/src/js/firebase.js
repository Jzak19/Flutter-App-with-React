
// This serves as an initialising file for the rest of the application

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "ADD API KEY HERE",
  authDomain: "flutterapp-6a11c.firebaseapp.com",
  projectId: "flutterapp-6a11c",
  storageBucket: "flutterapp-6a11c.appspot.com",
  messagingSenderId: "271500279198",
  appId: "1:271500279198:web:e04648e8e01eea5829aa8f",
  measurementId: "G-X4T3CY5LRP"
};

const app = initializeApp(firebaseConfig);


const storage = getStorage(app);
const auth = getAuth(app)

export { storage, auth };