import React, { useContext, useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from '../pages/inits';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';
import FinishSignUp from '../pages/finishSignUp';
import { colorApp, colorBackground } from '../../styles/appColors/appColors';
import ForgotPassword from '../pages/forgot';

const Stack = createStackNavigator();

export default function InitNavigation() {
    const { isLoadingApp } = useContext(AuthenticationContext)
        
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colorBackground}
                barStyle={"light-content"}
            />
            { isLoadingApp ? <ActivityIndicator size={'large'} color={colorApp}/> : (
                <Stack.Navigator    
                        initialRouteName='Inits' 
                        screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inits" component={Inits}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    <Stack.Screen name="Finish" component={FinishSignUp}/>
                    <Stack.Screen name="Forgot" component={ForgotPassword}/>
                </Stack.Navigator>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colorBackground,
        justifyContent: 'center',
    }
})
