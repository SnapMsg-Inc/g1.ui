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
import * as Location from 'expo-location'
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendMetricsDD } from "../ddMetrics";

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
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
    const [isVerificate, setIsVerificate] = useState(false)

    useEffect(() => {
        const CheckIfLocationEnabled = async () => {
            let enabled = await Location.hasServicesEnabledAsync();
            if (!enabled)
                Alert.alert(
                    'Location Service not enabled',
                    'Please enable your location services to continue',
                    [{ text: 'OK' }],
                    { cancelable: false }
                ) 
            else
                setLocationServiceEnabled(enabled);
        }

        const checkAuth = () => {
            setIsLoadingApp(true)
            getAuth(firebaseApp).onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    if (isRegister || loginFederate) {
                        dispatchSignedIn({type:"SIGN_OUT"})
                        return
                    }
                    AsyncStorage.getItem('fcmToken')
                    .then(deviceToken => {
                        GetToken()
                        .then(token => {
                            RegisterTokenDevice(token, deviceToken)
                            .then(response => console.log('Token device updated ', response.status))
                            .catch(error => console.log('Error token device ', error.response.status))
                        })
                    });
                    dispatchSignedIn({type:"SIGN_IN", payload:"signed_in"})
                } else {
                    dispatchSignedIn({type:"SIGN_OUT"})
                }
                setIsLoadingApp(false)
            })
        }
        CheckIfLocationEnabled()
        checkAuth()
    },[])

    const onLogin = (email, password) => {
        const timeInit = Date.noew()
        setIsLoading(true)
        setError(false)
        LoginAccount(email, password)
        .then((userCredential) => {
            const timeLogin = Date.now() - timeInit
            sendMetricsDD('user_login_time', 'login_user_time', `user_login_time:${timeLogin}`)
            sendMetricsDD('user_login_failure', 'login_user_success', 'user_login_sucess')
            dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
            setIsLoading(false)
        })
        .catch((error) => {
            sendMetricsDD('user_login_failure', 'login_user_failure', 'user_login_failure')
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
                        sendMetricsDD('user_login_federate_success', 'login_user_federate_success', 'user_login_federate_sucess')
                        setLoginFederate(false)
                        setIsLoading(false)
                        dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                    })
                    .catch((error) => {
                        sendMetricsDD('user_login_federate_failure', 'login_user_federate_failure', 'user_login_federate_failure')
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
                sendMetricsDD('user_register_time', 'register_time', `register_time_user:${timeRegister}`)
                sendMetricsDD('user_register_success', 'register_success', 'register_success_user')
                dispatchSignedIn({type: 'SIGN_UP'})
                setIsLoading(false)
                navigateTo()
            })
            . catch((error) => {
                console.error(error.response.status)
                if (error.response.status === 502)
                    alert('Services not available.\nPlease try again later')
                deleteUser(auth.currentUser)
            })
        }).catch((error) => {
            sendMetricsDD('user_register_failed', 'register_failed', 'register_failed_user')
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
                        sendMetricsDD('user_register_federate_failed', 'register_federate_failed', 'register_federate_failed_user')
                        alert('User already exists.\nPlease sing in.')
                        onLogout()
                        setIsRegister(false)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.error('No users exists',error.response.status)
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
                                sendMetricsDD('user_register_federate_success', 'register_federate_success', 'register_federate_success_user')
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
                    markRegisterComplete,
                    locationServiceEnabled
                }
            } 
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

