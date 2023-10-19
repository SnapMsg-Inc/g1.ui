import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowsCard from '../followsCard';
import { GetUserFollowsByUid } from '../../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';

const FollowingScreen = ({ navigation, uid }) => {

	const [follows, setFollows] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchDataFromApi = async () => {
        setLoading(true)
        GetUserFollowsByUid(setFollows, uid)
        .then(() => {
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching followers data:', error);
            setLoading(false)
        })
    }

	useFocusEffect(
        React.useCallback(() => {
			if (follows.length) {
				setFollows([])
		 	}
          	fetchDataFromApi()
        }, [uid])
    );

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				{loading ? <ActivityIndicator size={'large'} color={'#1ed760'}/> : 
					follows.map((item) => (
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