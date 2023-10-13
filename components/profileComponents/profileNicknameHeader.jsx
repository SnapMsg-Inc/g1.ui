import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const ProfileNicknameHeader = ({ scrollY }) => {
    const insets = useSafeAreaInsets();
    const nickname = 'Nickname';

    return (
        <Animated.View
        style={{
            zIndex: 2,
            position: 'absolute',
            top: insets.top + 15,
            left: 0,
            right: 0,
            marginLeft: 70,
            alignItems: 'flex-start',
            opacity: scrollY.interpolate({
            inputRange: [90, 110],
            outputRange: [0, 1],
            }),
            transform: [{
                translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [30, 0],
                extrapolate: 'clamp',
                }),
            },],
        }}>
        <Text style={styles.font}>{nickname}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    font: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileNicknameHeader;

