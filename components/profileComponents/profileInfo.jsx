import React from 'react';
import { View, Text } from 'react-native';
import ProfileImage from '../profileComponents/profileImage';
import ProfileStats from '../profileComponents/profileStats';
import SetUpProfileButton from '../buttons/buttonSetUpProfile';
import ProfileBanner from './profileBanner';
import { colorApp, colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HEADER_HEIGHT_NARROWED = 50;
const HEADER_HEIGHT_EXPANDED = 75;

const ProfileInfo = ({scrollY, navigation, data, headerButton, location }) => {
    const { theme } = useTheme()
	return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: theme.backgroundColor,
            }}
        >
            {/* Banner */}
            <ProfileBanner scrollY={scrollY} />

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED}}>

                <ProfileImage scrollY={scrollY} uri={data.pic}/>
                {/* For self profile */}
                {headerButton}
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text
                    style={{
                        color: theme.whiteColor,
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginTop: 10,
                        }}
                >
                    {data.alias}
                </Text>
                {data.is_admin ? <MaterialIcons name="admin-panel-settings" size={25} color={theme.whiteColor} style={{marginTop: 10, color: colorApp, paddingVertical: 8, paddingHorizontal: 10}}/> : null}
                {console.log(data)}
            </View>
            <Text
                style={{
                    color: colorWhite,
                    fontSize: 15,
                    color: colorText,
                    marginBottom: 15,
                }}
                >
                {`@${data.nick}`}
            </Text>

            {/* {data.ocupation !== null ? {} : 
            (<Text
                style={{
                    color: colorWhite,
                    marginBottom: 15, fontSize: 15 
                }}
            >
                   {data.ocupation}             
            </Text>)} */}
            
            <Text
                style={{
                    color: theme.whiteColor,
                    marginBottom: 15, fontSize: 15 
                }}
            >
                {data.interests.toString().replace(/,/g, ', ')}
            </Text>
            
            {location}
            
            {/* Profile stats */}
            <ProfileStats navigation={navigation} data={data} />
        </View>
	);
};

export default ProfileInfo;