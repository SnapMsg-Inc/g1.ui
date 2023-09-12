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

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled">
            <View style={stylesForms.container}>
                <View style={stylesForms.header}>
                    <CancelButton navigation={navigation}/>
                    <Logo/>
                    <Text style={stylesForms.textTittle} >
                        Sign Up
                    </Text>
                </View>
                <View style={stylesForms.form}>
                    <Input
                        holder="Nick"
                        secure={false}
                        state={setNick}
                        value={nick}
                    />
                    <Input
                        holder="E-mail"
                        secure={false}
                        state={setEmail}
                        value={email}
                    />
                    <Input
                        holder="Location"
                        secure={true}
                        state={setLocation}
                        value={location}
                    />
                    <Input
                        holder="Password"
                        secure={true}
                        state={setPassword}
                        value={password}
                    />
                </View>
                <View style={stylesForms.bottomSignUp}>
                    <AcceptButton/>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUp
