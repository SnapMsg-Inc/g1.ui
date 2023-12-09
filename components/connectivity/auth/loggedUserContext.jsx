import React, { useState, createContext, useContext} from "react";
import { GetUserData } from "../servicesUser";
import { useEffect } from "react";
import { AuthenticationContext } from "./authenticationContext";

export const LoggedUserContext = createContext()

export const LoggedUserContextProvider = ({children}) => {
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [isLoadingUserData, setIsLoadingUserData] = useState(false)
    const [userData, setUserData] = useState({
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

    const fetchUserDataFromApi = async () => {
        setIsLoadingUserData(true)
        await GetUserData(setUserData)
        .then(() => {
            setIsLoadingUserData(false)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error.response.status);
            if (error.response.status === 502)
                alert('Services not available.\nPlease retry again later')
            setIsLoadingUserData(false)
        })
    }

    const handleUpdateData = () => 
        fetchUserDataFromApi()

    useEffect(() => {
        if (isAuthenticated)
            fetchUserDataFromApi()
    },[isAuthenticated])

    return (
        <LoggedUserContext.Provider 
            value ={
                {
                    userData,
                    isLoadingUserData,
                    fetchUserDataFromApi,
                    handleUpdateData
                }
            } 
        >
            {children}
        </LoggedUserContext.Provider>
    )
}

