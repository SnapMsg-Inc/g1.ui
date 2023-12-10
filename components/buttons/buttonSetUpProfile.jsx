import { Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import stylesSetUpProfile from "../../styles/buttons/buttonSetUpProfile";
import { useTheme } from "../color/themeContext";

const SetUpProfileButton = ({navigation, data})  => {
    const { theme } = useTheme()
    const onPressSetUpProfile = () => {
        navigation.navigate('SetUpProfile', {data: data})
    }

    return (
        <TouchableHighlight style={[stylesSetUpProfile.container, {backgroundColor: theme.backgroundColor}]}
            onPress={onPressSetUpProfile}
            underlayColor= "#535353">
            <Text style={stylesSetUpProfile.font}>Edit profile</Text>
        </TouchableHighlight>
    )
}

export default SetUpProfileButton
