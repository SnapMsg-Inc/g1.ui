import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colorText, colorWhite } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';

const ProfileStats = ({ navigation, data }) => {
    const { theme } = useTheme()
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
                            color: theme.whiteColor,
                            fontWeight: 'bold',
                            marginRight: 5,
                        }}
                    >
                        {data.follows}
                    </Text>
                    <Text
                        style={{
                            color: colorText,
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
                        color: theme.whiteColor,
                        fontWeight: 'bold',
                        marginRight: 5,
                    }}
                    >
                        {data.followers}
                    </Text>

                    <Text
                        style={{
                            color: colorText,
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
