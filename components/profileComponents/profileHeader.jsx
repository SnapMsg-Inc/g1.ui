import React from 'react';
import { Animated, View, Text  } from 'react-native';
import BackButton from '../buttons/buttonBack';
import RefreshArrow from '../profileComponents/refreshArrow';
import ProfileNicknameHeader from '../profileComponents/profileNicknameHeader';

import { ScrollView } from 'react-native';
import ProfileInfo from './profileInfo';


export default function ProfileHeader({ scrollY , navigation, data}) {
    return (
       <Animated.View>
            {/* Back button */}
            <BackButton navigation={navigation} />

            {/* Refresh arrow */}
            {/* <RefreshArrow scrollY={scrollY} /> */}

            {/* Name when scroll down */}
            <ProfileNicknameHeader scrollY={scrollY} />

            {/* Profile Info / Nav Bar */}
            <ProfileInfo scrollY={scrollY} data={data}/>
            
       </Animated.View>
    );
}
