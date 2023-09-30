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
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    console.log(`email: ${email}`)
    await axios({
        method: 'post',
        url: URL,
        data: {
            "email": email,
            "fullname": fullName,
            "interests": [' '], 
            "nick": nick,
            "zone": ' '
        },
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    }).then((response) => {
        console.log(response.status)
        console.log('User create')
    }).catch((error) => {
        console.log(error.message)
        console.log(error.response)
        console.log('error')
    })
}
