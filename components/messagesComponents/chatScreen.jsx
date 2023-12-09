import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Button, 
    ScrollView
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colorApp, colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';
import { Feather } from '@expo/vector-icons';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    getDoc,
    setDoc,
    doc,
    updateDoc,
  } from 'firebase/firestore';
import { database } from '../connectivity/firebase';
import { useTheme } from '../color/themeContext';
import { GetToken, SendNotificationMessage } from '../connectivity/servicesUser';

const generateChatRoomUid = (uid1, uid2) => {
    // Ordena los IDs de usuario para garantizar consistencia.
    // Esto es necesario ya que el orden de los IDs de usuario  no
    // debe afectar el chatRoomUid, que es igual para los dos users involucrados.
    const sortedUserIds = [uid1, uid2].sort();

    // Combina los IDs de usuario para formar el chatRoomUid.
    const chatRoomUid = sortedUserIds.join('_');

return chatRoomUid;
};

export default function ChatScreen({ navigation }) {
    const route = useRoute();
	const { data } = route.params;
	const { userData } = useContext(LoggedUserContext)
    const { theme } = useTheme()
    const defaultImage = require('../../assets/default_user_pic.png')

    const [messages, setMessages] = useState([]);

    const checkAndCreateChatRoom = async () => {
        const chatRoomUid = generateChatRoomUid(userData.uid, data.uid);
        const chatRoomRef = doc(database, `chatrooms/${chatRoomUid}`);
        const docSnap = await getDoc(chatRoomRef);
        
        // If the chatroom doesn't exist, create it
        if (!docSnap.exists()) {
            await setDoc(doc(database, "chatrooms", chatRoomUid), {
                "chatRoomUid": chatRoomUid,
                ["readBy_" + userData.uid]: true,
                ["readBy_" + data.uid]: false,
            });
        }

        // Update the readBy field of the chatroom
        await updateDoc(chatRoomRef, {
            ["readBy_" + userData.uid]: true,
          });
    };

    useEffect(() => {
        const chatRoomUid = generateChatRoomUid(userData.uid, data.uid);
        checkAndCreateChatRoom();
        
        const collectionRef = collection(database, `chatrooms/${chatRoomUid}/messages`);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMessages(
                querySnapshot.docs.map((doc) => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                }))
            );
        });
        
        return unsubscribe;
    }, [database, generateChatRoomUid, userData.uid, data.uid]);

    const onSend = useCallback(async (messages = []) => {
        const { createdAt, text, user } = messages[0];
        // The message ID must be unique so we use a timestamp
        const _id = createdAt.getTime().toString();
    
        const chatRoomUid = generateChatRoomUid(userData.uid, data.uid);
        
        // Wait for the chatroom to be created before updating it
        await checkAndCreateChatRoom();

        // Add the message to the chatroom messages collection
        addDoc(collection(database, `chatrooms/${chatRoomUid}/messages`), {
            _id,
            createdAt,
            text,
            user
        });
        
        // Update the chatroom fields
        updateDoc(doc(database, `chatrooms/${chatRoomUid}`), {
            lastMessage: text,
            lastMessageCreatedAt: createdAt,
            ["readBy_" + data.uid]: false,
        });
        
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        GetToken()
        .then(token => {
            console.log(token)
            SendNotificationMessage(token, data.uid, userData.alias, text)
            .then(response => console.log('Send notification message ', response.status))
            .catch(error => console.log('Error send notification message ', error.response))
        })
    }, [database, generateChatRoomUid, userData.uid, data.uid]);

    const renderSend = (props) => {
        return (
        <Send {...props}>
            <View>
            <MaterialCommunityIcons
                name="send-circle"
                style={{marginBottom: 5, marginRight: 5}}
                size={32}
                color={colorApp}
            />
            </View>
        </Send>
        );
    };

    const renderBubble = (props) => {
        return (
        <Bubble
            {...props}
            wrapperStyle={{
            right: {
                backgroundColor: colorApp,
            },
            }}
            textStyle={{
            right: {
                color: colorWhite,
            },
            }}
        />
        );
    };

    const renderInputToolbar = (props) => {
        return (
          <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: theme.backgroundColor,
            }}
            primaryStyle={{ alignItems: 'center' }}
            textInputStyle={{ color: theme.whiteColor }}
          />
        );
      };

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }

    const handleProfilePress = () => {
		if (data.uid !== userData.uid) {
			navigation.navigate('Profile', {
				screen: 'OtherProfileScreen',
				initial: false,
				params: {id:data.uid}
			  });
		} else {
			navigation.navigate('Profile', {
				screen: 'ProfileScreen',
			  });
		}
  	};

    return (
        <View style={[styles.container,{backgroundColor: theme.backgroundColor}]}>
            {/* HEADER */}
            <View style={[styles.header, {backgroundColor: theme.backgroundColor}]}>
                {/* Back button */}
                {/* <BackButton onPress={() => {navigation.goBack()}}/> */}
                <TouchableHighlight
                    onPress={() => {navigation.goBack()}}
                    style={{
                        position: 'absolute',
                        top: 18,
                        left: 10,
                        backgroundColor: theme.backgroundColor,
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    <Feather name="chevron-left" color={theme.whiteColor} size={36} />
                </TouchableHighlight>
                <TouchableHighlight onPress={handleProfilePress} style={{position: 'absolute', left: 0, top: 0}}>
                    <View  style={styles.userInfo}>
                        <Image source={(data.pic == 'none') || (data.pic === '') ? defaultImage : { uri: data.pic }} style={styles.image} />
                        <View>
                            <Text style={[styles.alias, {color: theme.whiteColor}]}>{data.alias}</Text>
                            <Text style={styles.nick}>{`@${data.nick}`}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            {/* MESSAGES */}
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: userData.uid,
                    pic: userData.pic,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                renderInputToolbar={renderInputToolbar}
                />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: colorBackground,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        height: 70,
    },
    userInfo: {
        position: 'absolute',
        flexDirection: 'row',
        left: 50,
        top: 12,
    },
    alias: {
        color: colorWhite,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: -5,
    },
    nick: {
        color: colorText,
        fontSize: 15,
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
        color: 'red'
    }
})