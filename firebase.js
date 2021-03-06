import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBtm0NpZe66Xmtk3ABA_QshKggcuJpFhZg",
    authDomain: "myinstagramclone-7a555.firebaseapp.com",
    projectId: "myinstagramclone-7a555",
    storageBucket: "myinstagramclone-7a555.appspot.com",
    messagingSenderId: "37463484354",
    appId: "1:37463484354:web:25e533ab29beca697ad85b",
    measurementId: "G-X790V9SR55"
};

getApps.length === 0 ? initializeApp(firebaseConfig) : '';

const fireStore = require('firebase/firestore');
const fireAuth = require('firebase/auth');
const fireStorage = require('firebase/storage');

export { fireAuth, fireStore, fireStorage }
