import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/notifications/notificationHeader';
import { colorText, colorApp, colorBackground } from '../../styles/appColors/appColors';

export default function NotificationHeader({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight
                    onPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Octicons name="bell" color={colorApp} size={24} />
                        <Text style={styles.font}>Notifications</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.containerLogo}>
                    <Icon name="snapchat-ghost" color={colorApp} size={30}/>
                    <Icon name="envelope" color={colorApp} size={10}/>
                    {/* <Text style={styles.fontLogo}>SnapMsg</Text> */}
                </View>
            </View>
        </View>
    );
}
