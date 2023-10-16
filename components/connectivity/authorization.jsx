import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, signOut,
        deleteUser, getIdToken } from 'firebase/auth'
import GetLogin, { postsUser, postUserFederate } from './servicesUser';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Config from "react-native-config";  
import * as firebase from 'firebase/auth'
import firebaseApp from './firebase';

GoogleSignin.configure({
    webClientId: Config.WEB_CLIENT_ID
});

export default async function CreateAccount (fullName, alias,
    nick, dateBirth,
    email, password) {
    console.log(email)
    console.log(password)
    firebase.getAuth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        console.log(userCredential)
        postsUser(fullName, alias, nick, dateBirth, email)
    }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
    })
}

export const LoginAccount = (email, password) =>
    signInWithEmailAndPassword(firebase.getAuth(firebaseApp), email, password)


export async function SignFederate(signUp) {
    try {
        const auth = getAuth()
        await GoogleSignin.hasPlayServices();
        const currentUser = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(currentUser.idToken);
        await signInWithCredential(auth, googleCredential);
        if (signUp) {
            const {user} = currentUser 
            user.givenName = user.givenName.replace(/ /g, '_')
            console.log(JSON.stringify(user,null,2))
            const today = new Date()
            const data = {
                "fullname": user.name,
                "alias" : `${user.givenName} ${user.familyName}`,
                "interests": [],
                "zone": {"latitude": 0,
                        "longitude": 0},
                "ocupation": '',
                "pic": user.photo,
                "email": user.email,
                "nick": user.givenName,
                "birthdate": today.toISOString().substring(0,10),
            }
            await postUserFederate(data)
        }
        return true
    } catch (error) {
        console.log(error)
    }
};

export const LogoutAccount = () =>
    firebase.getAuth(firebaseApp).signOut()

            