import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowerCard from './followerCard';
import { GetUserFollowersByUid } from '../connectivity/servicesUser';

const FollowersScreen = ({ navigation, uid }) => {

	const [followers, setFollowers] = useState([])

	useEffect(()=>{
		const fetchDataFromApi = async () => {
			try {
				await GetUserFollowersByUid(setFollowers, uid);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchDataFromApi()
	},[followers])

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				{followers.map((item) => (
					<FollowerCard
						navigation={navigation}
						uid={item.uid}
						nick={item.nick}
						interests={item.interests}
						pic={item.pic}
						key={item.uid}
					/>
				))}
			</View>
		</Tabs.ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	text: {
		fontSize: 20,
	},
});

export default FollowersScreen;