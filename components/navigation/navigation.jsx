import { useContext } from "react"
import { AuthenticationContext } from "../connectivity/auth/authenticationContext"
import { NavigationContainer } from "@react-navigation/native"
import Home from "./home"
import InitNavigation from "./initNavigation"

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext)

    return (
        <NavigationContainer>
            { isAuthenticated ? <Home/> : <InitNavigation/> }
        </NavigationContainer>
    )
}