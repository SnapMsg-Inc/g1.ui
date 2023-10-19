import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, deleteUser } from 'firebase/auth'
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
            "alias": response.data.alias,
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
        "alias": response.data[0].alias,
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

export async function postsUser(data) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    await axios({
        method: 'post',
        url: URL,
        data: data,
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
    console.log('user pacth ', auth.currentUser)
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

export async function deleteUserFollowByUid(uid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
    const urlWithQueryParams = `${URL}/me/follows/${uid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al eliminar usuario de follows:', error);
    }
}

export async function checkIfUserFollows(setIsFollowing, uid, otherUid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    const urlWithQueryParams = `${URL}/${uid}/follows/${otherUid}`;

    try {
        const response = await axios.get(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 && response.data.message === 'follow exists') {
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    } catch (error) {
        if (error.response.status === 404 && error.response.data.detail === 'follow not found') {
            setIsFollowing(false)
        } else {
            console.error('Error al verificar si el usuario sigue a otro:', error);
            setIsFollowing(false)
        }
    }
}

export async function followUserByUid(uid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    const urlWithQueryParams = `${URL}/me/follows/${uid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al seguir al usuario:', error);
    }
}