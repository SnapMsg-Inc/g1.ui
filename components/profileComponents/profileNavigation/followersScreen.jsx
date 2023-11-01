import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowerCard from '../followerCard';
import { GetUserFollowersByUid } from '../../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';

const FollowersScreen = ({ navigation, uid }) => {

	const [followers, setFollowers] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchDataFromApi = async () => {
        setLoading(true)
        GetUserFollowersByUid(setFollowers, uid)
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
			if (followers.length) {
				setFollowers([])
		 	}
          	fetchDataFromApi()
        }, [uid])
    );

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				{loading ? <ActivityIndicator size={'large'} color={'#1ed760'} style={{padding: 10}}/> : 
					followers.map((item) => (
						<FollowerCard
							uid={item.uid}
							alias={item.alias}
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
		backgroundColor: 'black',
	},
	text: {
		fontSize: 20,
	},
});

export default FollowersScreen;