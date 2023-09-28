import React from 'react';
import { View } from 'react-native';

import BackButton from '../buttons/buttonBack';
import RefreshArrow from '../profileComponents/refreshArrow';
import ProfileNicknameHeader from '../profileComponents/profileNicknameHeader';
import ProfileBanner from '../profileComponents/profileBanner';

export default function ProfileHeader({ scrollY , navigation}) {
    return (
       <View>
            {/* Back button */}
            <BackButton navigation={navigation} />

            {/* Refresh arrow */}
            <RefreshArrow scrollY={scrollY} />

            {/* Name when scroll down */}
            <ProfileNicknameHeader scrollY={scrollY} />

            {/* Banner */}
            <ProfileBanner scrollY={scrollY} />
       </View>
    );
}
