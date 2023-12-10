import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import stylesFollow from "../../styles/buttons/buttonFollow";
import { deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';

function ButtonFollow ({ uid, following }) {
    const {userData} = useContext(LoggedUserContext)
    const [isFollowing, setIsFollowing] = useState(following);

    const handleToggleFollow = () => {
		// Lógica para cambiar el estado de seguimiento (following o not following)
		console.log('nick', userData.nick)
        isFollowing ? deleteUserFollowByUid(uid) : followUserByUid(uid, userData.nick)
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
    );
}

export default ButtonFollow
