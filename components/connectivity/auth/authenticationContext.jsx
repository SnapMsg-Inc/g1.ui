import React, { useState, createContext, useReducer, useEffect} from "react";
import { CreateAccount,  LoginAccount, LogoutAccount } from "../authorization";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase";
import { GetUserData, postsUser } from "../servicesUser";

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(null)
    const [data, setData] = useState({
        "uid": "",
        "alias": "",
        "fullname": "",
        "interests": [],
        "zone": {"latitude": 0,
                "longitude": 0},
        "is_admin": false,
        "ocupation": null,
        "pic": "",
        "email": "",
        "nick": "",
        "birthdate": "",
        "followers": 0,
        "follows": 0,
    })

    const checkAuth = () =>
        setIsLoading(true)
        getAuth(firebaseApp).onAuthStateChanged((userCredential) => {
            if (userCredential) {
                setUser(userCredential)
                setIsLoading(false)
                if (isRegistrationComplete === null)
                    verifyRegistration()
            } else {
                setUser(null)
                setIsLoading(false)
                setIsRegistrationComplete(false)
            }
        })

    const onLogin = (email, password) => {
        setIsLoading(true)
        setError(false)
        LoginAccount(email, password)
        .then((userCredential) => {
            setUser(userCredential)
            setIsLoading(false)
        })
        .catch((error) => {
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            setError(true)
            setIsLoading(false)
        })
    }

    const onRegister = (data, password) => {
        setIsLoading(true)
        setError(false)
        CreateAccount(data.email, password)
        .then((userCredential) => {
            postsUser(data)
            setUser(userCredential)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error.code);
            alert('Email already in use')
            setError(true)
            setIsLoading(false)
        })
    }

    const onLogout = () => {
        setUser(null)
        LogoutAccount()
    }

    const markRegistrationComplete = () => {
        setIsRegistrationComplete(true);
    }

    const verifyRegistration = () => {
        GetUserData(setData)
        console.log('data context', data)
        setIsRegistrationComplete(data.zone.latitude !== 0 & data.zone.longitude !== 0)
    }

    return (
        <AuthenticationContext.Provider 
            value ={
                {
                    isAuthenticated: !!user,
                    user,
                    isLoading,
                    error,
                    checkAuth,
                    onRegister,
                    isRegistrationComplete,
                    onLogin,
                    onLogout,
                    markRegistrationComplete
                }
            } 
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

