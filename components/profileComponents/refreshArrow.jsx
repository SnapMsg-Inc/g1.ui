import React from 'react';
import { Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colorWhite } from '../../styles/appColors/appColors';

export default function RefreshArrow({ scrollY }) {
    const insets = useSafeAreaInsets();

    return (
        <Animated.View
            style={{
                zIndex: 2,
                position: 'absolute',
                top: insets.top + 13,
                left: 0,
                right: 0,
                alignItems: 'center',
                opacity: scrollY.interpolate({
                inputRange: [-20, 0],
                outputRange: [1, 0],
                }),
                transform: [
                {
                    rotate: scrollY.interpolate({
                    inputRange: [-45, -35],
                    outputRange: ['180deg', '0deg'],
                    extrapolate: 'clamp',
                    }),
                },
                ],
            }}
            >
            <Feather name="arrow-down" color={colorWhite} size={25} />
        </Animated.View>
    );
}
