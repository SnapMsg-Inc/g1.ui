import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import stylesButtonFederate from "../../styles/buttonFederate";

function ButtonFederate({name}) {
    return (
        <TouchableHighlight>
            <View style={stylesButtonFederate.btn}>
                <Text style={stylesButtonFederate.fontBtn}>
                    Continue with {name}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default ButtonFederate