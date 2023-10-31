import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, deleteUser } from 'firebase/auth'
import axios from 'axios';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'
const URL_POST = 'https://api-gateway-marioax.cloud.okteto.net/posts'

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
    . catch((error) => {
        console.log(error.response.status)
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
    })
    . catch((error) => {
        console.log(error.response.status)
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
    })
    . catch((error) => {
        console.log(error.response.status)
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
    })
    . catch((error) => {
        console.log(error.response.status)
    });
}

export const postsUser = async (data) => {
    const auth = getAuth()
    const token = await getIdToken(auth.currentUser, true)
    await axios({
        method: 'post',
        url: URL,
        data: data,
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    })
    .then((response) => {
        console.log('User create')
    })
    . catch((error) => {
        console.log(error.response.status)
        deleteUser(auth.currentUser)
    })
}

export const postsUserFederate = async (data, setIsRegister, setIsLoading, onLogout) => {
    const auth = getAuth()
    const token = await getIdToken(auth.currentUser, true)
    await axios({
        method: 'post',
        url: URL,
        data: data,
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    })
    .then((response) => {
        console.log(response.status)
        setIsLoading(false)
        setIsRegister(true)
    })
    . catch((error) => {
        console.log(error.response.status)
        if (error.response.status === 400) {
            alert('Email already in use')
            onLogout()
        } else {
            deleteUser(auth.currentUser)
        } 
        setIsLoading(false)
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
        console.log(error.response.status)
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
        console.log(error.response.status)
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
            console.log(error.response.status)
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
        console.log(error.response.status)
    }
}


export const createPost = async (text, pic, isPrivate, hashtags) => {
    const auth = getAuth()
    const token = await getIdToken(auth.currentUser, true)

    const data = {
        "hashtags": hashtags,
        "is_private": isPrivate,
        "media_uri": pic,
        "text": text
      }

    await axios({
        method: 'post',
        url: URL_POST,
        data: data,
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    })
    .then((response) => {
        console.log("Post created")
    })
    . catch((error) => {
        console.log(error.response.status)
    })
}

export async function GetPosts(setState, nick, text, maxResults=100, page=0) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    // URL base sin parámetros obligatorios
    let url = `${URL_POST}?`;

    // Agregar los parámetros si están definidos
    if (nick) {
        url += `&nick=${nick}`;
    }
    if (text) {
        url += `&text=${text}`;
    }

    url += `&limit=${maxResults}`;
    url += `&page=${page}`;


    console.log(url)

    await axios({
        method: 'get',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setState(response.data)
        console.log(response.data)
    })
    . catch((error) => {
        console.log(error.response.status)
    });
}

export async function GetFavPosts(setState) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    await axios({
        method: 'get',
        url: `${URL_POST}/fav`, 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setState(response.data)
    })
    . catch((error) => {
        console.log(error.response.status)
    })
}

export async function addPostToFav(pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    const urlWithQueryParams = `${URL_POST}/fav/${pid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function deletePostFromFav(pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
    const urlWithQueryParams = `${URL_POST}/fav/${pid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function GetFeedPosts(setState, maxResults=100, page=0) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

     // URL base sin parámetros obligatorios
     let url = `${URL_POST}/feed?`;
 
     url += `&limit=${maxResults}`;
     url += `&page=${page}`;
 
    await axios({
        method: 'get',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setState(response.data)
        console.log(response.data)
    })
    . catch((error) => {
        console.log(error.response.status)
    })
}

export async function likePost(pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    const urlWithQueryParams = `${URL_POST}/like/${pid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function unlikePost(pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
    const urlWithQueryParams = `${URL_POST}/like/${pid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function GetRecommendedPosts(setState, maxResults, page) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    await axios({
        method: 'get',
        url: `${URL_POST}/recommended`,
        params: {
            maxResults: maxResults,
            page: page
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setState(response.data)
    })
    . catch((error) => {
        console.log(error.response.status)
    })
}

export async function deletePost(pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
  
    const urlWithQueryParams = `${URL_POST}/${pid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function PatchPostData(data) {
    const auth = getAuth();
    console.log('user pacth ', auth.currentUser)
    const token = await getIdToken(auth.currentUser, true);
    try {
        await axios({
            method: 'patch',
            url: `${URL_POST}/${pid}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return true
    } catch (error) {
        console.log(error.response.status)
    }
}