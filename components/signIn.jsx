import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import AcceptButton from './buttons/buttonAcept';
import CancelButton from './buttons/buttonCancel';
import Input from './forms/input';
import Logo from './logo';
import stylesForms from '../styles/SignForms';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <View style={stylesForms.container}>
            <View style={stylesForms.header}>
                <CancelButton navigation={navigation}/>
                <Logo/>
                <Text style={stylesForms.textTittle} >
                    Sign in
                </Text>
            </View>
            <View style={stylesForms.form}>
                <Input
                    holder="E-mail"
                    secure={false}
                    state={setEmail}
                    value={email}
                />
                <Input
                    holder="Password"
                    secure={true}
                    state={setPassword}
                    value={password}
                />
            </View>
            <View style={stylesForms.bottomForm}>
                <Text style={stylesForms.text}>Forgot password?</Text>
                <AcceptButton/>
            </View>
        </View>
    </ScrollView>
  );
};

export default SignIn;
