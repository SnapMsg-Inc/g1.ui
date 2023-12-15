import { Alert, Text, View } from "react-native";
import Logo from "../common/logo";
import { stylesForgot } from "../../styles/forgot";
import Input from '../forms/input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import { colorText } from "../../styles/appColors/appColors";
import CancelButton from "../buttons/buttonCancel"
import AcceptButton from "../buttons/buttonAcept"
import { ValidateForgot } from "../forms/validations";
import { ResetPassword } from "../connectivity/authorization";
import { useTheme } from "../color/themeContext";
import { sendMetricsDD } from "../connectivity/ddMetrics";

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(null)
    const { theme } = useTheme()

    const handleForgot = () => {
        if (ValidateForgot(email, setEmailError)) {
            ResetPassword(email)
            .then(() => {
                //sendMetricsDD('users.forgot','incr','1')
                Alert.alert(
                    'Congratulations!',
                    'Password reset link sent! Check your email',
                    [{ text: 'OK', onPress: () => navigation.goBack() }],
                    { cancelable: false }
                );
            })
            .catch((error) => {
                Alert.alert(
                    'Error',
                    'User not found!',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            })
        }
    }

    return (
        <View style={[stylesForgot.container, { backgroundColor: theme.backgroundColor}]}>
            <View style={stylesForgot.header}>
                <Logo/>
            </View>
            <View style={stylesForgot.body}>
                <Text style={stylesForgot.title}>
                    Forgot to Password?
                </Text>
                <Text style={stylesForgot.text}>
                    Enter your email to reset your password
                </Text>
                <Input
                    label={'Email'}
                    icon={
                        <Icon   
                            name={'envelope'} 
                            color={colorText} 
                            size={20} 
                            />
                        }
                    keyboardType="email-address"
                    data={email}
                    setData={setEmail}
                    error={emailError}
                />
                <View style={stylesForgot.btnView}>
                    <CancelButton navigation={navigation}/>
                    <AcceptButton accept={handleForgot}/>
                </View>
            </View>
        </View>
    )
}