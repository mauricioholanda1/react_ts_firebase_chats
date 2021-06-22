import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARVAT2vILNNnVBOaQpCHL6uD_as0yZARk",
  authDomain: "labvision-a8ad1.firebaseapp.com",
  databaseURL: "https://labvision-a8ad1-default-rtdb.firebaseio.com",
  projectId: "labvision-a8ad1",
  storageBucket: "labvision-a8ad1.appspot.com",
  messagingSenderId: "108486981751",
  appId: "1:108486981751:web:1d159394166cf247582e72",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
