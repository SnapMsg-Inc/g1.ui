import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default function Profile({ navigation }) {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Profile!
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