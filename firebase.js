// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCefLRh0ysIDLJM22s7ufqFlSgz0cYWt4M",
  authDomain: "hspantry-ab58c.firebaseapp.com",
  projectId: "hspantry-ab58c",
  storageBucket: "hspantry-ab58c.appspot.com",
  messagingSenderId: "831696011389",
  appId: "1:831696011389:web:ef6ced0d7e30212fe6f114",
//   measurementId: "G-RCPGHYB7X5"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const analytics = getAnalytics(app);

export { firestore};
