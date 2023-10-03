import React, { useEffect, useState } from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { StyleSheet } from 'react-native';
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
      inactiveColor='#687684' 
      labelStyle={styles.label}
    />
);

const FollowingAndFollowersScreen = ({ navigation }) => {
    const [data, setData] = useState({
        "uid": "",
        "fullname": "",
        "interests": [],
        "zone": {"latitude": 0,
                "longitude": 0},
        "is_admin": false,
        "ocupation": null,
        "pic": "",
        "email": "",
        "nick": "",
        "birthdate": "",
        "followers": 0,
        "follows": 0,
      })
    useEffect(()=>{
        const fetchDataFromApi = async () => {
            try {
                await GetUserData(setData, data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDataFromApi()
    },[])

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
            <FollowersScreen navigation={navigation}/>
        </Tabs.Tab>
        <Tabs.Tab name="Following" label="Following">
            <FollowingScreen navigation={navigation}/>
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