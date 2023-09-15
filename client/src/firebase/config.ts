// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_KUr9WtKI3I29o2s__QXzrAo_4nTLPg0",
  authDomain: "bin-clone.firebaseapp.com",
  projectId: "bin-clone",
  storageBucket: "bin-clone.appspot.com",
  messagingSenderId: "911930984909",
  appId: "1:911930984909:web:8adaff8181bce36ee89c84"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp )