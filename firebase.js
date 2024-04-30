import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBGJKBlBpN2CPIMqRSHOA4OXmlZIePZKvQ",
  authDomain: "chat-9e21d.firebaseapp.com",
  projectId: "chat-9e21d",
  storageBucket: "chat-9e21d.appspot.com",
  messagingSenderId: "335097414750",
  appId: "1:335097414750:web:0e847936b3f946594d60cf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };

// export const db = getFirestore(app)