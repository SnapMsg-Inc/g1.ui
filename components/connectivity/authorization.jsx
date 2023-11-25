import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword, sendPasswordResetEmail,
        deleteUser } from 'firebase/auth'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Config from "react-native-config";  
import * as firebase from 'firebase/auth'
import firebaseApp from './firebase';

GoogleSignin.configure({
    webClientId: Config.WEB_CLIENT_ID
});

export const CreateAccount = (email, password) => 
    createUserWithEmailAndPassword(firebase.getAuth(firebaseApp), email, password)

export const LoginAccount = (email, password) =>
    signInWithEmailAndPassword(firebase.getAuth(firebaseApp), email, password)

export const SignFederate = (currentUser) => 
    signInWithCredential(firebase.getAuth(firebaseApp), GoogleAuthProvider.credential(currentUser.idToken));

export const LogoutAccount = () =>
    firebase.getAuth(firebaseApp).signOut()
    
export const SignInWithGoogle = () => 
    GoogleSignin.signIn()

export const DeleteUserFirebase = () => 
    deleteUser(firebase.getAuth(firebaseApp).currentUser)

export const ResetPassword = (email) =>
    sendPasswordResetEmail(firebase.getAuth(firebaseApp), email)