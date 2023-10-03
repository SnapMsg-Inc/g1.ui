import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MAX_INTEREST_LENGTH = 40;

const truncateInterest = (interest) => {
  if (interest.length <= MAX_INTEREST_LENGTH) {
    return interest;
  } else {
    return interest.slice(0, MAX_INTEREST_LENGTH) + ' ...';
  }
};

const FollowsCard = ({ navigation, uid, nick, interests, pic }) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const handleToggleFollow = () => {
    // Lógica para cambiar el estado de seguimiento (following o not following)
    setIsFollowing(!isFollowing);
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileScreen', { uid });
  };

  return (
	<TouchableOpacity onPress={handleProfilePress}>
		<View style={styles.container}>
		<Image source={{ uri: pic }} style={styles.profileImage} />
		<View style={styles.infoContainer}>
			<Text style={styles.name}>{nick}</Text>
			<Text style={styles.interests}>
			{truncateInterest(interests)}
			</Text>
		</View>
		<TouchableOpacity
			style={[styles.followButton, isFollowing ? styles.followingButton : styles.notFollowingButton]}
			onPress={handleToggleFollow}
		>
			<Text style={isFollowing ? styles.followingButtonText : styles.followButtonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
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
  },
  followButton: {
    paddingVertical: 5,
    borderRadius: 20,
	paddingHorizontal: 15,
	width: 110,
    backgroundColor: '#1ed760',
	alignItems: 'center'
  },
  followingButton: {
    backgroundColor: 'black',
    borderColor: '#1ed760',
    borderWidth: 0.8,
  },
  notFollowingButton: {
    backgroundColor: '#1ed760',
	paddingHorizontal: 10,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: '#1ed760',
    fontWeight: 'bold',
  },
});

export default FollowsCard;
