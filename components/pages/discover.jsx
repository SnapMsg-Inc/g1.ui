import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import DiscoverHeader from '../discoverComponents/discoverHeader';
import ForYouScreen from '../discoverComponents/discoverNavigation/forYouScreen';
import TrendingScreen from '../discoverComponents/discoverNavigation/trendingTopicsScreen';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';

const tabBar = props => (
	<MaterialTabBar
		{...props}
		indicatorStyle={{ backgroundColor: '#1ed760', height: 3, }}
		style={styles.tabBar}
		activeColor='#1ed760'
		inactiveColor='#535353' 
		labelStyle={styles.label}
	/>
);

export default function Discover({ navigation }) {
	const { userData, isLoadingUserData, fetchUserDataFromApi } = useContext(LoggedUserContext)

	useFocusEffect(
        React.useCallback(() => {
          	fetchUserDataFromApi()
        }, [])
    );

	return (
		<View style={styles.container}>
			{ isLoadingUserData ? <ActivityIndicator size={'large'} color={'#1ed760'}/> : (
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
                        <ForYouScreen/>
					</Tabs.Tab>

					<Tabs.Tab name="Trending" label="Trending">
						<TrendingScreen/>
					</Tabs.Tab>
				</Tabs.Container>
			)}

		</View>   
	);
};

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
        justifyContent: 'center',
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
    tabBar: {
		backgroundColor: 'black',
	},
})