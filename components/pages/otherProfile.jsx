import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { GetUserByUid } from '../connectivity/servicesUser';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import LikesScreen from '../profileComponents/profileNavigation/likesScreen'
import RepliesScreen from '../profileComponents/profileNavigation/repliesScreen'
import ButtonFollow from '../buttons/buttonFollow';

const tabBar = props => (
	<MaterialTabBar
		{...props}
		indicatorStyle={{ backgroundColor: '#1ed760', height: 3, }}
		style={styles.tabBar}
		activeColor='#1ed760'
		inactiveColor='#535353' 
		labelStyle={styles.label}
	/>
);



const OtherProfile = ({ navigation }) => {
	const route = useRoute();
	const { id } = route.params;
    const [data, setData] = useState({
        "uid": "",
        "alias": "",
        "interests": [],
        "pic": "",
        "nick": "",
        "followers": 0,
        "follows": 0,
    })

	const fetchDataFromApi = async () => {
		try {
			await GetUserByUid(setData, id);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
	
	useFocusEffect(
        React.useCallback(() => {
          	fetchDataFromApi()
        }, [])
    );

	const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<Tabs.Container
			tabContainerStyle={styles.tabContainer}
			renderHeader={() => (
				<ProfileHeader scrollY={scrollY} navigation={navigation}
								data={data} 
								headerButton={<ButtonFollow/>}/>
			)}
			pointerEvents={'box-none'}
			allowHeaderOverscroll
			renderTabBar={tabBar}
			>
			<Tabs.Tab name="Posts" label="Posts">
				<PostScreen data={data}/>
			</Tabs.Tab>

			<Tabs.Tab name="Replies" label="Replies">
				<RepliesScreen />
			</Tabs.Tab>

			<Tabs.Tab name="Likes" label="Likes">
				<LikesScreen />
			</Tabs.Tab>
		</Tabs.Container>
	);
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
  },
  label: {
    fontSize: 16,
    textTransform: 'none',
  },
});

export default OtherProfile;