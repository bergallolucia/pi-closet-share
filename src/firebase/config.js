import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxicFihONe6GjCdgMiFqSwovvQnSnfk6w",
  authDomain: "closetshare-pi.firebaseapp.com",
  projectId: "closetshare-pi",
  storageBucket: "closetshare-pi.firebasestorage.app",
  messagingSenderId: "82926536344",
  appId: "1:82926536344:web:23af9d86dc5db4d958b2ed"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase; 