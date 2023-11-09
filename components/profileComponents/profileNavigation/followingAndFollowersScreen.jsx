import React, { useEffect, useState } from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { GetUserData } from '../../connectivity/servicesUser';
import FollowersHeader from '../followersHeader';
import FollowingScreen from './followingScreen';
import FollowersScreen from './followersScreen';
import { colorApp, colorBackground, colorText } from '../../../styles/appColors/appColors';

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

const FollowingAndFollowersScreen = ({ navigation }) => {
  	const route = useRoute();
	const { data } = route.params;

	return (
		<Tabs.Container
		tabContainerStyle={styles.tabContainer}
		renderHeader={() => (
			<FollowersHeader navigation={navigation} fullname={data.alias}/>
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
      backgroundColor: colorBackground,
    },
    label: {
      fontSize: 16,
      textTransform: 'none',
    },
});

export default FollowingAndFollowersScreen;