import React from "react";
import { Text, View } from "react-native";
import stylesLogo from "../styles/logo";
import Icon from 'react-native-vector-icons/FontAwesome';

function Logo() {
    return (
        <View style={stylesLogo.containerLogo}>
            <Icon name="snapchat-ghost" color={'#1ed760'} size={50}/>
            <Icon name="envelope" color={'#1ed760'} size={15}/>
            <Text style={stylesLogo.fontLogo}>SnapMsg</Text>
        </View>
    )
}

export default Logo
