import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorApp, colorText, colorBackground } from '../../../styles/appColors/appColors'
import NotificationCard from '../notificationCard';

export default function AllNotificationScreen({ navigation }) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const getNotifications = async () => {
            try {
              // Obtén el array de notificaciones desde AsyncStorage
              const notificationsArray = await AsyncStorage.getItem('notifications');
      
              // Si hay notificaciones, conviértelas de JSON a un objeto JavaScript
              if (notificationsArray) {
                const parsedNotifications = JSON.parse(notificationsArray);
                setNotifications(parsedNotifications);
              }
            } catch (error) {
              console.error('Error al obtener las notificaciones:', error);
            }
          };
      
          // Llama a la función para obtener las notificaciones cuando el componente se monta
        getNotifications();
    }, [])

    return (
        <View style={stylesMessages.container}>
            <FlatList
                data={notifications}
                renderItem={({ item }) =>
                    <NotificationCard data={item}/>
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
