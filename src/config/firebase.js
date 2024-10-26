import { FirebaseError, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    console.log('User created:', user.uid);

    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: '',
      avatar: '',
      bio: "Hey, I'm using this app",
      lastSeen: Date.now(),
    });

    console.log('User document created successfully.');

    // Attempt to create the chats document
    await setDoc(doc(db, 'chats', user.uid), {
      chatsData: [],
    });
    console.log('Chats document created successfully.');
  } catch (error) {
    console.error('Error during signup: ', error);
    toast.error(error.message.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(error);
      toast.error(error.message.split('/')[1].split('-').join(' '));
    }
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(error);
      toast.error(error.message.split('/')[1].split('-').join(' '));
    }
  }
};

export { auth, db, login, logout, signUp };
