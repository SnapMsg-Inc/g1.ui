import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from './components/inits'
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import CancelButton from './components/buttons/buttonCancel';

const Stack = createStackNavigator();

export default function App() {
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
