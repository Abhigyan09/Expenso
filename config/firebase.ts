// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7hSwcHfUVLsmBK8DaPo8g167dn6glVz4",
  authDomain: "xpenso-ea425.firebaseapp.com",
  projectId: "xpenso-ea425",
  storageBucket: "xpenso-ea425.appspot.com", // fixed storage bucket URL
  messagingSenderId: "668264587040",
  appId: "1:668264587040:web:519f1051f3062c4bdf4145",
  measurementId: "G-S9J9CHLXYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
export const firestore = getFirestore(app);
