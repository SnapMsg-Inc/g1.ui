import React from 'react';
import { Animated } from 'react-native';

const HEADER_HEIGHT_EXPANDED = 75;
const PROFILE_PICTURE_URI =
  'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp';

  
const ProfileImage = ({ scrollY }) => {
	return (
        <Animated.Image
            source={{
                uri: PROFILE_PICTURE_URI,
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