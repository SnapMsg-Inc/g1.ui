import React from 'react';
import { Animated } from 'react-native';

const HEADER_HEIGHT_EXPANDED = 75;
 
const ProfileImage = ({ scrollY, uri}) => {
    const profileImageUri = 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png';

    const pic = (uri === 'none') || (uri === '') ? profileImageUri : uri;

	return (
        <Animated.Image
            source={{
                uri: pic,
            }}
            style={{
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: 'black',
                marginTop: -30,
                transform: [
                {
                    scale: scrollY.interpolate({
                    inputRange: [0, HEADER_HEIGHT_EXPANDED],
                    outputRange: [1, 0.6],
                    extrapolate: 'clamp',
                    }),
                },
                {
                    translateY: scrollY.interpolate({
                    inputRange: [0, HEADER_HEIGHT_EXPANDED],
                    outputRange: [0, 16],
                    extrapolate: 'clamp',
                    }),
                },
                ],
            }}
        />
	);
};

export default ProfileImage;