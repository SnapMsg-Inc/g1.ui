import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
    },
    header: {
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    containerLogo: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fontLogo: {
        color: colorApp,
        fontSize: 25,
        marginLeft: 20,
    },
    font: {
        color: colorApp,
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    searchBox: {
        paddingHorizontal: 20,
        
    },
    searchBoxPlaceholder: {
        color: colorText,
        marginLeft: 5,
    },
});