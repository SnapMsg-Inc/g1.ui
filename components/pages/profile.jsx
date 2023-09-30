import React, { useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';

import ProfileHeader from '../profileComponents/profileHeader';
import PostScreen from '../profileComponents/profileNavigation/postsScreen'
import LikesScreen from '../profileComponents/profileNavigation/likesScreen'
import RepliesScreen from '../profileComponents/profileNavigation/repliesScreen'

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
  const username = "Nombre de Usuario";
  const profileImage = "URL_de_la_Imagen_de_Perfil";

  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <Tabs.Container
      tabContainerStyle={styles.tabContainer}
      renderHeader={() => (
        <ProfileHeader scrollY={scrollY} navigation={navigation}  username={username} profileImage={profileImage} />
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