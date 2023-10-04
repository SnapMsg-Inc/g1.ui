import React, { useEffect, useState }  from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowsCard from './followsCard';
import { GetUserFollowsByUid } from '../connectivity/servicesUser';

const FollowingScreen = ({ navigation, uid }) => {

	const [follows, setFollows] = useState([])

	useEffect(()=>{
			const fetchDataFromApi = async () => {
				try {
					await GetUserFollowsByUid(setFollows, uid);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			}
			fetchDataFromApi()
	},[follows])

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				{follows.map((item) => (
					<FollowsCard
						navigation={navigation}
						key={item.uid}
						uid={item.uid}
						nick={item.nick}
						interests={item.interests}
						pic={item.pic}
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

export default FollowingScreen;