import { Button, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesAccept from "../../styles/buttons/buttonAcept";

const AcceptButton = ()  => {

    // const onPressAccept = () => {
    //     navigation.goBack()
    // }

    return (
        <TouchableHighlight style={stylesAccept.container}>
            <Text style={stylesAccept.font}>Accept</Text>
        </TouchableHighlight>
    )
}

export default AcceptButton
