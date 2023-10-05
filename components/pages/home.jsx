import React, { useEffect } from 'react';
import { Octicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CommonActions } from '@react-navigation/native';

import Profile from "./profile";
import Feed from "./feed";
import Discover from "./discover";
import Notifications from "./notifications"
import Messages from "./messages";
import CustomDrawer from '../navigation/customDrawer';
import FollowingAndFollowersScreen from '../profileComponents/followingAndFollowersScreen';
import OtherProfile from './otherProfile';
import SetUpProfile from './setUpProfile';

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
	return (
		<ProfileStack.Navigator initialRouteName="ProfileScreen">
			{ /*Pantallas internas del perfil */}
			<ProfileStack.Screen name="ProfileScreen"
				component={Profile}
				options={{
					headerShown: false,
				}}
			/>

			<ProfileStack.Screen name="FollowingAndFollowersScreen"
				component={FollowingAndFollowersScreen}
				options={{
					headerShown: false,
				}}
			/>

			<ProfileStack.Screen name="OtherProfileScreen"
				component={OtherProfile}
				options={{
					headerShown: false,
				}}
			/>

			<ProfileStack.Screen name="SetUpProfile"
				component={SetUpProfile}
				options={{
					headerShown: false,
				}}
			/>
		</ProfileStack.Navigator>
	);
}

const Drawer = createDrawerNavigator();
const iconColor = '#1ED760';

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
                fontSize: 15,
              },
              swipeEdgeWidth: 150,            
            }}
            >
            <Drawer.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{              
                drawerIcon: ({size}) => (
                  <FontAwesome5 name="user" color={iconColor} size={size} />
                ),
                headerShown:false,							
				        swipeEdgeWidth: 0,
            }}
            />
            <Drawer.Screen
            name="Feed"
            component={Feed}
            options={{
              drawerIcon: ({size}) => (
                <Octicons name="home" size={size} color={iconColor} />
              ),
            }}
            />
            <Drawer.Screen
            name="Discover"
            component={Discover}
            options={{
              drawerIcon: ({size}) => (
                <Octicons name="search" size={size} color={iconColor} />
              ),
              }}
            />
            <Drawer.Screen
            name="Notifications"
            component={Notifications}
            options={{
                drawerIcon: ({size }) => (
                  <Octicons name="bell" color={iconColor} size={size} />
                ),
              }}
            />
            <Drawer.Screen
            name="Messages"
            component={Messages}
            options={{
                drawerIcon: ({size }) => (
                  <FontAwesome5 name="envelope" color={iconColor} size={size} />
                ),
              }}
            />
        </Drawer.Navigator>
    )
}