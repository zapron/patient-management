// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYTl4s1nBGHX6puTs1BTrBwHb1sUdBnM8",
  authDomain: "patient-management-syste-897d8.firebaseapp.com",
  projectId: "patient-management-syste-897d8",
  storageBucket: "patient-management-syste-897d8.appspot.com",
  messagingSenderId: "137604237370",
  appId: "1:137604237370:web:b2f87a0cda105440580d03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {db}