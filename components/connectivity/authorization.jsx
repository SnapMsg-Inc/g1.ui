import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import {getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        deleteUser, getIdToken } from 'firebase/auth'
import GetLogin, { postsUser } from './servicesUser';
        
        
export default async function CreateAccount (fullName, 
    nick, dateBirth,
    email, password) {
    const auth = getAuth();
    console.log(email)
    console.log(password)
    // const [user,setUser] = useState('')
    
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        postsUser(fullName, nick, dateBirth, email, password).catch((error) => {
            console.log('error gateway')
            deleteUser(auth.currentUser)
        })
    }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
    })
}
    
export async function LoginAccount (email, password) {
    const auth = getAuth();
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true
    } catch(error) {
        console.log(`Error with code: ${error.code} and message: ${error.message}`)
        throw error
    };
}
