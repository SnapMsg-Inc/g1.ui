import React, { useState, createContext, useContext} from "react";
import { GetUserData } from "../servicesUser";
import { useEffect } from "react";
import { AuthenticationContext } from "./authenticationContext";
import { GetPermission, ReverseGeocode } from "../location/permissionLocation";
import { Alert } from "react-native";

export const LoggedUserContext = createContext()

export const LoggedUserContextProvider = ({children}) => {
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [isLoadingUserData, setIsLoadingUserData] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [locality, setLocality] = useState('')
    const [countryLocate, setCountryLocate] = useState('')

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
            // if (error.response.status === 502)
            //     alert('Services not available.\nPlease try again later')
            setIsLoadingUserData(false)
        })
    }

    const handleUpdateData = () => {
        setIsRefreshing(true)
        fetchUserDataFromApi()
        setIsRefreshing(false)
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDataFromApi()
            
            GetPermission()
            .then((location) => {
                if (location.status !== 'granted')
                    Alert.alert(
                        'Permission not granted',
                        'Allow the app to use location service.',
                        [{ text: 'OK' }],
                        { cancelable: false }
                    );
                else
                    setData()
            })
        }

        const setData = async () => {
            if (userData.zone.latitude !== 0 && userData.zone.longitude !== 0)
                await ReverseGeocode(userData.zone)
                .then((address) => {
                    const { city, country } = address[0]
                    setLocality(city)
                    setCountryLocate(country)
                }).catch((error) => {
                    console.error(error)
                })
        }  
    },[isAuthenticated, isRefreshing])

    return (
        <LoggedUserContext.Provider 
            value ={
                {
                    userData,
                    isLoadingUserData,
                    fetchUserDataFromApi,
                    handleUpdateData,
                    countryLocate,
                    locality,
                }
            } 
        >
            {children}
        </LoggedUserContext.Provider>
    )
}

