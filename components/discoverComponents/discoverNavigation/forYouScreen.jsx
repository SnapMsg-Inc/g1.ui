import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForYouScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>For you!!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		color: 'white'
	},
});

export default ForYouScreen;