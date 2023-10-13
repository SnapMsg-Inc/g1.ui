import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesButtonFederate from "../../styles/buttons/buttonFederate";

function ButtonFederate({name, sign}) {
    return (
        <TouchableHighlight onPress={sign}>
            <View style={stylesButtonFederate.btn}>
                <Icon name={name.toLowerCase()} size={25} />
                <Text style={stylesButtonFederate.fontBtn}>
                    Continue with {name}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default ButtonFederate