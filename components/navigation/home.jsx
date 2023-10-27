import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CommonActions } from '@react-navigation/native';

import Profile from "../pages/profile";
import Feed from "../pages/feed";
import Discover from "../pages/discover";
import Notifications from "../pages/notifications"
import Messages from "../pages/messages";
import CustomDrawer from './customDrawer';
import FollowingAndFollowersScreen from '../profileComponents/profileNavigation/followingAndFollowersScreen';
import OtherProfile from '../pages/otherProfile';
import EditProfile from '../profileComponents/profileNavigation/editProfile';
import SearchScreen from '../discoverComponents/searchScreen';
import CreatePostScreen from '../feedComponents/createPost';

const FeedStack = createStackNavigator();

function FeedStackScreen() {
	return (
		<FeedStack.Navigator initialRouteName="FeedScreen">
			<FeedStack.Screen name="FeedScreen"
				component={Feed}
				options={{
					headerShown: false,
				}}
			/>

			<DiscoverStack.Screen name="CreatePostScreen"
				component={CreatePostScreen}
				options={{
					headerShown: false,
				}}
			/>
		</FeedStack.Navigator>
	);
}

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
				component={EditProfile}
				options={{
					headerShown: false,
				}}
			/>
		</ProfileStack.Navigator>
	);
}

const DiscoverStack = createStackNavigator();

function DiscoverStackScreen() {
	return (
		<DiscoverStack.Navigator initialRouteName="DiscoverScreen">
			<DiscoverStack.Screen name="DiscoverScreen"
				component={Discover}
				options={{
					headerShown: false,
				}}
			/>

			<DiscoverStack.Screen name="SearchScreen"
				component={SearchScreen}
				options={{
					headerShown: false,
				}}
			/>
		</DiscoverStack.Navigator>
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
            component={FeedStackScreen}
            options={{
                drawerIcon: ({size}) => (
                    <Octicons name="home" size={size} color={iconColor} />
                ),
                headerShown:false,
            }}
            />
            <Drawer.Screen
            name="Discover"
            component={DiscoverStackScreen}
            options={{
                drawerIcon: ({size}) => (
                    <Octicons name="search" size={size} color={iconColor} />
                ),
                headerShown:false,
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