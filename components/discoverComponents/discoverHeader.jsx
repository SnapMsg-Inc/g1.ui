import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/discover/discoverHeader';
import { colorText, colorApp, colorBackground } from '../../styles/appColors/appColors';

export default function DiscoverHeader({ navigation }) {
    const handleSearchPress = () => {
        navigation.navigate('SearchScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={handleSearchPress}>
                <View style={styles.header}>
                    <TouchableHighlight
                        onPress={() => { 
                            navigation.dispatch(DrawerActions.openDrawer())
                        }}
                    >
                        <Octicons name="three-bars" size={22} 
                            color={colorApp} 
                        />
                    </TouchableHighlight>
                    <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    
                        <Octicons name="search" size={22} 
                            color={colorText} 
                        />
                            <Text style={styles.searchBoxPlaceholder}>Search</Text>
                    </View>
                    <View style={styles.containerLogo}>
                        <Icon name="snapchat-ghost" color={colorApp} size={30}/>
                        <Icon name="envelope" color={colorApp} size={10}/>
                        {/* <Text style={styles.fontLogo}>SnapMsg</Text> */}
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
