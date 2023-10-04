import { initializeApp } from 'firebase/app';
import {getAuth, getIdToken } from 'firebase/auth'
import axios from 'axios';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'

export async function GetUserData(state) {
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

export async function GetUserByUid(setState, uid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
    const queryParams = {
      uid: uid,
      maxResults: 1,
      pages: 1,
    };

    const queryString = new URLSearchParams(queryParams).toString();
  
    const urlWithQueryParams = `${URL}?${queryString}`;
  
    await axios({
      method: 'get',
      url: urlWithQueryParams,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setState({
        "uid": response.data[0].uid,
        // "fullname": response.data.fullname,
        "nick": response.data[0].nick,
        "followers": response.data[0].followers,
        "follows": response.data[0].follows,
        "interests": response.data[0].interests,
        "pic": response.data[0].pic,
      });
    });
}

export async function GetUserFollowersByUid(setState, uid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
	const urlWithQueryParams = `${URL}/${uid}/followers`

    await axios({
      method: 'get',
      url: urlWithQueryParams,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setState(response.data);
    });
}

export async function GetUserFollowsByUid(setState, uid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
	const urlWithQueryParams = `${URL}/${uid}/follows`

    await axios({
      method: 'get',
      url: urlWithQueryParams,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setState(response.data);
    });
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
