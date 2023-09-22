import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inits from './components/pages/inits'
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import Preferences from './components/pages/preferences';
import Home from './components/pages/home';

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
                <Stack.Screen name="Preferences" component={Preferences}/>
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
