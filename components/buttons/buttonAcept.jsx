import { Button, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesAccept from "../../styles/buttons/buttonAcept";

const AcceptButton = ({accept, text="Accept"})  => {
    return (
        <TouchableHighlight style={stylesAccept.container} onPress={accept}>
            <Text style={stylesAccept.font}>{text}</Text>
        </TouchableHighlight>
    )
}

export default AcceptButton
