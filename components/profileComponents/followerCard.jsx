import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import ButtonFollow from '../buttons/buttonFollow';
import stylesFollow from "../../styles/buttons/buttonFollow";
import { checkIfUserFollows, deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/profile/followerCard';

const MAX_INTEREST_LENGTH = 40;

const truncateInterest = (interest) => {
	const interests = interest.toString().replace(/,/g, ', ');
	if (interests.length <= MAX_INTEREST_LENGTH) {
		return interests;
	} else {
		return interests.slice(0, MAX_INTEREST_LENGTH) + ' ...';
	}
};

const FollowerCard = ({ uid, alias, nick, interests, pic }) => {
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
		isFollowing ? deleteUserFollowByUid(uid) : followUserByUid(uid, userData.nick)
		setIsFollowing(!isFollowing);
	};

	const defaultImage = require('../../assets/default_user_pic.png')
  
	return (
		<>
		{
			loading ? <></> : (
				<TouchableOpacity onPress={handleProfilePress}>
					<View style={styles.container}>
						<Image source={(pic === 'none') || (pic === '') ? defaultImage : { uri: pic }}
							style={styles.profileImage} />
						<View style={styles.infoContainer}>
							<Text style={styles.name}>{alias}</Text>
							<Text style={styles.nick}>{`@${nick}`}</Text>
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
				</TouchableOpacity>
				)
		}
		</>
	);
};

export default FollowerCard;

