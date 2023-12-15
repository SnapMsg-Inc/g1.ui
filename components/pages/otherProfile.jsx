import React, { useEffect, useRef, useState, useContext } from 'react';
import { Animated, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { GetUserByUid, checkIfUserFollows } from '../connectivity/servicesUser';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import ButtonFollow from '../buttons/buttonFollow';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import styles from '../../styles/profile/otherProfile';
import { colorApp, colorBackground, colorText } from '../../styles/appColors/appColors';
import MediaScreen from '../profileComponents/profileNavigation/mediaScreen';

const URL_POST = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/posts'

const tabBar = props => (
	<MaterialTabBar
		{...props}
		indicatorStyle={{ backgroundColor: colorApp, height: 3, }}
		style={styles.tabBar}
		activeColor={colorApp}
		inactiveColor={colorText} 
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
		is_admin: false,
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
		return `${URL_POST}?nick=${data.nick}`;
	}

	return (
		<View style={styles.container}>
			{ isLoading ? <ActivityIndicator size={'large'} color={colorApp}/> : (
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
						{	
							// To ensure that data is already loaded
							data.nick.length > 0 ? (
								<PostScreen url={getUrl()}/>
							) : <></>
						}
					</Tabs.Tab>

					<Tabs.Tab name="Media" label="Media">
						{	
							// To ensure that data is already loaded
							data.nick.length > 0 ? (
								<MediaScreen url={getUrl()}/>
							) : <></>
						}
					</Tabs.Tab>
				</Tabs.Container>
		)}

		</View> 
	);
};

export default OtherProfile;
