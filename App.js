import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthenticationContextProvider } from './components/connectivity/auth/authenticationContext';
import { Navigation } from './components/navigation/navigation';
import { LoggedUserContextProvider } from './components/connectivity/auth/loggedUserContext';
import { colorBackground } from './styles/appColors/appColors';
import { requestUserPermission } from './components/connectivity/notifications';
import { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { ThemeProvider } from './components/color/themeContext';

export default function App() {
    useEffect(() => {
        requestUserPermission()
    }, []);

    return (
        <AuthenticationContextProvider>
            <ThemeProvider>
                <LoggedUserContextProvider>
                    <SafeAreaView style={styles.container}>
                        <Navigation/>
                    </SafeAreaView>
                </LoggedUserContextProvider>
            </ThemeProvider>
        </AuthenticationContextProvider>
    );
}

AppRegistry.registerComponent(appName, () => self);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground
    }
})