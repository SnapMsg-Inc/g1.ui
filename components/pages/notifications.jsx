import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useRoute } from '@react-navigation/native';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import styles from '../../styles/discover/discover';
import NotificationHeader from '../notificationComponents/notificationHeader';

const tabBar = props => (
	<MaterialTabBar
		{...props}
		indicatorStyle={{ backgroundColor: colorApp, height: 3, }}
		style={styles.tabBar}
		activeColor={colorApp}
		inactiveColor={colorText} 
		labelStyle={styles.label}
	/>
);

export default function Discover({ navigation }) {
	const { fetchUserDataFromApi } = useContext(LoggedUserContext)

	useFocusEffect(
        React.useCallback(() => {              
          	fetchUserDataFromApi()
        }, [])
    );

	return (
		<View style={styles.container}>
            <Tabs.Container
                tabContainerStyle={styles.tabContainer}
                renderHeader={() => (
                    <NotificationHeader navigation={navigation}/>
                )}
                pointerEvents={'box-none'}
                allowHeaderOverscroll
                renderTabBar={tabBar}
                >

                <Tabs.Tab name="Trending" label="Trending">
                    {/* <TrendingScreen/> */}
                </Tabs.Tab>

                <Tabs.Tab name="Mentions" label="Mentions">
                    {/* <ForYouScreen searchQuery={searchQuery}/> */}
                </Tabs.Tab>
            </Tabs.Container>
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
		</View>   
	);
};
