// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV18DxX5BCzLfe4Ws39yIZd2wGp7ozhg4",
  authDomain: "chat-app-69f78.firebaseapp.com",
  projectId: "chat-app-69f78",
  storageBucket: "chat-app-69f78.appspot.com",
  messagingSenderId: "923054626554",
  appId: "1:923054626554:web:d03bae3335372c6afc1b43"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

// Create a root reference
export const storage = getStorage();

// Our DB setup
export const db = getFirestore()