import React, {useState, useEffect, useContext} from 'react';
import {
  	View,
	Text,
	Image,
	TouchableOpacity,
	Switch
} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import styles from '../../styles/navigation/customDrawer';
import { colorText, colorApp, colorBackground } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';

const CustomDrawer = props => {
    const { onLogout } = useContext(AuthenticationContext)
    const { theme, toggleTheme } = useTheme()
    const { userData, fetchUserDataFromApi } = useContext(LoggedUserContext)
    
    // useFocusEffect(
    //     React.useCallback(() => {
    //         fetchUserDataFromApi()
    //     }, [])
    // );

    const defaultImage = require('../../assets/default_user_pic.png')
	
	return (
		<View style={{flex: 1}}>
			<DrawerContentScrollView style={[styles.scrollView, { backgroundColor: theme.backgroundColor}]}>
				<View style={styles.headerContainer}>
					<Image
						source={userData.pic === '' || userData.pic === 'none' ? defaultImage : {uri : userData.pic}}
						style={styles.profileImage}
					/>
					<Text style={[styles.nickname, {color: theme.whiteColor}]}>{userData.alias}</Text>
					<Text style={styles.username}>{`@${userData.nick}`}</Text>
					
					<View style={styles.followersContainer}>
						<Text style={{ color: colorText }}>
							<Text style={[styles.followingCount,{color: theme.whiteColor}]}>{userData.follows}</Text> Following</Text>
						<Text style={{ color: colorText }}>
							<Text style={[styles.followersCount,{color: theme.whiteColor}]}>{userData.followers}</Text> Followers</Text>
					</View>

				</View>

				<DrawerItemList {...props} />
				
				<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
					<View style={styles.signOutButton}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Switch value={theme.backgroundColor === colorBackground}
										onValueChange={toggleTheme}/>
							<Text
								style={{
									fontSize: 15,
									marginLeft: 5,
									color: theme.colorText,
								}}>
								Dark mode
							</Text>
						</View>
						<TouchableOpacity onPress={onLogout}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Ionicons name="exit-outline" color={colorText} size={22} />	
								<Text
									style={{
										fontSize: 15,
										marginLeft: 5,
										color: colorText,
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

export default CustomDrawer
