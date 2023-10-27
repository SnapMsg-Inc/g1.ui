import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreatePostScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}> CREATE POST </Text>
		</View>
	);
};

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center'
	},
    text: {
		color: colorText,
		paddingVertical: 10,
	},
});

export default CreatePostScreen;