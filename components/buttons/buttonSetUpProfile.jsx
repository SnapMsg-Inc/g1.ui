import { Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesSetUpProfile from "../../styles/buttons/buttonSetUpProfile";

const SetUpProfileButton = ()  => {
    const onPressSetUpProfile = () => {
        {/* Navigate to SET UP SCREEN!! */}
    }

    return (
        <TouchableHighlight style={stylesSetUpProfile.container}
            onPress={onPressSetUpProfile}
            underlayColor= "#535353">
            <Text style={stylesSetUpProfile.font}>Set up profile</Text>
        </TouchableHighlight>
    )
}

export default SetUpProfileButton
