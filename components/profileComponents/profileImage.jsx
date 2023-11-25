import React from 'react';
import { Animated } from 'react-native';
import { colorBackground } from '../../styles/appColors/appColors';

const HEADER_HEIGHT_EXPANDED = 75;
 
const ProfileImage = ({ scrollY, uri}) => {
    const defaultImage = require('../../assets/default_user_pic.png')

	return (
        <Animated.Image
            source={
                (uri === 'none') || (uri === '') ? defaultImage : { uri: uri}
            }
            style={{
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: colorBackground,
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