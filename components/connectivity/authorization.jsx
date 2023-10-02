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
            // eliminar el usuario de firebase
        }) // post en el gateway
    }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
        
        // console.log(token)                             
    })
}
    
export async function LoginAccount (email, password, error) {
    console.log('Login')
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log('sesion iniciada') 
        GetLogin()
    }).catch((error) => {
        console.log(error)
        error(true)
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
    
    const path = 'https://api-gateway-marioax.cloud.okteto.net/users'
    
    // function postsUser() {
        //     axios.post(path,{
            //         data: {
                //             email: 'ajksda',
                //         }
                //     },
                //         { headers: {'Authorization': `Bearer ${token}`}}
                //     )
                // }
                // let token = getIdToken(userCrendential.user, forceRefresh=True)
                //     .then((token)=>{
                    //         console.log(token)                             
                    //     }) 