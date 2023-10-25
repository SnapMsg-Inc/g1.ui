import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrendingScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Trending!!</Text>
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

export default TrendingScreen;