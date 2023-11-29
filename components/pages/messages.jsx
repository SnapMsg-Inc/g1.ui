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
    FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { GetUserDataByUid } from '../connectivity/servicesUser';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import PostButton from '../buttons/buttonPost';
import { colorApp, colorText, colorBackground, colorWhite } from '../../styles/appColors/appColors';
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
    getDoc,
    doc,
    orderBy,
    onSnapshot} from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { database } from '../connectivity/firebase';

export default function Messages({ navigation }) {
    const { userData } = useContext(LoggedUserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [chatRooms, setChatRooms] = useState([]);

    const obtenerChatRooms = async () => {
        setIsLoading(true);
        const chatroomsRef = collection(database, 'chatrooms');
        const querySnapshot = await getDocs(chatroomsRef);
    
        const chatRoomArray = querySnapshot.docs.map((doc) => ({
          chatRoomUid: doc.id,
          lastMessage: doc.data().lastMessage,
        }));

        console.log("CHATROOM: ", chatRoomArray);
        // Me quedo solo con mis chatRooms
        const chatRoomFiltrados = chatRoomArray.filter(
            ({ chatRoomUid }) => chatRoomUid.includes(userData.uid));
        
        console.log("CHATROOM FILTRADO: ", chatRoomFiltrados);
        // Obtengo los uids de los usuarios con los que tengo chatRooms
        const otherUidArray = chatRoomFiltrados.map(({ chatRoomUid, lastMessage }) => {
            const otrosUid = chatRoomUid.split('_').filter(uid => uid !== userData.uid);
            return {"uid": otrosUid[0],
                    "lastMessage": lastMessage
                };
        });
        
        console.log("uids:  ", otherUidArray);
        // Obtengo los datos de los usuarios con los que tengo chatRooms
        const otherUsersData = await Promise.all(
            otherUidArray.map(async ({ uid, lastMessage }) => {
                const user = await GetUserDataByUid(uid);
                return {
                    uid: user.uid,
                    alias: user.alias,
                    nick: user.nick,
                    pic: user.pic,
                    messageTime: '2 days ago',
                    messageText: lastMessage,
                };
            })
        );

        setChatRooms(otherUsersData);
        setIsLoading(false);
    };

    handleRefresh = async () => {
        setIsRefreshing(true);
        await obtenerChatRooms();
        setIsRefreshing(false);
    };

    useEffect(() => {
        obtenerChatRooms();
    }, [database]);;

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
            {/* ChatRooms */}
            {
                chatRooms?.length > 0 ? (
                    <View style={stylesMessages.container}>
                        <FlatList
                            data={chatRooms}
                            renderItem={({ item }) =>
                                <MessageCard data={item}/>
                            }
                            refreshControl={
                                    <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleRefresh}
                                    progressBackgroundColor={'rgba(0, 0, 0, 0.2)'}
                                    colors={[colorApp]}
                                    tintColor={colorApp}
                                    size={"large"}
                                />
                            }
                        />
                    </View>
                ) : (
                    <View style={{padding: 10}}>
                        <Text style={{color: colorWhite, fontSize: 22, fontWeight:'bold'}}>Welcome to your inbox!</Text>
                        <Text style={{color: colorText, fontSize: 16}}>
                            Looks like you don't have any messages yet! Try reaching out and connecting with others on private conversations on SnapMsg.
                        </Text>
                    </View>)
            }
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