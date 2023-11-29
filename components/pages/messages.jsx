import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Pressable,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    TouchableWithoutFeedback,
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
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    onSnapshot} from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { database } from '../connectivity/firebase';

const MOCK_MESSAGES = [
    {
        uid: '1',
        alias: 'Jenny Doe',
        nick: 'la jenny',
        pic: '',
        messageTime: '4 mins ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        uid: '2',
        alias: 'John Doe',
        nick: 'lil jhon',
        pic: '',
        messageTime: '2 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        uid: '3',
        alias: 'Ken William',
        nick: 'ken',
        pic: '',
        messageTime: '1 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        uid: '4',
        alias: 'Selina Paul',
        nick: 'seli',
        pic: '',
        messageTime: '1 day ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        uid: '5',
        alias: 'Christy Alex',
        nick: 'chris',
        pic: '',
        messageTime: '2 days ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];

export default function Messages({ navigation }) {
    const { userData } = useContext(LoggedUserContext)
    const [chatRooms, setChatRooms] = useState([]);
    
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
            <NewMessageButton onPress={() => navigation.navigate('SearchUserScreen')}/>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colorBackground,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cancelButton: {
        backgroundColor: colorApp,
        padding: 15,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});