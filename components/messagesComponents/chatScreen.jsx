import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ChatScreen({ navigation }) {
    const route = useRoute();
	const { data } = route.params;

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Chat to {data.userName}
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