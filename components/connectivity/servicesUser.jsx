import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import {getAuth, getIdToken } from 'firebase/auth'
import axios from 'axios';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'

export default async function getUser() {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, forceRefresh=True);
    const response = axios.get(URL, { headers: {'Authorization': `Bearer ${token}`}})
}

export async function postsUser(fullName, nick, dateBirth, email, password) {
    const user = firebase.auth().currentUser;
    const token = await user.getIdToken();
    await axios.post(URL,{
        data: {
            "fullname": fullName,
            "email": email,
            "interests": [''], 
            "nickname": nick,
            "zone": ''
        }
    },
        { headers: {'Authorization': `Bearer ${token}`}}
    ).then((response) => {
        console.log(response.data)
        console.log('User create')
        alert('User Create')
    }).catch((error) => {
        console.log(error.response)
        console.log('error')
    })
}
