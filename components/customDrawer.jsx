import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
    const profileImageUri = 'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp';
    const username = '@username';
    const nikname = 'Nickname'
    const followersCount = 100;
    const followingCount = 50;


  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView style={styles.scrollView}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: profileImageUri }}
                    style={styles.profileImage}
                />
                <Text style={styles.nickname}>{nikname}</Text>
                <Text style={styles.username}>{username}</Text>
                
                <View style={styles.followersContainer}>
                    <Text style={{ color: '#687684' }}>
                        <Text style={styles.followingCount}>{followingCount}</Text> Following</Text>
                    <Text style={{ color: '#687684' }}>
                        <Text style={styles.followersCount}>{followersCount}</Text> Followers</Text>
                </View>

            </View>

            <DrawerItemList {...props} />
            
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>    
                <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="exit-outline" color={'#ff0000'} size={22} />
                        <Text
                        style={{
                            fontSize: 15,
                            fontFamily: 'Roboto-Medium',
                            marginLeft: 5,
                            color: '#ff0000',
                        }}>
                        Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#000000',
    },
    headerContainer: {
      padding: 20,
      alignItems: 'flex-start',
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    nickname: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    username: {
      color: '#687684',
      fontSize: 16,
      fontWeight: 'normal',
    },
    followersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginTop: 10,
    },
    followersCount: {
      color: 'white',
      fontWeight: 'bold',
    },
    followingCount: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default CustomDrawer
