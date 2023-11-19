import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import stylesFollow from "../../styles/buttons/buttonFollow";
import { checkIfUserFollows, deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useNavigation } from '@react-navigation/native';
import { colorBackground } from '../../styles/appColors/appColors';

const MessageCard = ({ data }) => {
	const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)

	const handleMessagePress = () => {
		navigation.navigate('ChatScreen', {data:data});
  	};

	return (
		<>
            {
                isLoading ? <></> : (
                    <TouchableOpacity onPress={handleMessagePress}>
                        <View style={stylesMessages.card}>
                            <Text style={{color: 'red'}}>{data.alias}</Text>
                        </View>
                    </TouchableOpacity>
                    )
            }
		</>
	);
};

const stylesMessages = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center', 
        backgroundColor: colorBackground,
    },
    card: {
        width: '100%',
    }
});

export default MessageCard;
