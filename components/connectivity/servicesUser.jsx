import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, deleteUser } from 'firebase/auth'
import axios from 'axios';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'

export async function GetUserData(state, data) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    await axios({
        method: 'get',
        url: `${URL}/me`, 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        state({
            "uid": response.data.uid,
            "fullname": response.data.fullname,
            "interests": response.data.interests,
            "zone": {"latitude": response.data.zone.latitude,
                    "longitude": response.data.zone.longitude},
            "is_admin": response.data.is_admin,
            "ocupation": response.data.ocupation,
            "pic": response.data.pic,
            "email": response.data.email,
            "nick": response.data.nick,
            "birthdate": response.data.birthdate,
            "followers": response.data.followers,
            "follows": response.data.follows,
        })
    })
}

export async function postUserFederate(data) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    console.log(`Estoy en postUser ${JSON.stringify(data, null, 2)}`)
    try {
        await axios({
            method: 'post',
            url: URL,
            data: data,
            headers: { 
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        })
        return true
    } catch(error) {
        console.log(error.status)
        console.log('error gateway: ', error)
        deleteUser(auth.currentUser)
    }
}

export async function postsUser(fullName, nick, dateBirth, email) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    console.log(`email: ${email}`)
    await axios({
        method: 'post',
        url: URL,
        data: {
            "fullname": fullName,
            "interests": [],
            "zone": {"latitude": 0,
                    "longitude": 0},
            "pic": '',
            "email": email,
            "nick": nick,
            "birthdate": dateBirth.toISOString().substring(0,10),
        },
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    }).then((response) => {
        console.log(response.status)
        console.log('User create')
    }). catch((error) => {
        console.log('error gateway: ', error)
        deleteUser(auth.currentUser)
    })
}

export async function PatchUser(data) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    try {
        await axios({
            method: 'patch',
            url: `${URL}/me`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return true
    } catch (error) {
        console.log(error)
    }
}
