import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/discover/discoverHeader';
import { colorText, colorApp, colorBackground } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';

export default function DiscoverHeader({ navigation }) {
    const { theme } = useTheme()

    const handleSearchPress = () => {
        navigation.navigate('SearchScreen');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <TouchableOpacity onPress={handleSearchPress}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { 
                            navigation.dispatch(DrawerActions.openDrawer())
                        }}
                    >
                        <Octicons name="three-bars" size={22} 
                            color={colorApp} 
                        />
                    </TouchableOpacity>
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
            </TouchableOpacity>
        </View>
    );
}
