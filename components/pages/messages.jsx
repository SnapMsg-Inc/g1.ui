import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Octicons } from '@expo/vector-icons';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { GetFeedPosts, GetPosts, GetUserData } from '../connectivity/servicesUser';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import SnapMsg from '../common/SnapMsg';
import { FontAwesome5 } from 'react-native-vector-icons';
import NewMessageButton from '../buttons/buttonNewMessage';
import styles from '../../styles/messages/messages';
import MessageCard from '../messagesComponents/messageCard';

const MOCK_MESSAGES = [
    {
      uid: '1',
      userName: 'Jenny Doe',
      userImg: require('../../assets/default_user_pic.png'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      uid: '2',
      userName: 'John Doe',
      userImg: require('../../assets/default_user_pic.png'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      uid: '3',
      userName: 'Ken William',
      userImg: require('../../assets/default_user_pic.png'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      uid: '4',
      userName: 'Selina Paul',
      userImg: require('../../assets/default_user_pic.png'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      uid: '5',
      userName: 'Christy Alex',
      userImg: require('../../assets/default_user_pic.png'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        uid: '6',
        userName: 'Gaston',
        userImg: require('../../assets/default_user_pic.png'),
        messageTime: '2 days ago',
        messageText:
          'Hey there, this is my test for a post of my social app in React Native.',
      },
  ];

export default function Messages({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableHighlight
                    onPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesome5 name="envelope" color={colorApp} size={28} />
                        <Text style={styles.font}>Messages</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.containerLogo}>
                    <Icon name="snapchat-ghost" color={colorApp} size={30} />
                    <Icon name="envelope" color={colorApp} size={10} />
                </View>
            </View>
            {/* Messages */}
            <View style={stylesMessages.container}>
                <FlatList
                    data={MOCK_MESSAGES}
                    renderItem={({ item }) =>
                        <MessageCard data={item}/>
                    }
                    // onEndReached={fetchDataFromApi}
                    // onEndReachedThreshold={0.10}
                    // ListFooterComponent={renderLoader}
                    // refreshControl={
                        //     <RefreshControl
                    //         refreshing={isRefreshing}
                    //         onRefresh={handleRefresh}
                    //         progressBackgroundColor={'rgba(0, 0, 0, 0.2)'}
                    //         colors={[colorApp]}
                    //         tintColor={colorApp}
                    //         size={"large"}
                    //     />
                    // }
                />
            </View>
            <NewMessageButton onPress={() => navigation.navigate('ChatScreen')}/>
        </View>
    )
}

const stylesMessages = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center', 
        backgroundColor: colorBackground,
    },
});