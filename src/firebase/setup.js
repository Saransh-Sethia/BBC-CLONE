
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWeCwNxMP11RpyDk7jqdnVXZEATGuk_EQ",
  authDomain: "bbc-clone-4e8ec.firebaseapp.com",
  projectId: "bbc-clone-4e8ec",
  storageBucket: "bbc-clone-4e8ec.appspot.com",
  messagingSenderId: "705881690023",
  appId: "1:705881690023:web:cd84681b4ede2674f43082"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const database = getFirestore(app);