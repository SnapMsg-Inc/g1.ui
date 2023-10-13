import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

const firebaseConfig = {
    apiKey: Config.GOOGLE_API_KEY,
    authDomain: "snap-msg.firebaseapp.com",
    projectId: "snap-msg",
    storageBucket: "snap-msg.appspot.com",
    messagingSenderId: Config.MESSAGE_SENDER_ID,
    appId: Config.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
try {
    initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} catch(error) {
    console.log(error)
}

export default firebaseApp;