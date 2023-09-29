import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from './components/pages/inits'
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import Preferences from './components/pages/preferences';
import { initializeApp } from 'firebase/app';

const Stack = createStackNavigator();
const firebaseConfig = {
    apiKey: "AIzaSyCmlfaciH4N_Ydih2RzNXEWr2G_V1En1sw",
    authDomain: "snap-msg.firebaseapp.com",
    projectId: "snap-msg",
    storageBucket: "snap-msg.appspot.com",
    messagingSenderId: "835956360594",
    appId: "1:835956360594:web:62491d09ca2e166c4d6d4b"
};


export default function App() {
    initializeApp(firebaseConfig);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor='black'
                barStyle={"light-content"}
            />
            <NavigationContainer>
                <Stack.Navigator    initialRouteName="Inits" 
                                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inits" component={Inits}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    <Stack.Screen name="Preferences" component={Preferences}/>
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
