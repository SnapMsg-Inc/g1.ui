import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CancelButton = ({navigation})  => {
    const onPressCancel = () => {
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={onPressCancel}>
            <Text style={{color: 'black'}}>Cancel</Text>
        </TouchableOpacity>
    )
}

export default CancelButton
