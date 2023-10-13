import { Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesSetUpProfile from "../../styles/buttons/buttonSetUpProfile";

const SetUpProfileButton = ({navigation, data})  => {
    const onPressSetUpProfile = () => {
        navigation.navigate('SetUpProfile', {data: data})
    }

    return (
        <TouchableHighlight style={stylesSetUpProfile.container}
            onPress={onPressSetUpProfile}
            underlayColor= "#535353">
            <Text style={stylesSetUpProfile.font}>Edit profile</Text>
        </TouchableHighlight>
    )
}

export default SetUpProfileButton
