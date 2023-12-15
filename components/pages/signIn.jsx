import React, { useContext, useState } from 'react';
import { View, Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import AcceptButton from '../buttons/buttonAcept';
import CancelButton from '../buttons/buttonCancel';
import ButtonFederate from '../buttons/buttonFederate';
import Icon from 'react-native-vector-icons/FontAwesome';
import Separate from '../forms/separate';
import Input from '../forms/input';
import Logo from '../common/logo';
import stylesForms from '../../styles/SignForms';
import { ValidationsLogin } from '../forms/validations';
import { AuthenticationContext } from '../connectivity/auth/authenticationContext';
import { colorApp, colorText } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';

function SignIn({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [visible, setVisible] = useState(false)
    const { onLogin, onLoginFederate, isLoading } = useContext(AuthenticationContext)
    const { theme } = useTheme()

    const handleSignIn = async () => {
        if (ValidationsLogin(email, password, setEmailError, setPasswordError)) {
            onLogin(email, password)
        }
    };

    const signButtonFederate = async () => {
        onLoginFederate()
    }  
        
    return (
        <View style={[stylesForms.container, { backgroundColor: theme.backgroundColor }]}>
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
                    <TouchableHighlight onPress={() => {navigation.navigate('Forgot')}}
                                        underlayColor={'transparent'}>
                        <Text style={stylesForms.textSugestion}>Forgot password?</Text>
                    </TouchableHighlight>
                </View>
                {isLoading ? 
                        <View style={stylesForms.bodyButtonsLoading}>
                            <ActivityIndicator size={'large'} color={colorApp}/> 
                        </View>
                    :
                        <View style={stylesForms.bodyButtons}>
                            <CancelButton navigation={navigation}/>
                            <AcceptButton accept={handleSignIn}/>
                        </View>
                }
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
