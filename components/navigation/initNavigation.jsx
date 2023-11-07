import React, { useContext, useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from '../pages/inits';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';
import FinishSignUp from '../pages/finishSignUp';

const Stack = createStackNavigator();

export default function InitNavigation() {
    const { isLoadingApp } = useContext(AuthenticationContext)
        
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor='black'
                barStyle={"light-content"}
            />
            { isLoadingApp ? <ActivityIndicator size={'large'} color={'#1ed760'}/> : (
                <Stack.Navigator    
                        initialRouteName='Inits' 
                        screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Inits" component={Inits}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                    <Stack.Screen name="Finish" component={FinishSignUp}/>
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
