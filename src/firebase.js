import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwe455McfmLl_leCKHQCVAT6XIMhcu4T8",
  authDomain: "instagram-clone-a65ae.firebaseapp.com",
  projectId: "instagram-clone-a65ae",
  storageBucket: "instagram-clone-a65ae.appspot.com",
  messagingSenderId: "592746792222",
  appId: "1:592746792222:web:13b98781533fe97ffb350f",
  measurementId: "G-QHWYLH0230",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };