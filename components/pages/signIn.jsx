import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Button } from 'react-native';
import AcceptButton from '../buttons/buttonAcept';
import CancelButton from '../buttons/buttonCancel';
import ButtonFederate from '../buttons/buttonFederate';
import Icon from 'react-native-vector-icons/FontAwesome';
import Separate from '../forms/separate';
import Input from '../forms/input';
import Logo from '../logo';
import stylesForms, { colorText } from '../../styles/SignForms';
import { LoginAccount, SignFederate } from '../connectivity/authorization';
import { ValidationsLogin } from '../forms/validations';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';

function SignIn({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [visible, setVisible] = useState(false)
    const { onLogin } = useContext(AuthenticationContext)

    const handleSignIn = async () => {
        if (ValidationsLogin(email, password, setEmailError, setPasswordError)) {
            onLogin(email, password)
        }
    };

    const signButtonFederate = async () => {
        try {
            const success = await SignFederate(false)
            if (success)
                setTimeout(() => {navigation.navigate('Home')}, 1000)
        } catch (error) {

        }
    }  
        
    return (
        <View style={stylesForms.container}>
            <View style={stylesForms.header}>
                <Logo/>
            </View>
            <View style={stylesForms.body}>
                <Text style={stylesForms.textTittle} >
                    Sign in
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
                <Input
                    label="Password"
                    icon={
                        <Icon   
                        name={visible ? 'eye' : 'eye-slash'} 
                        color={colorText} 
                        size={20} 
                        onPress={() => setVisible(!visible)}
                        />
                    }
                    inputType={!visible}
                    data={password}
                    setData={setPassword}
                    error={passwordError} 
                />
                <View style={stylesForms.containerTextSugestion}>
                    <Text style={stylesForms.textSugestion}>Forgot password?</Text>
                </View>
                <View style={stylesForms.bodyButtons}>
                    <CancelButton navigation={navigation}/>
                    <AcceptButton accept={handleSignIn}/>
                </View>
            </View>
            <View style={stylesForms.footer}>
                <View style={stylesForms.footerOption}>
                    <Separate/>
                    <ButtonFederate name={'Google'} sign={signButtonFederate}/>
                </View>
                <View style={stylesForms.footerText}>
                    <Text style={stylesForms.text}>
                        New to SnapMsg?
                    </Text>
                    <TouchableHighlight onPress={() => {navigation.navigate('SignUp')}}>
                        <Text style={stylesForms.textSign}> Create an account</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default SignIn;
