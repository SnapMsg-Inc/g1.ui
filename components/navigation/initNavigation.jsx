import React, { useContext, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from '../pages/inits';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import FinishSignUp from '../pages/finishSignUp';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';

const Stack = createStackNavigator();

export default function InitNavigation() {
    const { isLoading, checkAuth } = useContext(AuthenticationContext)
    
    useEffect(() => {
        checkAuth()
    },[])

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor='black'
                barStyle={"light-content"}
            />
            { isLoading ? <ActivityIndicator size={'large'} color={'#1ed760'}/> : (
                <Stack.Navigator    
                        initialRouteName={'Inits'} 
                        screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inits" component={Inits}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    <Stack.Screen name='FinishSignUp' component={FinishSignUp}/>
                </Stack.Navigator>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#000',
        justifyContent: 'center',
    }
})
