import React, { useContext, useState } from "react";
import {ActivityIndicator, ScrollView,
        Text,
        TouchableHighlight,
        View } from "react-native";
import AcceptButton from "../buttons/buttonAcept";
import ButtonFederate from "../buttons/buttonFederate";
import CancelButton from "../buttons/buttonCancel";
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from "../forms/input";
import Logo from "../common/logo";
import Separate from "../forms/separate";
import stylesForms from "../../styles/SignForms";
import { colorApp, colorText } from "../../styles/appColors/appColors";
import Calendar from "../forms/calendar";
import CreateAccount, { SignFederate } from "../connectivity/authorization";
import { AuthenticationContext } from "../connectivity/auth/authenticationContext";
import { ValidationsSignUp } from "../forms/validations";
import { useTheme } from "../color/themeContext";

function SignUp({navigation}) {
    const { theme } = useTheme()
    const timeInit = Date.now()
    const [fullName, setFullName] = useState('')
    const [alias, setAlias] = useState('')
    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [date, setDate] = useState(new Date())
    const [fullNameError, setFullNameError] = useState(null);
    const [aliasError, setAliasError] = useState(null)
    const [emailError, setEmailError] = useState(null);
    const [nickError, setNickError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const { onRegister, onRegisterFederate, isLoading } = useContext(AuthenticationContext)

    const handleSignUp = () => {
        if (ValidationsSignUp(  fullName, setFullNameError,
                                alias, setAliasError,
                                nick, setNickError,
                                email, setEmailError,
                                password, setPasswordError,
                                confirmPassword, setConfirmPasswordError)) {
            const data = {
                "fullname": fullName,
                "alias": alias,
                "interests": [],
                "zone": {"latitude": 0,
                        "longitude": 0},
                "pic": "https://firebasestorage.googleapis.com/v0/b/snap-msg.appspot.com/o/photos%2Fdefault.png?alt=media&token=f67f74e2-e9b6-4879-8ae1-637226214052",
                "email": email,
                "nick": nick,
                "birthdate": date.toISOString().substring(0,10),
                "ocupation": 'Not Found'
            }
            onRegister(data, password, timeInit, () => navigation.navigate('Finish'))
        }
    }; 

    const signButtonFederate = () => {
        onRegisterFederate((dataFederate) => navigation.navigate('Finish'))
    }   

    return (
        <View style={[stylesForms.container, { backgroundColor: theme.backgroundColor}]}>
            <View style={stylesForms.header}>
                <Logo/>
            </View>
            <ScrollView>
            <View style={stylesForms.body}>
                <Text style={stylesForms.textTittle} >
                    Create your account
                </Text>
                <Input
                    label={'Full name'}
                    icon={
                        <Icon   
                            name={'user'} 
                            color={colorText} 
                            size={20} 
                        />
                    }
                    data={fullName}
                    setData={setFullName}
                    error={fullNameError}   // Agregando el mensaje de error
                />
                <Input
                    label={'Alias'}
                    icon={
                        <Icon   
                            name={'id-card'} 
                            color={colorText} 
                            size={20} 
                        />
                    }
                    data={alias}
                    setData={setAlias}
                    error={aliasError}   // Agregando el mensaje de error
                />
                <Input
                    label={'Nick'}
                    icon={
                        <Icon   
                            name={'tag'} 
                            color={colorText} 
                            size={20} 
                        />
                    }
                    data={nick}
                    setData={setNick}
                    error={nickError}       // Agregando el mensaje de error
                />
                <Calendar   data={date} 
                            setData={setDate} 
                            error={dateError} 
                            setError={setDateError} />
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
                    error={emailError}      // Agregando el mensaje de error
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
                    error={passwordError}   // Agregando el mensaje de error
                />
                <Input
                    label="Confirm Password"
                    icon={
                        <Icon   
                            name={visibleConfirm ? 'eye' : 'eye-slash'} 
                            color={colorText} 
                            size={20} 
                            onPress={() => setVisibleConfirm(!visibleConfirm)}
                        />
                    }
                    inputType={!visibleConfirm}
                    data={confirmPassword}
                    setData={setConfirmPassword}
                    error={confirmPasswordError}  // Agregando el mensaje de error
                />
                {isLoading ? 
                        <View style={stylesForms.bodyButtonsLoading}>
                            <ActivityIndicator size={'large'} color={colorApp}/> 
                        </View> 
                    :
                        <View style={stylesForms.bodyButtons}>
                            <CancelButton navigation={navigation}/>
                            <AcceptButton accept={handleSignUp}/>
                        </View>
                }
            </View>
            <View style={stylesForms.footer}>
                <View style={stylesForms.footerOption}>
                    <Separate/>
                    <ButtonFederate name={'Google'} sign={signButtonFederate} />
                </View>
                <View style={stylesForms.footerText}>
                    <Text style={stylesForms.text}>
                        Already have an account?
                    </Text>
                    <TouchableHighlight onPress={() => {navigation.navigate('SignIn')}}>
                        <Text style={stylesForms.textSign}> Sign In</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
    
export default SignUp;
