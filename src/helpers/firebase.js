import { createContext } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/messaging";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC0tQhfTzSyE0AZ1GSK6CbPvzW51QkkqsM",
  authDomain: "microblog-20ba4.firebaseapp.com",
  projectId: "microblog-20ba4",
  storageBucket: "microblog-20ba4.appspot.com",
  messagingSenderId: "644250234812",
  appId: "1:644250234812:web:5ed98664f3ae11c55cc5b9",
});

export const Context = createContext(null);

export const firestore = firebase.firestore();
export const db = firebaseConfig.firestore();
export const auth = getAuth();
export const storage = getStorage(firebaseConfig);
