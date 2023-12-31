import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'

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
import CreatePostScreen from '../common/createPost';
import EditPost from '../profileComponents/profileNavigation/editPost';
import { DiscoverButton, FeedButton, InsightsButton, MessagesButton, NotificationsButton, ProfileButton } from './drawerNavigationDispatcher';
import ChatScreen from '../messagesComponents/chatScreen';
import SearchUserScreen from '../messagesComponents/searchUser';
import { StatusBar } from 'react-native';
import { useTheme } from '../color/themeContext';
import { colorApp, colorBackground, colorWhite } from '../../styles/appColors/appColors';
import Insights from '../pages/insights';

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

			<ProfileStack.Screen name="EditPost"
				component={EditPost}
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

const MessagesStack = createStackNavigator();

function MessagesStackScreen() {
	return (
		<MessagesStack.Navigator initialRouteName="MessagesScreen">
			<MessagesStack.Screen name="MessagesScreen"
				component={Messages}
				options={{
					headerShown: false,
				}}
			/>

			<MessagesStack.Screen name="ChatScreen"
				component={ChatScreen}
				options={{
					headerShown: false,
				}}
			/>

			<MessagesStack.Screen name="SearchUserScreen"
				component={SearchUserScreen}
				options={{
					headerShown: false,
				}}
			/>
		</MessagesStack.Navigator>
	);
}


const Drawer = createDrawerNavigator();

export default function Home() {
	const { theme } = useTheme()
	return (
		<>
			<StatusBar
                backgroundColor={theme.backgroundColor === colorBackground ? colorBackground : colorWhite }
                barStyle={theme.backgroundColor === colorBackground ? 'light-content' : 'dark-content'}
            />
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
					options={({ navigation }) => ({
						headerShown: false,
						drawerLabel: () => (
						<ProfileButton navigation={navigation} />
						),
					})}
				/>
				<Drawer.Screen
					name="Feed"
					component={FeedStackScreen}
					options={({ navigation }) => ({
						headerShown: false,
						drawerLabel: () => (
						<FeedButton navigation={navigation} />
						),
					})}
				/>
				<Drawer.Screen
					name="Discover"
					component={DiscoverStackScreen}
					initialParams={{data:"your props"}}
					options={({ navigation }) => ({
						headerShown: false,
						drawerLabel: () => (
						<DiscoverButton navigation={navigation} />
						),
					})}
				/>
				<Drawer.Screen
					name="Notifications"
					component={Notifications}
					options={({ navigation }) => ({
						headerShown: false,
						drawerLabel: () => (
						<NotificationsButton navigation={navigation} />
						),
					})}
				/>
				<Drawer.Screen
					name="Messages"
					component={MessagesStackScreen}
					options={({ navigation }) => ({
						headerShown: false,
						drawerLabel: () => (
						<MessagesButton navigation={navigation} />
						),
					})}
				/>
				<Drawer.Screen
					name="Insights"
					component={Insights}
					options={({ navigation }) => ({
						headerShown: false,
						drawerLabel: () => (
						<InsightsButton navigation={navigation} />
						),
					})}
				/>
			</Drawer.Navigator>
		</>
	)
}