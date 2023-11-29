import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';

const MAX_TEXT_LENGTH = 30;

const truncateText = (text) => {
	if (text.length <= MAX_TEXT_LENGTH) {
		return text;
	} else {
		return text.slice(0, MAX_TEXT_LENGTH) + ' ...';
	}
};

const NotificationCard = ({ data }) => {
	const navigation = useNavigation();
    const [messageDay, setMessageDay] = useState('')
    
    useEffect (() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - (data.key)
        const seconds = Math.floor(elapsedTime / 1000);        
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) {
            setMessageDay(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
        } else if (hours < 24) {
            setMessageDay(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
        } else if (days > 0){
            setMessageDay(`${days} day${days !== 1 ? 's' : ''} ago`)
        }
    },[])


	return (
		<>
            <TouchableOpacity> 
                <View style={stylesMessages.card}>
                    <View style={stylesMessages.userInfo}>
                        <View style={stylesMessages.textSection}>
                            <View style={{flex: 1,flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={stylesMessages.alias}>{data.title}</Text>
                                <Text style={stylesMessages.text}>{data.body}</Text>
                            </View>
                            <View>
                                <Text style={stylesMessages.text}>{(messageDay)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
	);
};

const stylesMessages = StyleSheet.create({
    card: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colorText
    },
    userInfo: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgWrapper: {
        paddingVertical: 15,
    },
    textSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingLeft: 0,
        width: '100%',
    },
    image: {
		width: 60,
		height: 60,
		borderRadius: 40,
		marginRight: 10,
	},
    alias: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colorWhite,
	},
    text: {
        color: colorText,
        fontSize: 15,
    }
});

export default NotificationCard;
