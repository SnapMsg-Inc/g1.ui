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

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(null)

    const handleForgot = () => {
        if (ValidateForgot(email, setEmailError)) {
            console.log('email', email)
            ResetPassword(email)
            .then(() => {
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
        <View style={stylesForgot.container}>
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