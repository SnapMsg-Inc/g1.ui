import React from "react";
import { Text, View } from "react-native";
import stylesLogo from "../../styles/logo";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorApp } from "../../styles/appColors/appColors";

function Logo() {
    return (
        <View style={stylesLogo.containerLogo}>
            <Icon name="snapchat-ghost" color={colorApp} size={50}/>
            <Icon name="envelope" color={colorApp} size={15}/>
            <Text style={stylesLogo.fontLogo}>SnapMsg</Text>
        </View>
    )
}

export default Logo
