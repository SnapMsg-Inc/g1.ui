import { useContext } from "react"
import { AuthenticationContext } from "../connectivity/auth/authenticationContext"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../pages/home"
import InitNavigation from "./initNavigation"
import { SafeAreaView, View } from "react-native"
import FinishSignUp from "../pages/finishSignUp"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext)

    return (
        <NavigationContainer>
            { isAuthenticated ? <Home/> : <InitNavigation/>}
        </NavigationContainer>
    )
}