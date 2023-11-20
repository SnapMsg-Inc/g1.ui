import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import ButtonFollow from '../buttons/buttonFollow';
import stylesFollow from "../../styles/buttons/buttonFollow";
import { checkIfUserFollows, deleteUserFollowByUid, followUserByUid } from '../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/messages/searchedUserCard';

const MAX_INTEREST_LENGTH = 40;

const truncateInterest = (interest) => {
	const interests = interest.toString().replace(/,/g, ', ');
	if (interests.length <= MAX_INTEREST_LENGTH) {
		return interests;
	} else {
		return interests.slice(0, MAX_INTEREST_LENGTH) + ' ...';
	}
};

const SearchedUserCard = ({ data }) => {
	const navigation = useNavigation();

	const handleProfilePress = () => {
		navigation.navigate('ChatScreen', {data:data});
  	};

	const defaultImage = require('../../assets/default_user_pic.png')
  
	return (
        <TouchableOpacity onPress={handleProfilePress}>
            <View style={styles.container}>
                <Image source={(data.pic === 'none') || (data.pic === '') ? defaultImage : { uri: data.pic }}
                    style={styles.profileImage} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{data.alias}</Text>
                    <Text style={styles.nick}>{`@${data.nick}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
	);
};

export default SearchedUserCard;

