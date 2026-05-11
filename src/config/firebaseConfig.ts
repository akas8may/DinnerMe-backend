import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMAYWL4r22zYG8NAD9RHnfAx3wKNncXTM",
  authDomain: "dinnerme-fec47.firebaseapp.com",
  projectId: "dinnerme-fec47",
  storageBucket: "dinnerme-fec47.firebasestorage.app",
  messagingSenderId: "846830688483",
  appId: "1:846830688483:web:5d98a45214d1c3dad84dd6",
  measurementId: "G-67TWBN6979"
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy