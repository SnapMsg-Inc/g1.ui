import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorApp, colorText, colorBackground } from '../../../styles/appColors/appColors'
import NotificationCard from '../notificationCard';
import { RefreshControl } from 'react-native-gesture-handler';
import { Tabs } from 'react-native-collapsible-tab-view';

export default function AllNotificationScreen({ navigation }) {
    const [notifications, setNotifications] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false)

    const getNotifications = async () => {
        try {
            notifications.length > 0 ? setNotifications([]) : null;
            const notificationsArray = await AsyncStorage.getItem('notifications');
            if (notificationsArray) {
                const parsedNotifications = JSON.parse(notificationsArray);
                setNotifications(parsedNotifications);
            }
        } catch (error) {
            console.error('Error with notifications in AsyncStorage:', error);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        getNotifications();
        setIsRefreshing(false);
    }

    useEffect(() => {
        getNotifications();
    }, [])

    return (
        <View style={stylesMessages.container}>
            <Tabs.FlatList
                data={notifications}
                renderItem={({ item }) =>
                    <NotificationCard data={item}/>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        progressBackgroundColor={'rgba(0,0,0,0.2)'}
                        colors={[colorApp]}
                        tintColor={colorApp}
                        size={'large'}
                    />
                }
            />
        </View>
    )
}

const stylesMessages = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
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
