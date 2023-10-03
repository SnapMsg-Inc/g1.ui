import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import {getAuth, getIdToken } from 'firebase/auth'
import axios from 'axios';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'

export default async function GetLogin() {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    await axios({
        method: 'get',
        url: `${URL}/me`, 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response)=> {
        console.log(JSON.stringify(response.data, null, 2))
         return response.data
    }).catch((error) => {
        console.log(error)
    })
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
    })
}
