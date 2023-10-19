import React, { useState, createContext, useReducer, useEffect} from "react";
import { CreateAccount,  LoginAccount, LogoutAccount } from "../authorization";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase";
import { GetUserData, postsUser } from "../servicesUser";
import { SignInReducer } from "../reducer/authReducer";

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
        console.log('autentico usuario')
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
            console.log('signed in ', signedIn)
            setIsLoading(false)
        })
        .catch((error) => {
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            setError(true)
            setIsLoading(false)
        })
    }

    const onRegister = (data, password, navigateTo) => {
        setIsLoading(true)
        setIsRegister(true)
        setError(false)
        CreateAccount(data.email, password)
        .then((userCredential) => {
            postsUser(data)
            dispatchSignedIn({type: 'SIGN_UP'})
            setIsLoading(false)
            navigateTo()
        }).catch((error) => {
            console.log(error.code);
            alert('Email already in use')
            setError(true)
            setIsLoading(false)
            setIsRegister(false)
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
                    onLogin,
                    onLogout,
                    markRegisterComplete
                }
            } 
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

