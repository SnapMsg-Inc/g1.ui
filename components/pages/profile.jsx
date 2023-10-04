import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { GetUserData } from '../connectivity/servicesUser';
import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import LikesScreen from '../profileComponents/profileNavigation/likesScreen'
import RepliesScreen from '../profileComponents/profileNavigation/repliesScreen'
import FollowersHeader from '../profileComponents/followersHeader';
import FollowingScreen from '../profileComponents/followingScreen';
import FollowersScreen from '../profileComponents/likesScreen';

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

const Profile = ({navigation}) => {
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

  const scrollY = useRef(new Animated.Value(0)).current;
  const [follow, setFollow] = useState(false);
  return (
    <>
      {follow ? 
        <Tabs.Container
        tabContainerStyle={styles.tabContainer}
        renderHeader={() => (
          <FollowersHeader fullname={data.fullname} follow={setFollow} setFollow={setFollow}/>
        )}
        pointerEvents={'box-none'}
        allowHeaderOverscroll
        renderTabBar={tabBar}
        >
          <Tabs.Tab name="Followers">
            <FollowersScreen />
          </Tabs.Tab>
          <Tabs.Tab name="Following">
            <FollowingScreen />
          </Tabs.Tab>
        </Tabs.Container>
      :
      <Tabs.Container
        tabContainerStyle={styles.tabContainer}
        renderHeader={() => (
          <ProfileHeader scrollY={scrollY} navigation={navigation} data={data} follow={follow} setFollow={setFollow}/>
        )}
        pointerEvents={'box-none'}
        allowHeaderOverscroll
        renderTabBar={tabBar}
      >
            <Tabs.Tab name="Posts">
              <PostScreen />
            </Tabs.Tab>

          <Tabs.Tab name="Replies">
            <RepliesScreen />
          </Tabs.Tab>

          <Tabs.Tab name="Likes">
            <LikesScreen />
          </Tabs.Tab>
        </Tabs.Container>
      }
    </>
      
    
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
  },
  label: {
    fontSize: 16,
    textTransform: 'none', // esto no esta funcionando :(
  },
});

export default Profile;