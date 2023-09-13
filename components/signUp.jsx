import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AcceptButton from "./buttons/buttonAcept";
import CancelButton from "./buttons/buttonCancel";
import Input from "./forms/input";
import Logo from "./logo";
import stylesForms from "../styles/SignForms";

function SignUp({navigation}) {
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [nick, setNick] = useState('')
    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(false)

    const handleSignUp = (isAccepted) => {
          setAccept(isAccepted)
    };  

    return (
        <ScrollView keyboardShouldPersistTaps="handled" 
            style={stylesForms.scrollContainer}>
            <View style={stylesForms.container}>
                <View style={stylesForms.header}>
                    <CancelButton navigation={navigation}/>
                    <Logo/>
                    <Text style={stylesForms.textTittle} >
                        Create your account
                    </Text>
                </View>
                <View style={stylesForms.body}>
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
                </View>
                <View style={stylesForms.footer}>
                    <AcceptButton accept={handleSignUp}/>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUp
