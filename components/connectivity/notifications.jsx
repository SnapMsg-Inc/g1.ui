import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import { Alert, PermissionsAndroid } from 'react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

// request permission for notification message
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('permission')
        getFcmToken();
    }
};

// get fcmToken to send notification
export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmtoken ',fcmToken)
    if (!fcmToken) {
        try {
            const token = await messaging().getToken({vapidKey: Config.MESSAGING_API_KEY});
            
            if (token) {
                console.log('messaging', token)
                await AsyncStorage.setItem('fcmToken', token);
            }
        } catch (error) {
            console.log(`Can not get fcm token ${error}`);
        }
    }
}

messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage)
    Alert.alert(`${remoteMessage.notification.title}`, 
                JSON.stringify(remoteMessage.notification.body),
                [{ text: 'OK' }],
                { cancelable: false })
    addedNotifications(remoteMessage)
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    addedNotifications(remoteMessage)
});

const addedNotifications = async (msg) => {
    let notificationsArray = await AsyncStorage.getItem('notifications');
    notificationsArray = notificationsArray ? JSON.parse(notificationsArray) : [];

    console.log('antes ', JSON.stringify(notificationsArray))
    notificationsArray.unshift({
        'key': msg.sentTime,
        'title': msg.notification.title,
        'body': msg.notification.body,
    });
    
    if (notificationsArray.length > 10) {
        notificationsArray.pop();
    }
      
    console.log('despues ',JSON.stringify(notificationsArray))
    await AsyncStorage.setItem('notifications', JSON.stringify(notificationsArray));
}
 
