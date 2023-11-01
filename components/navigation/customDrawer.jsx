import React, {useState, useEffect, useContext} from 'react';
import {
  	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetUserData } from '../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';

const CustomDrawer = props => {
    const { onLogout } = useContext(AuthenticationContext)
    const { userData, fetchUserDataFromApi } = useContext(LoggedUserContext)
    
    useFocusEffect(
        React.useCallback(() => {
            fetchUserDataFromApi()
        }, [])
    );

    const defaultImage = require('../../assets/default_user_pic.png')
	
	return (
		<View style={{flex: 1}}>
			<DrawerContentScrollView style={styles.scrollView}>
				<View style={styles.headerContainer}>
					<Image
						source={userData.pic === '' || userData.pic === 'none' ? defaultImage : {uri : userData.pic}}
						style={styles.profileImage}
					/>
					<Text style={styles.nickname}>{userData.alias}</Text>
					<Text style={styles.username}>{`@${userData.nick}`}</Text>
					
					<View style={styles.followersContainer}>
						<Text style={{ color: '#535353' }}>
							<Text style={styles.followingCount}>{userData.follows}</Text> Following</Text>
						<Text style={{ color: '#535353' }}>
							<Text style={styles.followersCount}>{userData.followers}</Text> Followers</Text>
					</View>

				</View>

				<DrawerItemList {...props} />
				
				<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
					<View style={styles.signOutButton}>
						<TouchableOpacity onPress={onLogout}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Ionicons name="exit-outline" color={'#535353'} size={22} />	
								<Text
									style={{
										fontSize: 15,
										marginLeft: 5,
										color: '#535353',
									}}>
									Sign Out
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</DrawerContentScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
    scrollView: {
      	backgroundColor: '#000000',
    },
    headerContainer: {
		padding: 20,
		alignItems: 'flex-start',
    },
    profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 10,
    },
    nickname: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
    },
    username: {
		color: '#535353',
		fontSize: 16,
		fontWeight: 'normal',
    },
    followersContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		marginTop: 10,
    },
    followersCount: {
		color: 'white',
		fontWeight: 'bold',
    },
    followingCount: {
		color: 'white',
		fontWeight: 'bold',
    },
    signOutButton: {
		width: '50%',
		paddingVertical: 15,
    },
});

export default CustomDrawer
