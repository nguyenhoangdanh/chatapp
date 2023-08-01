// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgHF_XB4cHfEo_ZIqpsqMO39MBAvGoCFc",
  authDomain: "whotalking-app.firebaseapp.com",
  projectId: "whotalking-app",
  storageBucket: "whotalking-app.appspot.com",
  messagingSenderId: "912735486057",
  appId: "1:912735486057:web:8a7bd4a3c36f61abcca2f8",
  measurementId: "G-7M97TLJ9E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);