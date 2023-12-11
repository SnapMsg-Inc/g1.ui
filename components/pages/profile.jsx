import React, { useEffect, useRef, useState, useContext } from 'react';
import { Text, Animated, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import SetUpProfileButton from '../buttons/buttonSetUpProfile';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import styles from '../../styles/profile/profile';
import MediaScreen from '../profileComponents/profileNavigation/mediaScreen';
import FavsScreen from '../profileComponents/profileNavigation/favsScreen';
import { CurrentPosition, GeocodeWithLocalityAndCountry, GetPermission, ReverseGeocode } from '../connectivity/location/permissionLocation';
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/FontAwesome';
import SnapShareScreen from '../profileComponents/profileNavigation/snapShareScreen';
import { useTheme } from '../color/themeContext';

const URL_POST = 'https://api-gateway-marioax.cloud.okteto.net/posts'


const Profile = ({ navigation }) => {
	const { userData, isLoadingUserData, countryLocate, locality } = useContext(LoggedUserContext)
	const { theme } = useTheme()

	const tabBar = props => (
		<MaterialTabBar
			{...props}
			indicatorStyle={{ backgroundColor: colorApp, height: 3, }}
			style={[styles.tabBar, {backgroundColor: theme.backgroundColor}]}
			activeColor={colorApp}
			inactiveColor={colorText} 
			labelStyle={styles.label}
		/>
	);
	
	const scrollY = useRef(new Animated.Value(0)).current;
	
	const getUrl = () => {
		return `${URL_POST}/me?`;
	}

	return (
		<>
			{ isLoadingUserData ? (
				<View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
					<ActivityIndicator size={'large'} color={colorApp}/>
					</View> 
				) : (
				
				<View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
					<Tabs.Container
						tabContainerStyle={[styles.tabBar, {backgroundColor: theme.backgroundColor}]}
						renderHeader={() => (
							<ProfileHeader scrollY={scrollY}
											navigation={navigation}
											data={userData}
											// location={`${countryLocate}, ${locality}`}
											location={
												<View style={{flexDirection: 'row'}}>
													<Icon name={'map-marker'}  color={colorText} size={20}/>
													{/* Location -> private data */}
													<Text style={{color: colorText, marginBottom: 15, fontSize: 15, marginLeft: 10}}>
														{`${countryLocate}, ${locality}`}
													</Text>
												</View>
											}
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
							<MediaScreen url={getUrl()}/>
						</Tabs.Tab>

						<Tabs.Tab name="SnapShare" label="Reposts">
							<SnapShareScreen/>
						</Tabs.Tab>

						<Tabs.Tab name="Favs" label="Favs">
							<FavsScreen />
						</Tabs.Tab>
					</Tabs.Container>	
					<PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
				</View> 
			)}
		</>	  
	);
};

export default Profile;
