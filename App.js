import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { AuthenticationContextProvider } from './components/connectivity/auth/authenticationContext';
import { Navigation } from './components/navigation/navigation';
import { LoggedUserContextProvider } from './components/connectivity/auth/loggedUserContext';
import { colorBackground } from './styles/appColors/appColors';
import { requestUserPermission } from './components/connectivity/notifications';
import { useEffect } from 'react';
import Config from 'react-native-config';
// import { useState } from 'react';
import messaging from '@react-native-firebase/messaging'

export default function App() {
    // const [loading, setLoading] = useState(true);
    // const [initialRoute, setInitialRoute] = useState('Home');

    useEffect(() => {
        requestUserPermission()
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }, []);

    return (
        <AuthenticationContextProvider>
            <LoggedUserContextProvider>
                <SafeAreaView style={styles.container}>
                    <Navigation/>
                </SafeAreaView>
            </LoggedUserContextProvider>
        </AuthenticationContextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground
    }
})