import React, { useState, useContext } from 'react';
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
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - data.key;
  
    // Convertimos el tiempo en milisegundos a un formato más legible
    // const seconds = Math.floor(elapsedTime / 1000);
    // const minutes = Math.floor(seconds / 60);
    // const hours = Math.floor(minutes / 60);
    // const days = Math.floor(hours / 24);

    // if (days > 0) {
    //     setMessageDay(`${days} día${days !== 1 ? 's' : ''} atrás`)
    // } else if (hours > 0) {
    //     setMessageDay(`${hours} hora${hours !== 1 ? 's' : ''} atrás`);
    // } else if (minutes > 0) {
    //     setMessageDay(`${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`);
    // } else {
    //     setMessageDay(`${seconds} segundo${seconds !== 1 ? 's' : ''} atrás`);
    // }

	return (
		<>
            <TouchableOpacity> 
                {/* onPress={handleMessagePress}> */}
                <View style={stylesMessages.card}>
                    <View style={stylesMessages.userInfo}>
                        <View style={stylesMessages.textSection}>
                            <View style={{flex: 1,flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={stylesMessages.alias}>{data.title}</Text>
                                <Text style={stylesMessages.text}>{data.body}</Text>
                            </View>
                            <View>
                                <Text style={stylesMessages.text}>{(elapsedTime)}</Text>
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
        paddingTop: 100,
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
