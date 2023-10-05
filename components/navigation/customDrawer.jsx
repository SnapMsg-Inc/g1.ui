import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetUserData } from '../connectivity/servicesUser';

const CustomDrawer = props => {
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

    const profileImageUri = 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png';

    const pic = data.pic === '' ? profileImageUri : data.pic;
	
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView style={styles.scrollView}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: pic}}
                    style={styles.profileImage}
                />
                <Text style={styles.nickname}>{data.fullname}</Text>
                <Text style={styles.username}>{`@${data.nick}`}</Text>
                
                <View style={styles.followersContainer}>
                    <Text style={{ color: '#535353' }}>
                        <Text style={styles.followingCount}>{data.follows}</Text> Following</Text>
                    <Text style={{ color: '#535353' }}>
                        <Text style={styles.followersCount}>{data.followers}</Text> Followers</Text>
                </View>

            </View>

            <DrawerItemList {...props} />
            
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
              <View style={styles.signOutButton}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Ionicons name="exit-outline" color={'#535353'} size={22} />
                    
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 5,
                        color: '#535353',
                      }}>
                      Sign Out
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
      color: '#535353',
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
    signOutButton: {
      width: '50%',
      paddingVertical: 15,
    },
  });

export default CustomDrawer
