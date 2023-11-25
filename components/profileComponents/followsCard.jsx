import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import stylesFollow from '../../styles/buttons/buttonFollow';
import { deleteUserFollowByUid } from '../connectivity/servicesUser';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/profile/followsCard';

const MAX_INTEREST_LENGTH = 40;

const truncateInterest = (interest) => {
	const interests = interest.toString().replace(/,/g, ', ');
	if (interests.length <= MAX_INTEREST_LENGTH) {
		return interests;
	} else {
		return interests.slice(0, MAX_INTEREST_LENGTH) + ' ...';
	}
};

const FollowsCard = ({ uid, alias, nick, interests, pic }) => {
	const navigation = useNavigation();
	const { userData } = useContext(LoggedUserContext)
	const [isFollowing, setIsFollowing] = useState(true);

	const handleProfilePress = () => {
		if (uid !== userData.uid) {
			navigation.navigate('OtherProfileScreen', { id:uid });
		} else {
			navigation.navigate('ProfileScreen');
		}
	};

    const handleToggleFollow = () => {
		// Lógica para cambiar el estado de seguimiento (following o not following)
		deleteUserFollowByUid(uid);
		setIsFollowing(!isFollowing);
	};

	const defaultImage = require('../../assets/default_user_pic.png')

	return (
		<TouchableOpacity onPress={handleProfilePress}>
			<View style={styles.container}>
			<Image source={(pic === 'none') || (pic === '') ? defaultImage : { uri: pic }}
				style={styles.profileImage} />
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{alias}</Text>
				<Text style={styles.nick}>{`@${nick}`}</Text>
			</View>
			{userData.uid === uid ? <></> : (
				<TouchableOpacity
					style={[stylesFollow.card,
							isFollowing ? stylesFollow.followingButton : stylesFollow.notFollowingButton]}
					onPress={handleToggleFollow}
				>
					<Text style={isFollowing ? stylesFollow.followingButtonText : stylesFollow.followButtonText}>
						{isFollowing ? 'Following' : 'Follow'}
					</Text>
				</TouchableOpacity>
			)}
			</View>
		</TouchableOpacity>
	);
};

export default FollowsCard;
