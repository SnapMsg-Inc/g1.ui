import React, { useEffect, useRef, useState, useContext } from 'react';
import { Animated, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import LikesScreen from '../profileComponents/profileNavigation/likesScreen'
import SetUpProfileButton from '../buttons/buttonSetUpProfile';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import styles from '../../styles/profile/profile';
import MediaScreen from '../profileComponents/profileNavigation/mediaScreen';

const URL_POST = 'https://api-gateway-marioax.cloud.okteto.net/posts'

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

const Profile = ({ navigation }) => {
	const { userData, isLoadingUserData, fetchUserDataFromApi } = useContext(LoggedUserContext)

	useFocusEffect(
        React.useCallback(() => {
          	fetchUserDataFromApi()
        }, [])
    );

	const scrollY = useRef(new Animated.Value(0)).current;

	const getUrl = () => {
		return `${URL_POST}/me?`;
	}

	return (
		<>
			{ isLoadingUserData ? (
				<View style={styles.container}>
					<ActivityIndicator size={'large'} color={colorApp}/>
					</View> 
				) : (
				
				<View style={styles.container}>
					<Tabs.Container
						tabContainerStyle={styles.tabContainer}
						renderHeader={() => (
							<ProfileHeader scrollY={scrollY}
											navigation={navigation}
											data={userData}
											headerButton={<SetUpProfileButton navigation={navigation} 
																				data={userData}/>}/>
						)}
						pointerEvents={'box-none'}
						allowHeaderOverscroll
						renderTabBar={tabBar}
						>
						<Tabs.Tab name="Posts" label="Posts">
							<PostScreen url={getUrl()}/>
						</Tabs.Tab>

						<Tabs.Tab name="Media" label="Media">
							<MediaScreen />
						</Tabs.Tab>

						<Tabs.Tab name="Favs" label="Favs">
							<LikesScreen />
						</Tabs.Tab>
					</Tabs.Container>	
					<PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
				</View> 
			)}
		</>	  
	);
};

export default Profile;
