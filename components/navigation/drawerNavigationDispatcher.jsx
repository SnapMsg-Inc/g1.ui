import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Octicons } from '@expo/vector-icons';
import styles from '../../styles/navigation/drawerNavDispatcher';
import { colorApp } from '../../styles/appColors/appColors';

export function ProfileButton({ navigation }) {
	const handleProfilePress = () => {
		navigation.navigate('Profile');
	}

	return (
	<TouchableOpacity onPress={handleProfilePress}>
		<View style={styles.container}>
			<FontAwesome5 name="user" color={colorApp} size={24} />
			<Text style={styles.text}>Profile</Text>
		</View>
	</TouchableOpacity>
	);
}

export function FeedButton({ navigation }) {
	const handleFeedPress = () => {
		navigation.navigate('Feed');
	}

	return (
	<TouchableOpacity onPress={handleFeedPress}>
		<View style={styles.container}>
			<Octicons name="home" color={colorApp} size={24} />
			<Text style={styles.text}>Feed</Text>
		</View>
	</TouchableOpacity>
	);
}

export function DiscoverButton({ navigation }) {
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
			<Text style={styles.text}>Discover</Text>
		</View>
	</TouchableOpacity>
	);
}

export function NotificationsButton({ navigation }) {
	const handleNotificationsPress = () => {
		navigation.navigate('Notifications');
	}

	return (
	<TouchableOpacity onPress={handleNotificationsPress}>
		<View style={styles.container}>
			<Octicons name="bell" color={colorApp} size={24} />
			<Text style={styles.text}>Notifications</Text>
		</View>
	</TouchableOpacity>
	);
}

export function MessagesButton({ navigation }) {
	const handleMessagesPress = () => {
		navigation.navigate('Messages');
	}

	return (
	<TouchableOpacity onPress={handleMessagesPress}>
		<View style={styles.container}>
			<Octicons name="bell" color={colorApp} size={24} />
			<Text style={styles.text}>Messages</Text>
		</View>
	</TouchableOpacity>
	);
}

