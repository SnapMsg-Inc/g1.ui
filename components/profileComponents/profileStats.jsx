import React from 'react';
import { View, Text } from 'react-native';

const ProfileStats = (data) => {
	return (
        <View
            style={{
                flexDirection: 'row',
            }}
        >
            <Text
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginRight: 10,
                }}
            >
                70{' '}
                <Text
                    style={{
                        color: '#687684',
                        fontWeight: 'normal',
                    }}
                >
                    Following
                </Text>
            </Text>

            <Text
                style={{
                    color: 'white', fontWeight: 'bold'
                }}
            >
                106{' '}
                <Text
                    style={{
                        color: '#687684',
                        fontWeight: 'normal',
                    }}
                >
                    Followers
                </Text>
            </Text>
        </View>
	);
};

export default ProfileStats;
