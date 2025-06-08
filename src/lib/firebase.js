// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDDytric3xc2Sd-8Wq8oZhuSMfx317NGw",
  authDomain: "progressapp-f04cc.firebaseapp.com",
  projectId: "progressapp-f04cc",
  storageBucket: "progressapp-f04cc.firebasestorage.app",
  messagingSenderId: "400922307826",
  appId: "1:400922307826:web:dc339f2143caf82722346b",
  measurementId: "G-WL335MXMVG",
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
