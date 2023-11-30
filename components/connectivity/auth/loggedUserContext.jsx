import React, { useState, createContext} from "react";
import { GetUserData } from "../servicesUser";

export const LoggedUserContext = createContext()

export const LoggedUserContextProvider = ({children}) => {
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
        GetUserData(setUserData)
        .then(() => {
            setIsLoadingUserData(false)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            if (error.response.status === 502)
                alert('Services not available.\nPlease retry again later')
            setIsLoadingUserData(false)
        })
    }

    return (
        <LoggedUserContext.Provider 
            value ={
                {
                    userData,
                    isLoadingUserData,
                    fetchUserDataFromApi,
                }
            } 
        >
            {children}
        </LoggedUserContext.Provider>
    )
}

