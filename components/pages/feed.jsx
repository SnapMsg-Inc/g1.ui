import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default function Feed({ navigation }) {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Feed
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
    }
})