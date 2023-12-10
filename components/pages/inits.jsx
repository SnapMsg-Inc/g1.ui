import { View, Text, TouchableHighlight, StatusBar, SafeAreaView } from "react-native"
import stylesInits from "../../styles/inits";
import ButtonFederate from "../buttons/buttonFederate";
import SignIn from "./signIn";
import Logo from "../common/logo";
import { useTheme } from "../color/themeContext";

function Inits({navigation}) {
    const { theme } = useTheme()

    const onPressSignIn = () => {
        navigation.navigate('SignIn');
    };
    const onPressSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={[stylesInits.container, { backgroundColor: theme.backgroundColor}]}>
            <View style={stylesInits.header}>
                <Logo/>
            </View>       
            <View style={stylesInits.body}>
                <Text style={[stylesInits.font, { color: theme.whiteColor}]}>
                    {"Welcome back!\n"}
                    {"Log in to see\n"}
                    {"the latest"}
                </Text>
                <TouchableHighlight style={stylesInits.touchable} 
                                    onPress={onPressSignUp}
                                    underlayColor={'transparent'}>
                    <View style={stylesInits.btnSignUp}>
                        <Text style={stylesInits.fontSignUp}>
                            Sign up
                        </Text>
                    </View>
                </TouchableHighlight>
                <Text style={[stylesInits.fontSugestion, {color: theme.whiteColor}]}>
                    Have an account already?
                </Text>
                <TouchableHighlight style={stylesInits.touchable}
                                    onPress={onPressSignIn}
                                    underlayColor={'transparent'}>
                    <View style={stylesInits.btnSignIn}>
                        <Text style={stylesInits.fontSignIn}>
                            Sign in
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>  
            <View style={stylesInits.footer}>
                <Text style={stylesInits.footerText}> SnapMsg ©</Text>
            </View>
        </View>
    )
}

export default Inits
