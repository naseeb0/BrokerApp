import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// add firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAT1EfWI2IMKrGM_vM2bVoAX8c0nGpq1nQ",

  authDomain: "homebaba-de874.firebaseapp.com",

  projectId: "homebaba-de874",

  storageBucket: "homebaba-de874.appspot.com",

  messagingSenderId: "9451773000",

  appId: "1:9451773000:web:936d894ccc99401970cc7d"


};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
