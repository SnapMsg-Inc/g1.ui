import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const ProfileStats = ({ navigation, data }) => {
	return (
        <View
            style={{
                flexDirection: 'row',
            }}
        >

            <TouchableOpacity onPress={() => {navigation.navigate('FollowingAndFollowersScreen', { screen: 'FollowingScreen' })}} 
                style={{marginRight: 10,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            marginRight: 5,
                        }}
                    >
                        {data.follows}
                    </Text>
                    <Text
                        style={{
                            color: '#687684',
                            fontWeight: 'normal',
                        }}
                    >
                        Following
                    </Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {navigation.navigate('FollowingAndFollowersScreen', { screen: 'FollowersScreen' })}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: 5,
                    }}
                    >
                        {data.followers}
                    </Text>

                    <Text
                        style={{
                            color: '#687684',
                            fontWeight: 'normal',
                        }}
                    >
                        Followers
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
	);
};

export default ProfileStats;
