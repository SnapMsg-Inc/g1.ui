import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default function ChatScreen({ navigation, uid }) {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Chat to {uid}
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
        color: 'red'
    }
})