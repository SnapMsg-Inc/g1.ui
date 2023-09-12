import React from 'react';
import Inits from './components/inits'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
            backgroundColor='black'
            barStyle={"light-content"}
        />
        <Inits/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})
