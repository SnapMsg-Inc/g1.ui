import { Button, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesAccept from "../../styles/buttons/buttonAcept";

const AcceptButton = ({accept})  => {
    return (
        <TouchableHighlight style={stylesAccept.container} onPress={accept}>
            <Text style={stylesAccept.font}>Accept</Text>
        </TouchableHighlight>
    )
}

export default AcceptButton
