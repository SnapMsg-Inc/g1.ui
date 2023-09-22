import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableHighlight, StatusBar, SafeAreaView } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Feed from "./feed";
import Discover from "./discover";
import Notifications from "./notifications"
import Messages from "./messages";


const Drawer = createDrawerNavigator();

export default function Home() {
    return (
        <Drawer.Navigator
            initialRouteName='Feed'
            >
        
            <Drawer.Screen
            name="Feed"
            component={Feed}
            />
            <Drawer.Screen
            name="Discover"
            component={Discover}
            />
            <Drawer.Screen
            name="Notifications"
            component={Notifications}
            />
            <Drawer.Screen
            name="Messages"
            component={Messages}
            />
        </Drawer.Navigator>
    )
}