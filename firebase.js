// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHkD20-7UlCLTHNsiLC9pw79k3jPLo6MU",
  authDomain: "flashcardsaas-3f3b7.firebaseapp.com",
  projectId: "flashcardsaas-3f3b7",
  storageBucket: "flashcardsaas-3f3b7.appspot.com",
  messagingSenderId: "861877171352",
  appId: "1:861877171352:web:7223df53ee0ee6dd274ced",
  measurementId: "G-3TQ8DSDTP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);