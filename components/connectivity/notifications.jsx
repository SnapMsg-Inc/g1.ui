import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import {PermissionsAndroid} from 'react-native';
import { AppRegistry } from 'react-native';
import { name as appName } from '../../app.json';
import App from '../../App';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

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
    console.log('fcmtoken ',fcmToken)
    if (!fcmToken) {
        console.log('no hay token')
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

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const currentMessages = await AsyncStorage.getItem('messages');
    const messageArray = JSON.parse(currentMessages);
    messageArray.push(remoteMessage.data);
    await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
});

AppRegistry.registerComponent(appName, () => App);

