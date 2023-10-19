import { useContext, useEffect } from "react"
import { AuthenticationContext } from "../connectivity/auth/authenticationContext"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../pages/home"
import InitNavigation from "./initNavigation"
import RegisterNavigation from "./navigationRegister"

export const Navigation = () => {
    const { isAuthenticated, checkAuth, isRegister } = useContext(AuthenticationContext)
       
    useEffect(() => {
        checkAuth()
    },[])

    return (
        <NavigationContainer>
            { isAuthenticated ? <Home/> : ( isRegister ?  <RegisterNavigation/> : <InitNavigation/>)}
        </NavigationContainer>
    )
}