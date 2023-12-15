import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesCancel from "../../styles/buttons/buttonCancel";

const CancelButton = ({navigation})  => {
    const onPressCancel = () => {
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={onPressCancel} style={stylesCancel.container}>
            <Text style={stylesCancel.font}>Cancel</Text>
        </TouchableOpacity>
    )
}

export default CancelButton
