import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTvKv2k_bm8lFnOQ6SBpsGYrBxvPMBwSE",
  authDomain: "spaghettification-20573.firebaseapp.com",
  projectId: "spaghettification-20573",
  storageBucket: "spaghettification-20573.firebasestorage.app",
  messagingSenderId: "296075989856",
  appId: "1:296075989856:web:de0596ab82c0531ce40405",
  measurementId: "G-VVE3N5BG01"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;