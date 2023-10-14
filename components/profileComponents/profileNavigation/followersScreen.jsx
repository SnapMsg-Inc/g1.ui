import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowerCard from '../followerCard';
import { GetUserFollowersByUid } from '../../connectivity/servicesUser';
import { getAuth } from 'firebase/auth'

const FollowersScreen = ({ navigation, uid }) => {

	const [followers, setFollowers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		if (followers.length) {
			setFollowers([])
		}
		const fetchDataFromApi = async () => {
			try {
				await GetUserFollowersByUid(setFollowers, uid);
				setLoading(false)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchDataFromApi()
	},[uid])

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				{loading ? <></> : 
					followers.map((item) => (
						<FollowerCard
							navigation={navigation}
							loggedUid={getAuth().currentUser.uid}
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