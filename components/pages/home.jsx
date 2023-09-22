import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableHighlight, StatusBar, SafeAreaView } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Profile from "./profile";
import Feed from "./feed";
import Discover from "./discover";
import Notifications from "./notifications"
import Messages from "./messages";
import CustomDrawer from '../customDrawer';

const Drawer = createDrawerNavigator();

export default function Home() {
    return (
        <Drawer.Navigator
            initialRouteName='Feed'
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
              drawerActiveTintColor: '#ffffff',
              drawerInactiveTintColor: '#ffffff',
              drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
              },
            }}
            >
            <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{              
                drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="user" color={'#1ED760'} size={size} />
                ),
              }}
            />
            <Drawer.Screen
            name="Feed"
            component={Feed}
            options={{
              drawerIcon: ({color, size}) => (
                <Octicons name="home" size={size} color={'#1ED760'} />
              ),
            }}
            />
            <Drawer.Screen
            name="Discover"
            component={Discover}
            options={{
              drawerIcon: ({color, size}) => (
                <Octicons name="search" size={size} color={'#1ED760'} />
              ),
              }}
            />
            <Drawer.Screen
            name="Notifications"
            component={Notifications}
            options={{
                drawerIcon: ({ color, size }) => (
                  <Octicons name="bell" color={'#1ED760'} size={size} />
                ),
              }}
            />
            <Drawer.Screen
            name="Messages"
            component={Messages}
            options={{
                drawerIcon: ({ color, size }) => (
                  <FontAwesome5 name="envelope" color={'#1ED760'} size={size} />
                ),
              }}
            />
        </Drawer.Navigator>
    )
}