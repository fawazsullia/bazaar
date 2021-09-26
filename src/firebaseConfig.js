// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT7WKV-sAk7eaL39MSTrfowPnz0e0MEsE",
authDomain: "bazaar-c67ea.firebaseapp.com",
databaseURL: "https://bazaar-c67ea-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "bazaar-c67ea",
storageBucket: "bazaar-c67ea.appspot.com",
messagingSenderId: "207510053576",
appId: "1:207510053576:web:efd701df00863e8be77bfd",
measurementId: "G-VEQZHE38EM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase

