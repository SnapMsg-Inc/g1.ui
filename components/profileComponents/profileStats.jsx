import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const ProfileStats = ({ navigation, data }) => {
	return (
        <View
            style={{
                flexDirection: 'row',
            }}
        >

            <TouchableOpacity onPress={() => {
                navigation.navigate('FollowingAndFollowersScreen',
                                    {data: data})
                }} 
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
                            color: '#535353',
                            fontWeight: 'normal',
                        }}
                    >
                        Following
                    </Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {
                navigation.navigate('FollowingAndFollowersScreen',
                                    {data: data})
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
                        {data.followers}
                    </Text>

                    <Text
                        style={{
                            color: '#535353',
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
