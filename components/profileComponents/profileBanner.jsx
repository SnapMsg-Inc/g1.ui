import React from 'react';
import { Animated, ImageBackground, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const HEADER_HEIGHT_NARROWED = 50;
const HEADER_HEIGHT_EXPANDED = 75;
const PROFILE_BANNER_URI =
  'https://png.pngtree.com/background/20210717/original/pngtree-ethical-hacking-matrix-technological-background-vector-picture-image_1437965.jpg';
  
const ProfileBanner = ({ scrollY }) => {
	return (
		<AnimatedImageBackground
			source={{
				uri: PROFILE_BANNER_URI,
			}}
			style={{
				position:'absolute',
				left: 0,
				right: 0,
				height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
				transform: [
					{
						scale: scrollY.interpolate({
							inputRange: [-200, 0],
							outputRange: [5, 1],
							extrapolateLeft: 'extend',
							extrapolateRight: 'clamp',
						}),
					},
				],
			}}
		>
			<AnimatedBlurView
				tint="dark"
				intensity={96}
				style={{
					...StyleSheet.absoluteFillObject,
					zIndex: 2,
					opacity: scrollY.interpolate({
						inputRange: [-50, 0, 50, 100],
						outputRange: [1, 0, 0, 1],
					}),
				}}
			/>
		</AnimatedImageBackground>
	);
};

export default ProfileBanner;