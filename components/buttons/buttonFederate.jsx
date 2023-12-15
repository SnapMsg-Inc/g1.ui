import React from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesButtonFederate from "../../styles/buttons/buttonFederate";
import { useTheme } from "../color/themeContext";
import { colorBackground, colorWhite } from "../../styles/appColors/appColors";

function ButtonFederate({name, sign}) {
    const { theme } = useTheme()

    return (
        <TouchableOpacity onPress={sign}>
            <View style={theme.backgroundColor === colorBackground ? stylesButtonFederate.btn : stylesButtonFederate.btnLight}>
                <Icon name={name.toLowerCase()} size={25} />
                <Text style={stylesButtonFederate.fontBtn}>
                    Continue with {name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonFederate