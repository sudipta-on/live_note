import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_AcnPAoI7I2TajkowfsdtZUayZHdihF4",
  authDomain: "qnotes26.firebaseapp.com",
  projectId: "qnotes26",
  storageBucket: "qnotes26.firebasestorage.app",
  messagingSenderId: "630521811156",
  appId: "1:630521811156:web:87ed588f7f492687532b41",
  measurementId: "G-VNDPVX9V7J"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);