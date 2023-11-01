import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthenticationContextProvider } from './components/connectivity/auth/authenticationContext';
import firebaseApp from './components/connectivity/firebase';
import { Navigation } from './components/navigation/navigation';
import { LoggedUserContextProvider } from './components/connectivity/auth/loggedUserContext';

export default function App() {
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
        backgroundColor: 'black'
    }
})