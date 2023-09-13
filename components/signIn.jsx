import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';
import AcceptButton from './buttons/buttonAcept';
import CancelButton from './buttons/buttonCancel';
import Input from './forms/input';
import Logo from './logo';
import stylesForms from '../styles/SignForms';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(false)

    const handleSignIn = (isAccepted) => {
            setAccept(isAccepted)
    };

    return (
        <ScrollView style={stylesForms.scrollContainer}>
            <View style={stylesForms.container}>
                <View style={stylesForms.header}>
                    <CancelButton navigation={navigation}/>
                    <Logo/>
                    <Text style={stylesForms.textTittle} >
                        Sign in
                    </Text>
                </View>
                <View style={stylesForms.body}>
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
                <Text>
                    {accept ? (console.log(email), setAccept(false)) : 'no funciona'}
                </Text>
            </View>
        </ScrollView>
    );
};

export default SignIn;
