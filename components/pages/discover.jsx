import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import DiscoverHeader from '../discoverComponents/discoverHeader';
import ForYouScreen from '../discoverComponents/discoverNavigation/forYouScreen';
import TrendingScreen from '../discoverComponents/discoverNavigation/trendingTopicsScreen';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useRoute } from '@react-navigation/native';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import styles from '../../styles/discover/discover';

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
	const { isLoadingUserData, fetchUserDataFromApi } = useContext(LoggedUserContext)

    const route = useRoute();
	const searchQuery = route && route.params && route.params.searchQuery ? route.params.searchQuery : null;

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
                    <DiscoverHeader navigation={navigation}/>
                )}
                pointerEvents={'box-none'}
                allowHeaderOverscroll
                renderTabBar={tabBar}
                >
                <Tabs.Tab name="For you" label="For you">
                    <ForYouScreen searchQuery={searchQuery}/>
                </Tabs.Tab>

                <Tabs.Tab name="Trending" label="Trending">
                    <TrendingScreen/>
                </Tabs.Tab>
            </Tabs.Container>
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
		</View>   
	);
};
