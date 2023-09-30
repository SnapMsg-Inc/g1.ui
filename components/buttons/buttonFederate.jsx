import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesButtonFederate from "../../styles/buttons/buttonFederate";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, getAuth } from "firebase/auth";

GoogleSignin.configure({
    webClientId: '835956360594-7msbe422kdle04b7kdb4uqput39giim9.apps.googleusercontent.com'
});


// Somewhere in your code
const signIn = async () => {
    try {
        const auth = getAuth()
        await GoogleSignin.hasPlayServices();
        const currentUser = await GoogleSignin.signIn();
        console.log(currentUser)
        const googleCredential = GoogleAuthProvider.credential(currentUser.idToken);
        console.log(`credentials: ${googleCredential}`)
        await signInWithCredential(auth, googleCredential);
    } catch (error) {
        console.log(error)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
    }
    // try {
    //     await GoogleSignin.hasPlayServices();
    //     const {idToken} = await GoogleSignin.signIn();
    //     console.log(idToken)
    //     const googleCredential = GoogleAuthProvider.credential(idToken);
    //     await signInWithCredential(getAuth(), googleCredential);
    // } catch (error) {
    //     console.log(`Error ${error}`)
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //     } else {
    //     // some other error happened
    //     }
    // }
};

function ButtonFederate({name}) {
    return (
        <TouchableHighlight onPress={signIn}>
            <View style={stylesButtonFederate.btn}>
                <Icon name={name.toLowerCase()} size={25} />
                <Text style={stylesButtonFederate.fontBtn}>
                    Continue with {name}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default ButtonFederate