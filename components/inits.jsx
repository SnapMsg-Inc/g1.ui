import { View, Text, TouchableHighlight, StatusBar, SafeAreaView } from "react-native"
import stylesInits from "../styles/inits";
import ButtonFederate from "./buttons/buttonFederate";
import SignIn from "./signIn";
import Logo from "./logo";

function Inits({navigation}) {

    const onPressSignIn = () => {
        navigation.navigate('SignIn');
    };
    const onPressSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={stylesInits.container}>
            <View style={stylesInits.header}>
                <Logo/>
            </View>       
            <View style={stylesInits.body}>
                <Text style={stylesInits.font}>
                    Welcome back! Log in to see the latest
                </Text>
                <ButtonFederate name="Google"/>
                <ButtonFederate name="Github"/>
                <View style={stylesInits.lineContainer}>
                    <View style={stylesInits.dash} />
                    <Text style={stylesInits.text}>or</Text>
                    <View style={stylesInits.dash} />
                </View>
                <TouchableHighlight onPress={onPressSignUp}>
                    <View style={stylesInits.btnSignUp}>
                        <Text style={stylesInits.fontSignUp}>
                            Sign up
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>  
            <View style={stylesInits.footer}>
                <Text style={stylesInits.fontSugestion}>
                    Have an account already?
                </Text>
                <TouchableHighlight onPress={onPressSignIn}>
                    <View style={stylesInits.btnSignIn}>
                        <Text style={stylesInits.fontSignIn}>
                            Sign in
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default Inits
