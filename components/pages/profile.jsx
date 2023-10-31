import React, { useEffect, useRef, useState, useContext } from 'react';
import { Animated, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { GetUserData } from '../connectivity/servicesUser';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import LikesScreen from '../profileComponents/profileNavigation/likesScreen'
import RepliesScreen from '../profileComponents/profileNavigation/repliesScreen'
import SetUpProfileButton from '../buttons/buttonSetUpProfile';
import { useFocusEffect } from '@react-navigation/native';
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

const Profile = ({ navigation }) => {
	const { userData, isLoadingUserData, fetchUserDataFromApi } = useContext(LoggedUserContext)

	useFocusEffect(
        React.useCallback(() => {
          	fetchUserDataFromApi()
        }, [])
    );

	const scrollY = useRef(new Animated.Value(0)).current;

	const getUrl = () => {
		//TODO: PAGINACION!!
		return `${URL_POST}/me?limit=${100}&page=${0}`;
	}

	return (
		<View style={styles.container}>
			{ isLoadingUserData ? <ActivityIndicator size={'large'} color={'#1ed760'}/> : (
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

export default Profile;