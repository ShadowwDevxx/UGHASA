// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFl23H0rYA-DbsICId05t9JP835oE6ew0",
  authDomain: "ughasa-e3b1e.firebaseapp.com",
  projectId: "ughasa-e3b1e",
  storageBucket: "ughasa-e3b1e.appspot.com",
  messagingSenderId: "1089686917973",
  appId: "1:1089686917973:web:3b552623d926d062e415dc",
  measurementId: "G-LJ8RPN0PBN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);