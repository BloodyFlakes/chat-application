import { FirebaseError, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

type UserData = {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  lastSeen: number;
};

type ChatData = {
  chatData: string[];
};

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

const signUp = async (username: string, email: string, password: string): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userData: UserData = {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I'm using this app",
      lastSeen: Date.now(),
    };
    await setDoc(doc(db, "users", user.uid), userData);

    const chatData: ChatData = {
      chatData: [],
    };
    await setDoc(doc(db, "chats", user.uid), chatData);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error);
      toast.error(error.message.split("/")[1].split("-").join(" "));
    }
  }
};

const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error);
      toast.error(error.message.split("/")[1].split("-").join(" "));
    }
  }
};

const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error);
      toast.error(error.message.split("/")[1].split("-").join(" "));
    }
  }
};

export { auth, db, login, logout, signUp };
