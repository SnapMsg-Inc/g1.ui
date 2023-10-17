import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import stylesFollow from '../../styles/buttons/buttonFollow';
import { deleteUserFollowByUid } from '../connectivity/servicesUser';

const MAX_INTEREST_LENGTH = 40;

const truncateInterest = (interest) => {
	const interests = interest.toString().replace(/,/g, ', ');
	if (interests.length <= MAX_INTEREST_LENGTH) {
		return interests;
	} else {
		return interests.slice(0, MAX_INTEREST_LENGTH) + ' ...';
	}
};

const FollowsCard = ({ navigation, uid, nick, interests, pic }) => {
	const [isFollowing, setIsFollowing] = useState(true);

	const handleProfilePress = () => {
		navigation.navigate('OtherProfileScreen', { id:uid });
	};

    const handleToggleFollow = () => {
		// Lógica para cambiar el estado de seguimiento (following o not following)
		deleteUserFollowByUid(uid);
		setIsFollowing(!isFollowing);
	};

	const profileImageUri = 
	'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png';

	const uri = (pic === 'none') || (pic === '') ? profileImageUri : pic;

	return (
		<TouchableOpacity onPress={handleProfilePress}>
			<View style={styles.container}>
			<Image source={{ uri: uri }} style={styles.profileImage} />
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{nick}</Text>
				<Text style={styles.interests}>
				{truncateInterest(interests)}
				</Text>
			</View>
			<TouchableOpacity
				style={[stylesFollow.card,
                        isFollowing ? stylesFollow.followingButton : stylesFollow.notFollowingButton]}
				onPress={handleToggleFollow}
			>
				<Text style={isFollowing ? stylesFollow.followingButtonText : stylesFollow.followButtonText}>
                    {isFollowing ? 'Following' : 'Follow'}
                </Text>
			</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 40,
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
	interests: {
		fontSize: 14,
		color: 'white',
	}
});

export default FollowsCard;
