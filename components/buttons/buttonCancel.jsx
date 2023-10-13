import React from "react";
import { Button, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesCancel from "../../styles/buttons/buttonCancel";

const CancelButton = ({navigation})  => {
    const onPressCancel = () => {
        navigation.goBack()
    }

    return (
        <TouchableHighlight onPress={onPressCancel} style={stylesCancel.container}>
            <Text style={stylesCancel.font}>Cancel</Text>
        </TouchableHighlight>
    )
}

export default CancelButton
