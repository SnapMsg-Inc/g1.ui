import React, { useState, createContext, useReducer, useEffect} from "react";
import { CreateAccount,  LoginAccount, LogoutAccount, SignFederate, SignInWithGoogle } from "../authorization";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase";
import { GetUserData, postsUser, postsUserFederate } from "../servicesUser";
import { SignInReducer } from "../reducer/authReducer";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isLoadingApp, setIsLoadingApp] = useState(false)
    const [error, setError] = useState(false)
    const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
        userToken:null,
    })

    const checkAuth = () => {
        setIsLoadingApp(true)
        getAuth(firebaseApp).onAuthStateChanged((userCredential) => {
            if (userCredential) {
                console.log('creation: ', userCredential.metadata.creationTime)
                console.log('sigintime: ', userCredential.metadata.lastSignInTime)
                dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                setIsLoadingApp(false)
            } else {
                dispatchSignedIn({type:"SIGN_OUT"})
                setIsLoadingApp(false)
            }
        })
    }

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
        setIsLoading(true)
        setError(false)
        GoogleSignin.hasPlayServices();
        SignInWithGoogle()
        .then((currentUser) => {
            SignFederate(currentUser)
            .then((u) => {
                dispatchSignedIn({type: 'SIGN_IN', payload: 'signed_in'})
                setIsLoading(false)
            })
        }) 
        .catch((error) => {
            alert('Invalid account.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: 'SIGN_OUT'})
            setError(true)
            setIsLoading(false)
        })
    }

    const onRegister = (data, password) => {
        setIsLoading(true)
        setError(false)
        CreateAccount(data.email, password)
        .then((userCredential) => {
            setIsRegister(true)
            postsUser(data, false)
            dispatchSignedIn({type: 'SIGN_UP'})
            setIsLoading(false)
        }).catch((error) => {
            console.log('register', error.code);
            dispatchSignedIn({type: 'SIGN_OUT'})
            alert('Email already in use')
            setError(true)
            setIsLoading(false)
            setIsRegister(false)
        })
    }

    const onRegisterFederate = () => {
        setIsLoading(true)
        setIsRegister(false)
        setError(false)
        GoogleSignin.hasPlayServices();
        SignInWithGoogle()
        .then((currentUser) => {
            SignFederate(currentUser)
            .then((u) => {
                const {user} = currentUser 
                user.givenName = user.givenName.replace(/ /g, '_')
                console.log(JSON.stringify(user,null,2))
                const today = new Date()
                postsUserFederate({
                    "fullname": user.name,
                    "alias" : `${user.givenName} ${user.familyName}`,
                    "interests": [],
                    "zone": {"latitude": 0,
                    "longitude": 0},
                    "ocupation": '',
                    "pic": user.photo,
                    "email": user.email,
                    "nick": user.givenName,
                    "birthdate": today.toISOString().substring(0,10),
                }, setIsRegister, setIsLoading, onLogout)
                dispatchSignedIn({type: 'SIGN_UP'})
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
                    isAuthenticated: (signedIn.userToken === "signed_in") && !isRegister,
                    signedIn,
                    isRegister,
                    dispatchSignedIn,
                    isLoading,
                    isLoadingApp,
                    error,
                    checkAuth,
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

