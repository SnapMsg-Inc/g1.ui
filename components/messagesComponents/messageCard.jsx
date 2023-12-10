import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colorApp, colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../color/themeContext';

const MAX_TEXT_LENGTH = 20;

const truncateText = (text) => {
	if (text.length <= MAX_TEXT_LENGTH) {
		return text;
	} else {
		return text.slice(0, MAX_TEXT_LENGTH) + ' ...';
	}
};

const MAX_ALIAS_LENGTH = 12;

const truncateAlias = (alias) => {
	if (alias.length <= MAX_ALIAS_LENGTH) {
		return alias;
	} else {
		return alias.slice(0, MAX_ALIAS_LENGTH) + '...';
	}
};

const MessageCard = ({ data }) => {
	const navigation = useNavigation();
    const { theme } = useTheme()
    const [isLoading, setIsLoading] = useState(false)

	const handleMessagePress = () => {
		navigation.navigate('ChatScreen', {data:data});
  	};

    const defaultImage = require('../../assets/default_user_pic.png')

	return (
		<>
            {
                isLoading ? <></> : (
                    <TouchableOpacity onPress={handleMessagePress}>
                        <View style={stylesMessages.card}>
                            <View style={stylesMessages.userInfo}>
                                <View style={stylesMessages.imgWrapper}>
                                    <Image source={( data.pic == 'none') || (data.pic === '') ? defaultImage : { uri: data.pic}}
                                        style={stylesMessages.image} />
                                </View>
                                <View style={stylesMessages.textSection}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={[stylesMessages.alias, {color: theme.whiteColor}]}>{truncateAlias(data.alias)}</Text>
                                        <Text style={stylesMessages.text}>{data.messageTime}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={stylesMessages.text}>{truncateText(data.messageText)}</Text>
                                        {!data.readByMe && <Icon name="circle" size={15} color={colorApp} />}
                                    </View>
                                    {/* <Text style={stylesMessages.text}>{truncateText(data.messageText)}</Text> */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    )
            }
		</>
	);
};

const stylesMessages = StyleSheet.create({
    card: {
        width: '100%'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgWrapper: {
        paddingVertical: 15,
    },
    textSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        width: 280,
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

export default MessageCard;
