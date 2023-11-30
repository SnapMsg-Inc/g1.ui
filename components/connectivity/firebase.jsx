import { initializeApp, getApps } from "firebase/app";
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

let firebaseApp;
let auth;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);

    auth = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} else {
    firebaseApp = getApps()[0];
    auth = getAuth(firebaseApp);
}

const database = getFirestore(firebaseApp);

export { firebaseApp, auth, database };
