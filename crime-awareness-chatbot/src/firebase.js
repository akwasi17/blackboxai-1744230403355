import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Default configuration that works without .env
const defaultConfig = {
  apiKey: "AIzaSyDexample1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "crime-awareness-chatbot.firebaseapp.com",
  projectId: "crime-awareness-chatbot",
  storageBucket: "crime-awareness-chatbot.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
  measurementId: "G-EXAMPLE123"
};

// Initialize Firebase
let app;
try {
  app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultConfig.apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultConfig.projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultConfig.appId,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultConfig.measurementId
  });
} catch (error) {
  console.error("Firebase initialization error", error);
  throw new Error("Failed to initialize Firebase");
}

const db = getFirestore(app);
const auth = getAuth(app);

export const chatsCollection = collection(db, 'chats');
export { db, auth };
