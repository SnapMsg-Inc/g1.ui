import React, { useState } from "react";
import {ScrollView,
        Text,
        TouchableHighlight,
        View } from "react-native";
import AcceptButton from "../buttons/buttonAcept";
import ButtonFederate from "../buttons/buttonFederate";
import CancelButton from "../buttons/buttonCancel";
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from "../forms/input";
import Logo from "../logo";
import Separate from "../forms/separate";
import stylesForms, { colorText } from "../../styles/SignForms";
import Calendar from "../forms/calendar";
import CreateAccount, { SignFederate } from "../connectivity/authorization";

function SignUp({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sucess, setSucces] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [date, setDate] = useState(new Date())
    const [userFederate, setUserFederate] = useState({
        id: '',
        name: '',
        email: '',
        photo: '',
        familyName: '',
        givenName: ''
    })
// validacion
    const [fullNameError, setFullNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [nickError, setNickError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [dateError, setDateError] = useState(null);



    const isValidEmail = (email) => {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };
    
    const isValidPassword = (password) => {
        return password.length >= 8; // Password must be at least 8 characters
    };

    const Validations = () => {
        let isValid = true; 
    
        if (!fullName.trim()) {
            setFullNameError('Full name is required.');
            isValid = false;
        } else {
            setFullNameError(null);
        }
    
        if (!nick.trim()) {
            setNickError('Nick is required.');
            isValid = false;
        } else {
            setNickError(null);
        }
    
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
    
        if (password !== confirmPassword) {
            setConfirmPasswordError('Password and confirmation do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError(null);
        }
    
        if (isValid) {
            // If all validations pass, create the account
            // CreateAccount(fullName,nick,date,email,password)
            navigation.navigate('Setup');
        }
    };
// ======
    const handleSignUp = async () => {
        if (fullName === '' | email === '' | nick === '' |
            password === '' | date === '' | confirmPassword === '')
            alert('Please fill out all required fields.')
        else if (password != confirmPassword)
            alert('Password and confirmation do not match.\nPlease try again.')
        else
            try {
                const success = CreateAccount(fullName,nick,date,email,password)
                if (success)
                    setTimeout(() => {navigation.navigate('Setup')}, 1000)
                else 
                    alert('Account creation failed.\nPlease ensure that all the information you provided is accurate and try again.')
            } catch (error) {
                console.log(error)
                alert('An error occurred while signing up. Please try again later.')
            }
    }; 
// ====

    const signButtonFederate = async () => {
        try {
            const success = SignFederate(true, setUserFederate)
            if (success)
                setTimeout(() => {navigation.navigate('Setup')}, 1000)
        } catch (error) {

        }
    }   

    return (
        <View style={stylesForms.container}>
            <View style={stylesForms.header}>
                <Logo/>

              </View>
// validaciones
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
                    label={'Nick'}
                    icon={
                        <Icon   
                            name={'id-card'} 
                            color={colorText} 
                            size={20} 
                        />
                    }
                    data={nick}
                    setData={setNick}
                    error={nickError}       // Agregando el mensaje de error
                />
                <Calendar data={date} setData={setDate} error={dateError} setError={setDateError} />
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
                <View style={stylesForms.bodyButtons}>
                    <CancelButton navigation={navigation}/>
                    <AcceptButton accept={handleSignUp}/>
                </View>
            </View>
            <View style={stylesForms.footer}>
                <View style={stylesForms.footerOption}>
                    <Separate/>
                    <ButtonFederate name={'Google'}/>
                </View>
                <View style={stylesForms.footerText}>
                    <Text style={stylesForms.text}>
                        Already have an account?
// =======
            <ScrollView>
                <View style={stylesForms.body}>
                    <Text style={stylesForms.textTittle} >
                        Create your account
//dev
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
                    />
                    <Input
                        label={'Nick'}
                        icon={
                            <Icon   
                                name={'id-card'} 
                                color={colorText} 
                                size={20} 
                            />
                        }
                        data={nick}
                        setData={setNick}
                    />
                    <Calendar data={date} setData={setDate}/>
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
                    />
                    <View style={stylesForms.bodyButtons}>
                        <CancelButton navigation={navigation}/>
                        <AcceptButton accept={handleSignUp}/>
                    </View>
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
    );}
    
    export default SignUp;
