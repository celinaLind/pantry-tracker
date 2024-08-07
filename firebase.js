// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, enablePersistentCacheIndexAutoCreation } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
  appId: process.env.FIREBASE_APP_ID,
//   measurementId: "G-RCPGHYB7X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const analytics = getAnalytics(app);

// Enable persistent cache index auto creation
// enablePersistentCacheIndexAutoCreation(firestore)
//   .then(() => {
//     console.log("Persistent cache index auto creation enabled");
//   })
//   .catch((error) => {
//     console.error("Error enabling persistent cache index auto creation:", error);
//   });
export { firestore};
