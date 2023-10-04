import React, { useEffect, useState }  from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowsCard from './followsCard';
import { GetUserFollowsByUid } from '../connectivity/servicesUser';

// function generateFollows(limit) {
// 	return new Array(limit).fill(0).map((_, index) => {
// 		return {
// 		key: index.toString(),
// 		uid: '',
// 		nick: 'Juan Roman Riquelme',
// 		interests: 'Quiero la libertadores boca boca bocaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
// 		pic: 'https://tmssl.akamaized.net/images/foto/galerie/juan-roman-riquelme-boca-juniors-2000-1575894721-28108.jpg?lm=1575894731',
// 		};
// 	});
// }

// const MOCKED_FOLLOWS = generateFollows(8);

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