import React, { useState, createContext, useReducer, useEffect } from "react";
import {    CreateAccount,  
            DeleteUserFirebase, 
            LoginAccount,
            LogoutAccount,
            SignFederate,
            SignInWithGoogle } from "../authorization";
import { getAuth } from "firebase/auth";
import firebaseApp, { auth } from "../firebase";
import { GetMe, GetToken, RegisterTokenDevice, postsUser, postsUserFederate } from "../servicesUser";
import { SignInReducer } from "../reducer/authReducer";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendMetricsDD } from "../ddMetrics";

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [loginFederate, setLoginFederate] = useState(false)
    const [isLoadingApp, setIsLoadingApp] = useState(false)
    const [error, setError] = useState(false)
    const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
        userToken:null,
    })
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)

    useEffect(() => {
        const checkAuth = () => {
            setIsLoadingApp(true)
            getAuth(firebaseApp).onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    if (isRegister || loginFederate || isLogin) {
                        dispatchSignedIn({type:"SIGN_OUT"})
                        return
                    }
                    AsyncStorage.getItem('fcmToken')
                    .then(deviceToken => {
                        GetToken()
                        .then(token => {
                            RegisterTokenDevice(token, deviceToken)
                            .catch(error => console.error('Error token device ', error.response))
                        })
                    });
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
        const timeInit = Date.now()
        setIsLoading(true)
        setError(false)
        setIsLogin(true)
        LoginAccount(email, password)
        .then(async (userCredential) => {
            await GetToken()
            .then(async token => {
                await GetMe(token)
                .then(response => {
                    if (response.data.is_blocked) {
                        onLogout()
                        setIsLoading(false)
                        sendMetricsDD('users.login_failure', 'incr', '1', [])
                        alert('Your account is blocked.\nPlease contact with Admin.')
                    } else {
                        const timeLogin = Date.now() - timeInit
                        sendMetricsDD('users.login_time.hist','hist', `${timeLogin}.00`, [])
                        sendMetricsDD('users.login_success', 'incr', '1', [])
                        dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                        setIsLoading(false)
                    }
                })
                .catch(error => console.log('Error in login', error?.response?.status))
                .finally(() => setIsLogin(false))
            })
            .catch(error => console.log('Token error',error))
            .finally(() => setIsLogin(false))
        })
        .catch((error) => {
            sendMetricsDD('user.login_failure', 'incr', '1',[])
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: 'SIGN_OUT'})
            setError(true)
            setIsLoading(false)
            setIsLogin(false)
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
                    .then((response)=>{
                        if (response.data.is_blocked) {
                            onLogout();
                            setIsLoading(false);
                            setLoginFederate(false);
                            sendMetricsDD('users.login_failure_federate', 'incr', '1',[])
                            alert('Your account is blocked.\nPlease contact with Admin.')
                        } else {
                            sendMetricsDD('users.login_success_federate', 'incr', '1',[])
                            setLoginFederate(false)
                            setIsLoading(false)
                            dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                        }
                    })
                    .catch((error) => {
                        sendMetricsDD('user.login_failure_federate', 'incr', '1',[])
                        console.error(error.response.status)
                        if (error.response.status === 502)
                            alert('Services not available.\nPlease try again later')
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

    const onRegister = (data, password,time, navigateTo) => {
        setIsLoading(true)
        setIsRegister(true)
        setError(false)
        CreateAccount(data.email, password)
        .then((userCredential) => {
            postsUser(data, false)
            .then((response) => {
                const timeRegister = Date.now() - time
                sendMetricsDD('users.register_time.hist','hist', `${timeRegister}.00`,[])
                sendMetricsDD('users.register_success', 'incr', '1',[])
                dispatchSignedIn({type: 'SIGN_UP'})
                setIsLoading(false)
                navigateTo()
            })
            . catch((error) => {
                console.error(error.response.status)
                if (error.response.status === 502)
                    alert('Services not available.\nPlease try again later')
                DeleteUserFirebase()
                setIsLoading(false)
            })
        }).catch((error) => {
            sendMetricsDD('users.register_failure', 'incr', '1',[])
            console.error('register', error.code);
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
                        sendMetricsDD('users.register_failure_federate', 'incr', '1',[])
                        alert('User already exists.\nPlease sing in.')
                        onLogout()
                        setIsRegister(false)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        if (error.response.status >= 500){
                            alert('Services not available.\nPlease try again later')
                            DeleteUserFirebase()
                            onLogout()
                            setIsLoading(false)
                        } else {
                            const {user} = currentUser 
                            user.givenName = user.givenName.replace(/ /g, '_')

                            const today = new Date()
                            postsUserFederate({
                                "fullname": user.name,
                                "alias" : `${user.givenName} ${user.familyName}`,
                                "interests": [],
                                "zone": {
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "ocupation": 'Not Found',
                                "pic": user.photo,
                                "email": user.email,
                                "nick": user.givenName,
                                "birthdate": today.toISOString().substring(0,10),
                            }, token)
                            .then(() => {
                                sendMetricsDD('users.register_success_federate', 'incr', '1',[])
                                dispatchSignedIn({type: 'SIGN_UP'})
                                navigateTo()
                                setIsLoading(false)
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
        .catch(error => {
            console.log('error', error)
            setIsLoading(false)
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
                    isAuthenticated: (signedIn.userToken === "signed_in") && !isRegister && !loginFederate && !isLogin,
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
                    markRegisterComplete,
                    locationServiceEnabled
                }
            } 
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

