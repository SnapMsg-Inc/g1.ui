import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FinishSignUp from '../pages/finishSignUp';

const Register = createStackNavigator();

export default function RegisterNavigation() {
        
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor='black'
                barStyle={"light-content"}
            />
            <Register.Navigator    
                        initialRouteName='FinishSignUp' 
                        screenOptions={{ headerShown: false }}>
                <Register.Screen name='FinishSignUp' component={FinishSignUp}/>
            </Register.Navigator>
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
