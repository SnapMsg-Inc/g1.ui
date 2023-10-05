import React from 'react';
import { Animated, View, Text  } from 'react-native';
import BackButton from '../buttons/buttonBack';
import RefreshArrow from '../profileComponents/refreshArrow';
import ProfileNicknameHeader from '../profileComponents/profileNicknameHeader';
import { DrawerActions, CommonActions } from '@react-navigation/native';

import ProfileInfo from './profileInfo';


export default function ProfileHeader({ scrollY , navigation, data, headerButton }) {
    return (
       <Animated.View>
            {/* Back button */}
            <BackButton onPress={() => { 
                navigation.dispatch(DrawerActions.openDrawer())
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'ProfileScreen',
                        },
                      ],
                    })
                )
                }} />

            {/* Refresh arrow */}
            {/* <RefreshArrow scrollY={scrollY} /> */}

            {/* Name when scroll down */}
            {/* <ProfileNicknameHeader scrollY={scrollY} /> */}

            {/* Profile Info / Nav Bar */}
            <ProfileInfo scrollY={scrollY} navigation={navigation} data={data} headerButton={headerButton}/>
            
       </Animated.View>
    );
}
