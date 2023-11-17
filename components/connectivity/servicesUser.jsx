import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, deleteUser } from 'firebase/auth'
import axios from 'axios';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'
const URL_POST = 'https://api-gateway-marioax.cloud.okteto.net/posts'

export async function GetUsers(setState, query) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    
    // console.log("Bearer ", token);
    
    await axios({
        method: 'get',
        url: `${URL}${query}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setState(response.data)
    })
    . catch((error) => {
        console.log(JSON.stringify(error.response, null, 2))
    });
}

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
        console.log(JSON.stringify(error.response, null, 2))
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
        // console.log(response.data)
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
        console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
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

export const postsUserFederate = (data, token) =>
    axios({
        method: 'post',
        url: URL,
        data: data,
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    })

export const PatchUser = (data, token) =>
    axios({
        method: 'patch',
        url: `${URL}/me`,
        data: data,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

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
        console.log(JSON.stringify(error.response, null, 2))
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
        if (error.response.status === 404 && error.response.data.detail === 'follow does not exist') {
            setIsFollowing(false)
        } else {
            console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
    })
}

export async function GetPosts(url, maxResults = 100, page = 0) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    
    const urlWithQueryParams = `${url}&limit=${maxResults}&page=${page}`;

    try {
    const response = await axios({
        method: 'get',
        url: urlWithQueryParams,
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        }
    });
    return response.data;
    } catch (error) {
        console.log(JSON.stringify(error.response, null, 2));
    }
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
        console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
    }
}

export async function GetFeedPosts(maxResults = 100, page = 0) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);
    
    const url = `${URL_POST}/feed?limit=${maxResults}&page=${page}`;
    // console.log(token)
    try {
    const response = await axios({
        method: 'get',
        url: url,
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        }
    });
    return response.data;
    } catch (error) {
        console.log(JSON.stringify(error.response, null, 2));
    }
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
        console.log(JSON.stringify(error.response, null, 2))
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
        console.log(JSON.stringify(error.response, null, 2))
    }
}

export async function GetRecommendedPosts(setState, uid, maxResults, page) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    let url = `${URL_POST}/recommended?limit=${maxResults}&page=${page}`;

    await axios({
        method: 'get',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        setState(response.data)
    })
    . catch((error) => {
        console.log(JSON.stringify(error.response, null, 2))
    })
}

export async function deletePost(pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    const urlWithQueryParams = `${URL_POST}/${pid}`;
    console.log("eliminando post con pid: ", pid )
    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function PatchPostData(data, pid) {
    const auth = getAuth();
    const token = await getIdToken(auth.currentUser, true);

    const url = `${URL_POST}/${pid}`;

    try {
        await axios({
            method: 'patch',
            url: url,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return true
    } catch (error) {
        console.log(JSON.stringify(error.response, null, 2))
    }
}

export const GetToken = () => getIdToken(getAuth().currentUser, true) 

export const GetMe = (token) => 
    axios({
        method: 'get',
        url: `${URL}/me`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

