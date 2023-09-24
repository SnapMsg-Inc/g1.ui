import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';
import AcceptButton from '../buttons/buttonAcept';
import CancelButton from '../buttons/buttonCancel';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../forms/input';
import Logo from '../logo';
import stylesForms, { colorText } from '../../styles/SignForms';

function SignIn({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(false)
    const [visible, setVisible] = useState(false)

    const handleSignIn = (isAccepted) => {
        setAccept(isAccepted)
    };
        
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
                    />
                    <Text style={stylesForms.text}>Forgot password?</Text>
            </View>
            <View style={stylesForms.footerLogin}>
                <CancelButton navigation={navigation}/>
                <AcceptButton accept={handleSignIn}/>
            </View>
        </View>
    );
};

export default SignIn;
