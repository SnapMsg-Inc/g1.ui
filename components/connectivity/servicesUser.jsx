import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, deleteUser } from 'firebase/auth'
import axios from 'axios';
import { auth, firebaseApp } from './firebase';

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'
const URL_POST = 'https://api-gateway-marioax.cloud.okteto.net/posts'

export async function GetUsers(setState, query) {
    const token = await getIdToken(auth.currentUser, false);

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
        console.error(JSON.stringify(error.response, null, 2))
    });
}

export async function GetUserData(state) {
    const token = await getIdToken(auth.currentUser, false);

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
        console.error(JSON.stringify(error.response, null, 2))
    })
}

export async function GetUserByUid(setState, uid) {
    const token = await getIdToken(auth.currentUser, false);
  
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
        console.error(JSON.stringify(error.response, null, 2))
    });
}

export async function GetUserDataByUid(uid) {
    const token = await getIdToken(auth.currentUser, false);
  
    const queryParams = {
      uid: uid,
      maxResults: 1,
      pages: 1,
    };

    const queryString = new URLSearchParams(queryParams).toString();
  
    const urlWithQueryParams = `${URL}?${queryString}`;
  
    try {
        const response = await axios({
            method: 'get',
            url: urlWithQueryParams,
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });
        return response.data[0];
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2));
    }
}

export async function GetUserFollowersByUid(uid, maxResults = 100, page = 0) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL}/${uid}/followers?limit=${maxResults}&page=${page}`;

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
        console.error(JSON.stringify(error.response, null, 2));
    }
}

export async function GetUserFollowsByUid(setState, uid) {
    const token = await getIdToken(auth.currentUser, false);
  
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
        console.error(JSON.stringify(error.response, null, 2))
    });
}

export const postsUser = async (data) => {
    const token = await getIdToken(auth.currentUser, false)
    await axios({
        method: 'post',
        url: URL,
        data: data,
        headers: { 
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
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
    const token = await getIdToken(auth.currentUser, false);
  
    const urlWithQueryParams = `${URL}/me/follows/${uid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function checkIfUserFollows(setIsFollowing, uid, otherUid) {
    const token = await getIdToken(auth.currentUser, false);

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
            console.error(JSON.stringify(error.response, null, 2))
            setIsFollowing(false)
        }
    }
}

export async function followUserByUid(uid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL}/me/follows/${uid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}


export const createPost = async (text, pic, isPrivate, hashtags) => {
    const token = await getIdToken(auth.currentUser, false)

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
        console.error(JSON.stringify(error.response, null, 2))
    })
}

export async function GetPosts(url, maxResults = 100, page = 0) {
    const token = await getIdToken(auth.currentUser, false);
    
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
        console.error(JSON.stringify(error.response, null, 2));
    }
}

export async function GetFavPosts(maxResults = 100, page = 0) {
    const token = await getIdToken(auth.currentUser, false);
    const urlWithQueryParams = `${URL_POST}/favs?limit=${maxResults}&page=${page}`;

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
        console.error(JSON.stringify(error.response, null, 2));
    }
}

export async function addPostToFav(pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/favs/${pid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function deletePostFromFav(pid) {
    const token = await getIdToken(auth.currentUser, false);
  
    const urlWithQueryParams = `${URL_POST}/favs/${pid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function GetFeedPosts(maxResults = 100, page = 0) {
    const token = await getIdToken(auth.currentUser, false);
    
    const url = `${URL_POST}/feed?limit=${maxResults}&page=${page}`;

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
        console.error(JSON.stringify(error.response, null, 2));
    }
}

export async function likePost(pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/likes/${pid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function unlikePost(pid) {
    const token = await getIdToken(auth.currentUser, false);
  
    const urlWithQueryParams = `${URL_POST}/likes/${pid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function GetRecommendedPosts(setState, uid, maxResults, page) {
    const token = await getIdToken(auth.currentUser, false);

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
        console.error(JSON.stringify(error.response, null, 2))
    })
}

export async function deletePost(pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/${pid}`;
    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export async function PatchPostData(data, pid) {
    const token = await getIdToken(auth.currentUser, false);

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
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export const GetToken = () => getIdToken(auth.currentUser, false) 

export const GetMe = (token) => 
    axios({
        method: 'get',
        url: `${URL}/me`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })


export async function checkIfUserLiked(setIsLiked, pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/likes/${pid}`;

    try {
        const response = await axios.get(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    } catch (error) {
        if (error.response.status === 404) {
            setIsLiked(false)
        } else {
            console.error(JSON.stringify(error.response, null, 2))
            setIsLiked(false)
        }
    }
}

export async function checkIfUserFaved(setIsFaved, pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/favs/${pid}`;

    try {
        const response = await axios.get(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            setIsFaved(true)
        } else {
            setIsFaved(false)
        }
    } catch (error) {
        if (error.response.status === 404) {
            setIsFaved(false)
        } else {
            console.error(JSON.stringify(error.response, null, 2))
            setIsFaved(false)
        }
    }
}

const URL_NOT = 'https://messages-ms-messages-ms-marioax.cloud.okteto.net'

export const RegisterTokenDevice = (token) => {
    axios({
        method: 'post',
        url: `${URL_NOT}/register-token`,
        data:  {
            "user_id": auth.currentUser.uid,
            "token": token
        }
    })
}

export const SendNotificationFollow = (uid) => {
    axios({
        method: 'post',
        url: `${URL}/notify-follow/${'New%Follow'}/${uid}/`,
    })
}

export async function GetSnapSharedPosts(maxResults = 100, page = 0) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/me/snapshares?limit=${maxResults}&page=${page}`;

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
        console.error(JSON.stringify(error.response, null, 2));
    }
}

export async function snapSharePost(pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/snapshares/${pid}`;

    try {
        await axios.post(urlWithQueryParams, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function deletePostFromSnapshared(pid) {
    const token = await getIdToken(auth.currentUser, false);
  
    const urlWithQueryParams = `${URL_POST}/snapshares/${pid}`;

    try {
        await axios.delete(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.response, null, 2))
    }
}

export async function checkIfUserSnapShared(setIsSnapshared, pid) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `${URL_POST}/snapshares/${pid}`;

    try {
        const response = await axios.get(urlWithQueryParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            setIsSnapshared(true)
        } else {
            setIsSnapshared(false)
        }
    } catch (error) {
        if (error.response.status === 404) {
            setIsSnapshared(false)
        } else {
            console.error(JSON.stringify(error.response, null, 2))
            setIsSnapshared(false)
        }
    }
}

export async function GetTrendings(maxResults = 100, page = 0) {
    const token = await getIdToken(auth.currentUser, false);

    const urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/trendings?limit=${maxResults}&page=${page}`;

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
        console.error(JSON.stringify(error.response, null, 2));
    }
}