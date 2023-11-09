import React, { useState, createContext, useReducer, useEffect } from "react";
import {    CreateAccount,  
            DeleteUserFirebase, 
            LoginAccount,
            LogoutAccount,
            SignFederate,
            SignInWithGoogle } from "../authorization";
import { getAuth } from "firebase/auth";
import firebaseApp from "../firebase";
import { GetMe, GetToken, postsUser, postsUserFederate } from "../servicesUser";
import { SignInReducer } from "../reducer/authReducer";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [loginFederate, setLoginFederate] = useState(false)
    const [isLoadingApp, setIsLoadingApp] = useState(false)
    const [error, setError] = useState(false)
    const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
        userToken:null,
    })

    useEffect(() => {
        const checkAuth = () => {
            setIsLoadingApp(true)
            getAuth(firebaseApp).onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    if (isRegister || loginFederate) {
                        dispatchSignedIn({type:"SIGN_OUT"})
                        return
                    }
                    dispatchSignedIn({type:"SIGN_IN", payload:"signed_in"})
                } else {
                    dispatchSignedIn({type:"SIGN_OUT"})
                }
                setIsLoadingApp(false)
            })
        }
        checkAuth()
    },[])

    const onLogin = (email, password) => {
        setIsLoading(true)
        setError(false)
        LoginAccount(email, password)
        .then((userCredential) => {
            dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
            setIsLoading(false)
        })
        .catch((error) => {
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: 'SIGN_OUT'})
            setError(true)
            setIsLoading(false)
        })
    }
    
    const onLoginFederate = () => {
        setLoginFederate(true)
        setIsLoading(true)
        setError(false)        
        GoogleSignin.hasPlayServices();
        SignInWithGoogle()
        .then((currentUser) => {
            SignFederate(currentUser)
            .then((u) => {
                GetToken()
                .then((token)=>{
                    GetMe(token)
                    .then(()=>{
                        setLoginFederate(false)
                        setIsLoading(false)
                        dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                    })
                    .catch((error) => {
                        console.log(error.response.status)
                        if (error.response.status === 502)
                            alert('Services not available.\nPlease retry again later')
                        else if (error.response.status === 404){
                            alert('User not found.\nPlease create account.')
                            DeleteUserFirebase();
                        }
                        onLogout()
                        setLoginFederate(false)
                        setIsLoading(false)
                    })
                })
            })
        }) 
        .catch((error) => {
            alert('Invalid account.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: "SIGN_OUT"})
            setError(true)
            setIsLoading(false)
        })
    }

    const onRegister = (data, password, navigateTo) => {
        setIsLoading(true)
        setError(false)
        CreateAccount(data.email, password)
        .then((userCredential) => {
            setIsRegister(true)
            postsUser(data, false)
            dispatchSignedIn({type: 'SIGN_UP'})
            setIsLoading(false)
            navigateTo()
        }).catch((error) => {
            console.log('register', error.code);
            dispatchSignedIn({type: 'SIGN_OUT'})
            alert('Email already in use')
            setError(true)
            setIsLoading(false)
            setIsRegister(false)
        })
    }

    const onRegisterFederate = (navigateTo) => {
        setIsLoading(true)
        setIsRegister(true)
        setError(false)
        GoogleSignin.hasPlayServices();
        SignInWithGoogle()
        .then((currentUser) => {
            SignFederate(currentUser)
            .then((u) => {
                GetToken()
                .then((token)=>{
                    GetMe(token)
                    .then((response) => {
                        alert('User already exists.\nPlease sing in.')
                        onLogout()
                        setIsRegister(false)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.log(error.response.status)
                        if (error.response.status === 502){
                            alert('Services not available.\nPlease retry again later')
                            DeleteUserFirebase()
                            onLogout()
                            setIsLoading(false)
                        } else {
                            const {user} = currentUser 
                            user.givenName = user.givenName.replace(/ /g, '_')
                            console.log(JSON.stringify(user,null,2))
                            const today = new Date()
                            postsUserFederate({
                                "fullname": user.name,
                                "alias" : `${user.givenName} ${user.familyName}`,
                                "interests": [],
                                "zone": {
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "ocupation": '',
                                "pic": user.photo,
                                "email": user.email,
                                "nick": user.givenName,
                                "birthdate": today.toISOString().substring(0,10),
                            }, token)
                            .then(() => {
                                dispatchSignedIn({type: 'SIGN_UP'})
                                setIsLoading(false)
                                navigateTo()
                            }).catch((error) => {
                                DeleteUserFirebase()
                                onLogout()
                                setIsLoading(false)
                            })
                        }
                    })
                })
            })
        })
    }

    const onLogout = () => {
        dispatchSignedIn({type:"SIGN_OUT"})
        LogoutAccount()
    }

    const markRegisterComplete = () => {
        setIsRegister(false)
        dispatchSignedIn({type: 'SIGN_IN', payload: 'signed_in'})
    }

    return (
        <AuthenticationContext.Provider 
            value ={
                {
                    isAuthenticated: (signedIn.userToken === "signed_in") && !isRegister && !loginFederate,
                    signedIn,
                    isRegister,
                    loginFederate,
                    dispatchSignedIn,
                    isLoading,
                    isLoadingApp,
                    error,
                    onRegister,
                    onRegisterFederate,
                    onLogin,
                    onLoginFederate,
                    onLogout,
                    markRegisterComplete
                }
            } 
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

