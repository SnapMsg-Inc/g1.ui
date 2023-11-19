import React, {useContext} from 'react';
import { Animated, View, Text, ActivityIndicator  } from 'react-native';
import BackButton from '../buttons/buttonBack';
import RefreshArrow from '../profileComponents/refreshArrow';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import ProfileInfo from './profileInfo';


export default function ProfileHeader({ scrollY , navigation, data, location, headerButton }) {
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
            
            {/* Profile Info / Nav Bar */}
			<ProfileInfo scrollY={scrollY} navigation={navigation} data={data} headerButton={headerButton} location={location}/>
       	</Animated.View>
    );
}
