import React, {useEffect, useState} from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from './components/pages/inits'
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import Preferences from './components/pages/preferences';
import Home from './components/pages/home';
import { getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import firebaseApp  from './components/connectivity/firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FinishSignUp from './components/pages/finishSignUp';

const Stack = createStackNavigator();
// const firebaseConfig = {
//     apiKey: "AIzaSyCmlfaciH4N_Ydih2RzNXEWr2G_V1En1sw",
//     authDomain: "snap-msg.firebaseapp.com",
//     projectId: "snap-msg",
//     storageBucket: "snap-msg.appspot.com",
//     messagingSenderId: "835956360594",
//     appId: "1:835956360594:web:62491d09ca2e166c4d6d4b"
// };

export default function App() {
    const [login, setLogin] = useState(false)
    const [routeName, setRouteName] = useState('Inits')
    
    const sessionIsActive = (firebase) => {
        const user = getAuth(firebaseApp).currentUser;
        console.log("User: " + user);
        const sessionActive = (user != null);
        console.log("sessionIsActive: " + sessionActive);
        if (sessionActive) {
            return "Home"
        }
        return "Init"
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor='black'
                barStyle={"light-content"}
            />
            <NavigationContainer>
                <Stack.Navigator    
                                    initialRouteName={sessionIsActive()} 
                                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inits" component={Inits}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    <Stack.Screen name='FinishSignUp' component={FinishSignUp}/>
                    <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#000'
    }
})
