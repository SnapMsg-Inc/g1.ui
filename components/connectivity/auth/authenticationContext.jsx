import React, { useState, createContext, useReducer, useEffect} from "react";
import { LoginAccount, LogoutAccount } from "../authorization";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase";

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)

    const checkAuth = () =>
        setIsLoading(true)
        getAuth(firebaseApp).onAuthStateChanged((userCredential) => {
            if (userCredential) {
                setUser(userCredential)
                setIsLoading(false)
            } else {
                setUser(null)
                setIsLoading(false)
            }
        })

    const onLogin = (email, password) => {
        setIsLoading(true)
        console.log(`login ${email} ${password}`)
        LoginAccount(email, password)
        .then((userCredential) => {
            console.log('user', JSON.stringify(userCredential))
            setUser(userCredential)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(`Error: ${JSON.stringify(error, null, 2)}`)
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            setIsLoading(false)
        })
    }

    const onLogout = () => {
        setUser(null)
        LogoutAccount()
    }

    return (
        <AuthenticationContext.Provider 
            value ={
                {
                    isAuthenticated: !!user,
                    user,
                    isLoading,
                    checkAuth,
                    onLogin,
                    onLogout
                }
            } 
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

