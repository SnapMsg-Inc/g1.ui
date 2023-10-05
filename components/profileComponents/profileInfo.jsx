import React from 'react';
import { View, Text } from 'react-native';
import ProfileImage from '../profileComponents/profileImage';
import ProfileStats from '../profileComponents/profileStats';
import SetUpProfileButton from '../buttons/buttonSetUpProfile';
import ProfileBanner from './profileBanner';

const HEADER_HEIGHT_NARROWED = 50;
const HEADER_HEIGHT_EXPANDED = 75;

const ProfileInfo = ({scrollY, navigation, data, headerButton }) => {
	return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: 'black',
            }}
        >
            {/* Banner */}
            <ProfileBanner scrollY={scrollY} />

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED}}>

                <ProfileImage scrollY={scrollY} uri={data.pic}/>
                {/* For self profile */}
                {headerButton}
            </View>
        
             <Text
            style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 10,
                }}
            >
                {data.fullname}
            </Text>

            <Text
                style={{
                    color: 'white',
                    fontSize: 15,
                    color: '#535353',
                    marginBottom: 15,
                }}
                >
                {`@${data.nick}`}
            </Text>

            {/* {data.ocupation !== null ? {} : 
            (<Text
                style={{
                    color: 'white',
                    marginBottom: 15, fontSize: 15 
                }}
            >
                   {data.ocupation}             
            </Text>)} */}
            
            <Text
                style={{
                    color: 'white',
                    marginBottom: 15, fontSize: 15 
                }}
            >

                {/* {data.zone.latitude}                 */}
            </Text>

            {/* Profile stats */}
            <ProfileStats navigation={navigation} data={data} />
        </View>
	);
};

export default ProfileInfo;