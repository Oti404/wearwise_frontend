// config/firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhNlE-Jjv-8etNWutiuMbXuDicpJyxL58",
  authDomain: "wearwise-2cec5.firebaseapp.com",
  projectId: "wearwise-2cec5",
  storageBucket: "wearwise-2cec5.firebasestorage.app",
  messagingSenderId: "799108407526",
  appId: "1:799108407526:web:d834be65-92ef-4e00-817f-78ff37ab0c03"
};

console.log('[Firebase] Initializing Universal Web SDK (firebase/compat) for Expo Go...');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AUTH = firebase.auth();
const DB = firebase.firestore();
const STORAGE = firebase.storage();

export { AUTH, DB, STORAGE };

export default {
  AUTH,
  DB,
  STORAGE,
};