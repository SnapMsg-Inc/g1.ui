import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import { Alert, PermissionsAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

PushNotification.createChannel({
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'My channel', // (required)
    },
);

// request permission for notification message
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken();
    }
};

// get fcmToken to send notification
export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
        try {
            const token = await messaging().getToken({vapidKey: Config.MESSAGING_API_KEY});

            if (token) {
                await AsyncStorage.setItem('fcmToken', token);
            }
        } catch (error) {
            console.error(`Can not get fcm token ${error}`);
        }
    }
}

messaging().onMessage(async remoteMessage => {
    addedNotifications(remoteMessage)

    PushNotification.localNotification({
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'My channel',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
    })
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
    addedNotifications(remoteMessage)
});

const addedNotifications = async (msg) => {
    let notificationsArray = await AsyncStorage.getItem('notifications');
    notificationsArray = notificationsArray ? JSON.parse(notificationsArray) : [];

    notificationsArray.unshift({
        'key': msg.sentTime,
        'title': msg.notification.title,
        'body': msg.notification.body,
    });
    
    let mentionsArray = await AsyncStorage.getItem('mentions');
    mentionsArray = mentionsArray ? JSON.parse(mentionsArray) : [];

    if (msg.notification.title === 'New Mention') {
        mentionsArray.unshift({
            'key': msg.sentTime,
            'title': msg.notification.title,
            'body': msg.notification.body,
        });
        await AsyncStorage.setItem('mentions', JSON.stringify(mentionsArray));
    }

    if (notificationsArray.length > 10) {
        notificationsArray.pop();
    }

    if (mentionsArray.length > 10) {
        mentionsArray.pop();
    }

    await AsyncStorage.setItem('notifications', JSON.stringify(notificationsArray));
}
 
