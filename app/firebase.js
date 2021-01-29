import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8zLARaBBffUq_pk1a36dSVdpUJwQaass",
  authDomain: "expense-tracker-8d091.firebaseapp.com",
  projectId: "expense-tracker-8d091",
  storageBucket: "expense-tracker-8d091.appspot.com",
  messagingSenderId: "894025729971",
  appId: "1:894025729971:web:cbd404d7073285864fedc6",
  measurementId: "G-WY5F7N2XFC"
};

firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage();
export const auth = firebase.auth();
export const db = firebase.firestore();

