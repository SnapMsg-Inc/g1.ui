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
import styles from '../../styles/feed/feed';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import SnapMsg from '../common/SnapMsg';
import { FontAwesome5 } from 'react-native-vector-icons';

export default function Messages({ navigation }) {
    return (
        <View style={styles.container}>
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
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
        </View>
    )
}
