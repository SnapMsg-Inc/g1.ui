import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthenticationContextProvider } from './components/connectivity/auth/authenticationContext';
import firebaseApp from './components/connectivity/firebase';
import { Navigation } from './components/navigation/navigation';

export default function App() {
    return (
        <AuthenticationContextProvider>
            <SafeAreaView style={styles.container}>
                <Navigation/>
            </SafeAreaView>
        </AuthenticationContextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})