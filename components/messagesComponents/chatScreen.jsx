import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';
import BackButton from '../buttons/buttonBack';
import { Feather } from '@expo/vector-icons';

export default function ChatScreen({ navigation }) {
    const route = useRoute();
	const { data } = route.params;

    const defaultImage = require('../../assets/default_user_pic.png')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Back button */}
                {/* <BackButton onPress={() => {navigation.goBack()}}/> */}
                <TouchableHighlight
                    onPress={() => {navigation.goBack()}}
                    style={{
                        position: 'absolute',
                        top: 18,
                        left: 10,
                        backgroundColor: '#00000099',
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    <Feather name="chevron-left" color={colorWhite} size={36} />
                </TouchableHighlight>
                <View style={styles.userInfo}>
                <Image source={( data.pic == 'none') || (data.pic === '') ? defaultImage : { uri: data.pic}} style={styles.image} />
                    <View>
                        <Text style={styles.alias}>{data.alias}</Text>
                        <Text style={styles.nick}>{`@${data.nick}`}</Text>
                    </View>

                </View>
            </View>
            
            <Text style={styles.text}>
                Chat to {data.alias}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: colorBackground,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        height: 70,
    },
    userInfo: {
        position: 'absolute',
        flexDirection: 'row',
        left: 50,
        top: 12,
    },
    alias: {
        color: colorWhite,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: -5,
    },
    nick: {
        color: colorText,
        fontSize: 15,
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
        color: 'red'
    }
})