import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4eYWEspyxpePRk6JrTh6r17tamEQecro",
  authDomain: "cocktail-bcbcf.firebaseapp.com",
  projectId: "cocktail-bcbcf",
  storageBucket: "cocktail-bcbcf.appspot.com",
  messagingSenderId: "821998551443",
  appId: "1:821998551443:web:a89ec4c8aa711d6da5e866",
};

export const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();

  return signInWithPopup(auth, googleProvider);
};

export const signInWithGithub = () => {
  const githubProvider = new GithubAuthProvider();

  return signInWithPopup(auth, githubProvider);
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export default app;
