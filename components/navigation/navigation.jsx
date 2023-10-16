import { useContext } from "react"
import { AuthenticationContext } from "../connectivity/auth/authenticationContext"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../pages/home"
import InitNavigation from "./initNavigation"
import { SafeAreaView, View } from "react-native"

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext)

    return (
        <NavigationContainer>
            { isAuthenticated ? <Home/> : <InitNavigation/>}
        </NavigationContainer>
    )
}