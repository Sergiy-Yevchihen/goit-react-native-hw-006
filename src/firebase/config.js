import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEZjsTk-_YScDtIhWI3gj3Zy-_JCtdR1Q",
  authDomain: "test-hw7.firebaseapp.com",
  databaseURL:
    "https://test-hw7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-hw7",
  storageBucket: "test-hw7.appspot.com",
  messagingSenderId: "880217337414",
  appId: "1:880217337414:web:1ac76023c32104339b6447",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
