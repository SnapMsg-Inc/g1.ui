import { Button, Text, TouchableOpacity, View } from "react-native";
import stylesAccept from "../../styles/buttons/buttonAcept";

const AcceptButton = ({accept, text="Accept"})  => {
    return (
        <TouchableOpacity style={stylesAccept.container} onPress={accept}>
            <Text style={stylesAccept.font}>{text}</Text>
        </TouchableOpacity>
    )
}

export default AcceptButton
