import React, { useEffect, useState } from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { GetUserData } from '../connectivity/servicesUser';
import FollowersHeader from '../profileComponents/followersHeader';
import FollowingScreen from '../profileComponents/followingScreen';
import FollowersScreen from '../profileComponents/followersScreen';

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

const FollowingAndFollowersScreen = ({ navigation }) => {
  	const route = useRoute();
	const { data } = route.params;

	return (
		<Tabs.Container
		tabContainerStyle={styles.tabContainer}
		renderHeader={() => (
			<FollowersHeader navigation={navigation} fullname={data.fullname}/>
		)}
		pointerEvents={'box-none'}
		allowHeaderOverscroll
		renderTabBar={tabBar}
		>
			<Tabs.Tab name="Followers" label="Followers">
				<FollowersScreen navigation={navigation} uid={data.uid}/>
			</Tabs.Tab>
			<Tabs.Tab name="Following" label="Following">
				<FollowingScreen navigation={navigation} uid={data.uid}/>
			</Tabs.Tab>
		</Tabs.Container>
	);
};

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'black',
    },
    label: {
      fontSize: 16,
      textTransform: 'none',
    },
});

export default FollowingAndFollowersScreen;