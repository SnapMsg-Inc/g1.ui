import React, { useState } from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import stylesFollow from "../../styles/buttons/buttonFollow";


function ButtonFollow () {
    const [isFollowing, setIsFollowing] = useState(true);

    const handleToggleFollow = () => {
		// Lógica para cambiar el estado de seguimiento (following o not following)
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
