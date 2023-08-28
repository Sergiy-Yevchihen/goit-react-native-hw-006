import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCDJQo-zwRYqdJH8jJVJTASCc4Zh_Rh73U",
  authDomain: "react-native-hw-06-2b58c.firebaseapp.com",
  databaseURL:
    "https://react-native-hw-06-2b58c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-hw-06-2b58c",
  storageBucket: "react-native-hw-06-2b58c.appspot.com",
  messagingSenderId: "1072289562368",
  appId: "1:1072289562368:web:453de4be793d520792fde5",
  measurementId: "G-55DC2F0H4W",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
