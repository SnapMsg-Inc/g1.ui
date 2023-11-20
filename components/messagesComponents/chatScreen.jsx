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

export default function ChatScreen({ navigation }) {
    const route = useRoute();
	const { data } = route.params;
	const { userData } = useContext(LoggedUserContext)
    
    const defaultImage = require('../../assets/default_user_pic.png')

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        {
            _id: 2,
            text: 'Hello world',
            createdAt: new Date(),
            user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
        );
    }, []);

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
                backgroundColor: colorBackground,
            }}
            primaryStyle={{ alignItems: 'center' }}
            textInputStyle={{ color: colorWhite }}
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
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                {/* Back button */}
                {/* <BackButton onPress={() => {navigation.goBack()}}/> */}
                <TouchableHighlight
                    onPress={() => {navigation.goBack()}}
                    style={{
                        position: 'absolute',
                        top: 18,
                        left: 10,
                        backgroundColor: '#00000099',
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    <Feather name="chevron-left" color={colorWhite} size={36} />
                </TouchableHighlight>
                <TouchableHighlight onPress={handleProfilePress} style={{position: 'absolute', left: 0, top: 0}}>
                    <View  style={styles.userInfo}>
                        <Image source={(data.pic == 'none') || (data.pic === '') ? defaultImage : { uri: data.pic }} style={styles.image} />
                        <View>
                            <Text style={styles.alias}>{data.alias}</Text>
                            <Text style={styles.nick}>{`@${data.nick}`}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            {/* MESSAGES */}
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
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