import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import AcceptButton from "../buttons/buttonAcept";
import CancelButton from "../buttons/buttonCancel";
import Input from "../forms/input";
import Logo from "../logo";
import stylesForms from "../../styles/SignForms";

function SignUp({navigation}) {
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [nick, setNick] = useState('')
    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(false)

    const handleSignUp = (isAccepted) => {
        setAccept(isAccepted)
        if (accept) {
            navigation.navigate('Preferences')
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
                    Create your account
                </Text>
                <ScrollView>
                    <Input
                        placeholder="First Name"
                        onChangeText={setNick}
                        value={nick}
                    />
                    <Input
                        placeholder="Last Name"
                        onChangeText={setNick}
                        value={nick}
                    />
                    <Input
                        placeholder="Nick"
                        onChangeText={setNick}
                        value={nick}
                    />
                    <Input
                        placeholder="E-mail"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType={'email-address'}
                    />
                    <Input
                        placeholder="Location"
                        onChangeText={setLocation}
                        value={location}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                </ScrollView>
            </View>
            <View style={stylesForms.footer}>
                <AcceptButton accept={handleSignUp}/>
            </View>
        </View>
    )
}

export default SignUp
