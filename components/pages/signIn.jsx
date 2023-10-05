import React, { useState } from 'react';
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

function SignIn({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [visible, setVisible] = useState(false)

    const isValidEmail = (email) => {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8; // Password must be at least 8 characters
    };

    const Validations = () => {
        let isValid = true;
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email.');
            isValid = false;
        } else {
            setEmailError(null);
        }
        if (!isValidPassword(password)) {
            setPasswordError('Password should be at least 8 characters long.');
            isValid = false;
        } else {
            setPasswordError(null);
        }
        return isValid
    }

    const handleSignIn = async () => {
        if (!Validations()) {
            alert('Please check your input and try again.')
        } else {
            try {
                const success = await LoginAccount(email, password)
                if (success)
                    navigation.navigate('Home')
                else
                    alert('Invalid username or password.\nPlease check your credentials and try again.')
            } catch (error) {
                alert('An error occurred while signing in. Please try again later.');
            }
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
