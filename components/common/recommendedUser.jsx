import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import stylesFollow from '../../styles/buttons/buttonFollow';
import { checkIfUserFollows, deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser'
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/common/recommendedUser';
import { useTheme } from '../color/themeContext';

const MAX_INTEREST_LENGTH = 60;
const MAX_ALIAS_LENGTH = 14;
const MAX_NICK_LENGTH = 14;
const PROFILE_BANNER_URI =
  'https://png.pngtree.com/background/20210717/original/pngtree-ethical-hacking-matrix-technological-background-vector-picture-image_1437965.jpg';
  

const truncateInterest = (interest) => {
	const interests = interest.toString().replace(/,/g, ', ');
	if (interests.length <= MAX_INTEREST_LENGTH) {
		return interests;
	} else {
		return interests.slice(0, MAX_INTEREST_LENGTH) + ' ...';
	}
};

const truncateAlias = (alias) => {
	if (alias.length <= MAX_ALIAS_LENGTH) {
		return alias;
	} else {
		return alias.slice(0, MAX_ALIAS_LENGTH) + ' ...';
	}
};

const truncateNick = (nick) => {
	if (nick.length <= MAX_NICK_LENGTH) {
		return nick;
	} else {
		return nick.slice(0, MAX_NICK_LENGTH) + ' ...';
	}
};

const RecommendedUserCard = ({ uid, alias, nick, interests, pic }) => {
	const { theme } = useTheme()
	const navigation = useNavigation();
	const { userData } = useContext(LoggedUserContext)
	const [isFollowing, setIsFollowing] = useState(false);
	const [loading, setLoading] = useState(true)

	const fetchDataFromApi = async () => {
		if (userData.uid !== uid) {
			setLoading(true)
			checkIfUserFollows(setIsFollowing, userData.uid, uid)
			.then(() => {
				setLoading(false)
			})
			.catch((error) => {
				console.error('Error fetching data when checking if user follows other:', error);
				setLoading(false)
			})
		}
    }

	useFocusEffect(
        React.useCallback(() => {
          	fetchDataFromApi()
        }, [])
    );

	const handleProfilePress = () => {
		if (uid !== userData.uid) {
			navigation.navigate('Profile', {
				screen: 'OtherProfileScreen',
				initial: false,
				params: {id:uid}
			  });
		} else {
			navigation.navigate('Profile', {
				screen: 'ProfileScreen',
			  });
		}
  	};

	const handleToggleFollow = () => {
		// Lógica para cambiar el estado de seguimiento (following o not following)
		isFollowing ? deleteUserFollowByUid(uid) : followUserByUid(uid)
		setIsFollowing(!isFollowing);
	};

	const defaultImage = require('../../assets/default_user_pic.png')
  
	return (
		<>
		{
			loading ? <></> : (
				<TouchableOpacity onPress={handleProfilePress}>       
					<View style={styles.cardContainer}>
						<Image source={{uri:PROFILE_BANNER_URI}} style={styles.banner}/>
						<Image source={(pic === 'none') || (pic === '') ? defaultImage : { uri: pic }}
							style={styles.profileImage} />
						<View style={styles.container}>
							<View>
								<Text style={[styles.name, { color: theme.whiteColor}]}>{truncateAlias(alias)}</Text>
								<Text style={styles.nick}>{`@${truncateNick(nick)}`}</Text>
							</View>
							{	
								userData.uid === uid ? <></> : (
									<TouchableOpacity
										style={[stylesFollow.card,
												isFollowing ? stylesFollow.followingButton : stylesFollow.notFollowingButton]}
										onPress={handleToggleFollow}
									>
										<Text style={isFollowing ? stylesFollow.followingButtonText : stylesFollow.followButtonText}>
											{isFollowing ? 'Following' : 'Follow'}
										</Text>
									</TouchableOpacity>
								)
							}
						</View>
						<Text style={[styles.interests, { color: theme.whiteColor}]}>{truncateInterest(interests)}</Text>
					</View>
				</TouchableOpacity>
			)
		}
		</>
	);
};

export default RecommendedUserCard;
