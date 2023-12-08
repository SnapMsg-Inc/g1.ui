import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Octicons } from '@expo/vector-icons';
import styles from '../../styles/navigation/drawerNavDispatcher';
import { colorApp } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';


export function ProfileButton({ navigation }) {
	const { theme } = useTheme()
	const handleProfilePress = () => {
		navigation.navigate('Profile');
	}
	
	return (
		<TouchableOpacity onPress={handleProfilePress}>
			<View style={styles.container}>
				<FontAwesome5 name="user" color={colorApp} size={24} />
				<Text style={[styles.text, {color: theme.whiteColor}]}>Profile</Text>
			</View>
		</TouchableOpacity>
	);
}

export function FeedButton({ navigation }) {
	const { theme } = useTheme()
	const handleFeedPress = () => {
		navigation.navigate('Feed');
	}

	return (
		<TouchableOpacity onPress={handleFeedPress}>
			<View style={styles.container}>
				<Octicons name="home" color={colorApp} size={24} />
				<Text style={[styles.text, {color: theme.whiteColor}]}>Feed</Text>
			</View>
		</TouchableOpacity>
	);
}

export function DiscoverButton({ navigation }) {
	const { theme } = useTheme()
	const handleDiscoverPress = () => {
		navigation.navigate('Discover', {
			screen: 'DiscoverScreen',
			params: {
				searchQuery: null
			}
		});
	}

	return (
		<TouchableOpacity onPress={handleDiscoverPress}>
			<View style={styles.container}>
				<Octicons name="search" color={colorApp} size={24} />
				<Text style={[styles.text, {color: theme.whiteColor}]}>Discover</Text>
			</View>
		</TouchableOpacity>
	);
}

export function NotificationsButton({ navigation }) {
	const { theme } = useTheme()
	const handleNotificationsPress = () => {
		navigation.navigate('Notifications');
	}

	return (
		<TouchableOpacity onPress={handleNotificationsPress}>
			<View style={styles.container}>
				<Octicons name="bell" color={colorApp} size={24} />
				<Text style={[styles.text, {color: theme.whiteColor}]}>Notifications</Text>
			</View>
		</TouchableOpacity>
	);
}

export function MessagesButton({ navigation }) {
	const { theme } = useTheme()
	const handleMessagesPress = () => {
		navigation.navigate('Messages');
	}

	return (
	<TouchableOpacity onPress={handleMessagesPress}>
		<View style={styles.container}>
			<FontAwesome5 name="envelope" color={colorApp} size={24} />
			<Text style={[styles.text, {color: theme.whiteColor}]}>Messages</Text>
		</View>
	</TouchableOpacity>
	);
}
