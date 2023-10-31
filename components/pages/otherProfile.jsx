import React, { useEffect, useRef, useState, useContext } from 'react';
import { Animated, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { GetUserByUid, checkIfUserFollows } from '../connectivity/servicesUser';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import LikesScreen from '../profileComponents/profileNavigation/likesScreen'
import RepliesScreen from '../profileComponents/profileNavigation/repliesScreen'
import ButtonFollow from '../buttons/buttonFollow';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';

const URL_POST = 'https://api-gateway-marioax.cloud.okteto.net/posts'

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
	const { userData } = useContext(LoggedUserContext)
	const [isFollowing, setIsFollowing] = useState(false);
	const route = useRoute();
	const { id } = route.params;
	const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        GetUserByUid(setData, id)
		checkIfUserFollows(setIsFollowing, userData.uid, id)
        .then(() => {
            setIsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching other user data:', error);
            setIsLoading(false)
        })
    }

	useFocusEffect(
        React.useCallback(() => {
          	fetchDataFromApi()
        }, [])
    );

	const scrollY = useRef(new Animated.Value(0)).current;

	const getUrl = () => {
		//TODO: PAGINACION!!
		return `${URL_POST}?nick=${data.nick}&limit=${100}&page=${0}`;
	}

	return (
		<View style={styles.container}>
			{ isLoading ? <ActivityIndicator size={'large'} color={'#1ed760'}/> : (
				<Tabs.Container
					tabContainerStyle={styles.tabContainer}
					renderHeader={() => (
						<ProfileHeader scrollY={scrollY} navigation={navigation}
										data={data} 
										headerButton={<ButtonFollow uid={id} following={isFollowing}/>}/>
					)}
					pointerEvents={'box-none'}
					allowHeaderOverscroll
					renderTabBar={tabBar}
					>
					<Tabs.Tab name="Posts" label="Posts">
						<PostScreen url={getUrl()}/>
					</Tabs.Tab>

					<Tabs.Tab name="Replies" label="Replies">
						<RepliesScreen />
					</Tabs.Tab>

					<Tabs.Tab name="Likes" label="Likes">
						<LikesScreen />
					</Tabs.Tab>
				</Tabs.Container>
		)}

		</View> 
	);
};

const styles = StyleSheet.create({
	container: {
        flex:1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
	tabBar: {
		backgroundColor: 'black',
	},
	label: {
		fontSize: 16,
		textTransform: 'none',
	},
});

export default OtherProfile;