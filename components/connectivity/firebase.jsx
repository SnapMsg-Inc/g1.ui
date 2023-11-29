import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: Config.GOOGLE_API_KEY,
    authDomain: "snap-msg.firebaseapp.com",
    projectId: "snap-msg",
    storageBucket: "snap-msg.appspot.com",
    messagingSenderId: Config.MESSAGE_SENDER_ID,
    appId: Config.APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);

try {
    initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} catch(error) {
    console.log(error)
}
