import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import styles from '../../styles/discover/discover';
import NotificationHeader from '../notificationComponents/notificationHeader';
import AllNotificationScreen from '../notificationComponents/notificationNavigation/allNotifications';
import { useTheme } from '../color/themeContext';
import MentionsScreen from '../notificationComponents/notificationNavigation/mentions';

export default function Discover({ navigation }) {
    const { theme } = useTheme()
    
    const tabBar = props => (
        <MaterialTabBar
            {...props}
            indicatorStyle={{ backgroundColor: colorApp, height: 3, }}
            style={[styles.tabBar, {backgroundColor: theme.backgroundColor}]}
            activeColor={colorApp}
            inactiveColor={colorText} 
            labelStyle={styles.label}
        />
    );
	// useFocusEffect(
    //     React.useCallback(() => {              
    //       	fetchUserDataFromApi()
    //     }, [])
    // );

	return (
		<View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Tabs.Container
                tabContainerStyle={styles.tabContainer}
                renderHeader={() => (
                    <NotificationHeader navigation={navigation}/>
                )}
                pointerEvents={'box-none'}
                allowHeaderOverscroll
                renderTabBar={tabBar}
                >

                <Tabs.Tab name="All" label="All">
                    <AllNotificationScreen/>
                </Tabs.Tab>

                <Tabs.Tab name="Mentions" label="Mentions">
                    <MentionsScreen/>
                </Tabs.Tab>
            </Tabs.Container>
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
		</View>   
	);
};
