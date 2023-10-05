import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import BackButton from '../buttons/buttonBack';

export default function FollowersHeader({ navigation, fullname }) {

    return (
       <View style={styles.container}>
            {/* Back button */}
            <BackButton onPress={() => {navigation.navigate('ProfileScreen')}}/>
            <Text style={styles.label}>
                {fullname}
            </Text>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'black',
    },
    label: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        top: 10,
        left: 0,
        right: 0,
        marginLeft: 70,
        marginBottom: 15,
    },
  });