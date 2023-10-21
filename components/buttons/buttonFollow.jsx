import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import stylesFollow from "../../styles/buttons/buttonFollow";
import { deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser';

function ButtonFollow ({ uid, following }) {
    const [isFollowing, setIsFollowing] = useState(following);

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
    );
}

export default ButtonFollow
