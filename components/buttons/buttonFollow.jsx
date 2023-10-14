import React, { useState } from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import stylesFollow from "../../styles/buttons/buttonFollow";
import { getAuth } from 'firebase/auth'
import { useFocusEffect } from '@react-navigation/native';
import { checkIfUserFollows, deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser';

function ButtonFollow ({ uid }) {
    const [isFollowing, setIsFollowing] = useState(true);

	const fetchDataFromApi = async () => {
        try {
			await checkIfUserFollows(setIsFollowing, getAuth().currentUser.uid, uid);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

	useFocusEffect(
        React.useCallback(() => {
          	fetchDataFromApi()
        }, [])
    );

    const handleToggleFollow = () => {
		// Lógica para cambiar el estado de seguimiento (following o not following)
		isFollowing ? deleteUserFollowByUid(uid) : followUserByUid(uid)
		setIsFollowing(!isFollowing);
	};

    return (
        <TouchableOpacity
				style={[stylesFollow.followButton,
                        isFollowing ? stylesFollow.followingButton : stylesFollow.notFollowingButton]}
				onPress={handleToggleFollow}
			>
				<Text style={isFollowing ? stylesFollow.followingButtonText : stylesFollow.followButtonText}>
                    {isFollowing ? 'Following' : 'Follow'}
                </Text>
		</TouchableOpacity>
    )
}

export default ButtonFollow
