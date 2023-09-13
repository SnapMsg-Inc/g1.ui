import { Button, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesAccept from "../../styles/buttons/buttonAcept";

const AcceptButton = ({accept})  => {

    const onPressAccept = () => {
        accept(true)
    }

    return (
        <TouchableHighlight style={stylesAccept.container} onPress={onPressAccept}>
            <Text style={stylesAccept.font}>Accept</Text>
        </TouchableHighlight>
    )
}

export default AcceptButton
