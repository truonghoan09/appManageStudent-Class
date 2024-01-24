import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import {GoogleAuthProvider, getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnUbWt5u8scm0asWftQATi7q6tN1w_Ck0",
  authDomain: "managestudent-class.firebaseapp.com",
  projectId: "managestudent-class",
  storageBucket: "managestudent-class.appspot.com",
  messagingSenderId: "883046435147",
  appId: "1:883046435147:web:db14be94139c6be5f800ce"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default {app};