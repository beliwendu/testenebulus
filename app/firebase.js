import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHOAVmvi2wf5rQp3Ve9XdqbafOgoTAZnA",
  authDomain: "appnative-9b87f.firebaseapp.com",
  projectId: "appnative-9b87f",
  storageBucket: "appnative-9b87f.appspot.com",
  messagingSenderId: "134236003590",
  appId: "1:134236003590:web:b157fcb34e5bee69639287",
  measurementId: "G-E9D4HVRM36"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
const auth = getAuth(app);

// Firestore
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword };
