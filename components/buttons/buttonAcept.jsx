import { Button, Text, TouchableOpacity, View } from "react-native";
import stylesAccept from "../../styles/buttons/buttonAcept";
import { TouchableHighlight } from "react-native-gesture-handler";

const AcceptButton = ({accept, text="Accept"})  => {
    return (
        <TouchableHighlight style={stylesAccept.container} onPress={accept}>
            <Text style={stylesAccept.font}>{text}</Text>
        </TouchableHighlight>
    )
}

export default AcceptButton
