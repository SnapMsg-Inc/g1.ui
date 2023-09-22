import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';
import AcceptButton from '../buttons/buttonAcept';
import CancelButton from '../buttons/buttonCancel';
import Input from '../forms/input';
import Logo from '../logo';
import stylesForms from '../../styles/SignForms';

function SignIn({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(false)

    const handleSignIn = (isAccepted) => {
        setAccept(isAccepted)

        // OBS: AGREGO NAVEGACION COMO SI SE HICIERA EL LOGIN CORRECTAMENTE
        if (accept) {
            navigation.navigate('Home')
        }
    };
        
    return (
        <View style={stylesForms.container}>
            <View style={stylesForms.header}>
                <CancelButton navigation={navigation}/>
                <Logo/>
            </View>
            <View style={stylesForms.body}>
                <Text style={stylesForms.textTittle} >
                    Sign in
                </Text>
                <Input
                    placeholder="E-mail"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType='email-address'
                />
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <View style={stylesForms.footerLogin}>
                <Text style={stylesForms.text}>Forgot password?</Text>
                <AcceptButton accept={handleSignIn}/>
            </View>
        </View>
    );
};

export default SignIn;
