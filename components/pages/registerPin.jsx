import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../color/themeContext";
import { styleRegister } from "../../styles/register/register";
import Logo from "../common/logo";
import { Octicons } from '@expo/vector-icons';
import { useContext, useRef, useState } from "react";
import Input from "../forms/input";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/appColors/appColors";
import axios from "axios";
import AcceptButton from "../buttons/buttonAcept";
import { auth } from "../connectivity/firebase";
import { TextInput } from "react-native-gesture-handler";
import { AuthenticationContext } from "../connectivity/auth/authenticationContext";
import { sendMetricsDD } from "../connectivity/ddMetrics";

const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendSMS = async (from, text, to, apiKey, apiSecret) =>
    await axios.post(
        'https://rest.nexmo.com/sms/json',
        `from=${from}&text=${text}&to=${to}&api_key=${apiKey}&api_secret=${apiSecret}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
    );

const sendEmail = async (toEmail, keySmpt, verificationCode) =>
    await axios.post(
        'https://api.smtp2go.com/v3/email/send',
        {
          api_key: keySmpt,
          to: [toEmail],
          sender: 'Snap-Msg Support <jchavez@fi.uba.ar>', // Reemplaza con tu dirección de correo electrónico
          subject: 'Verification Register from Snap-Msg',
          text_body: `Your Snap-Msg verification code is: ${verificationCode}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    );


export default function RegisterPin ({ navigation }) {
    const { theme } = useTheme()
    const { markRegisterComplete } = useContext(AuthenticationContext)
    const [openSMS, setOpenSMS] = useState(false)
    const [openMail, setOpenMail] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [openInputCode, setOpenInputCode] = useState(false)
    const [verificationCode, setVerificationCode] = useState();
    const [inputCode, setInputCode] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [codeError, setCodeError] = useState(false)

    const handleOpenSMS = () => {
        setOpenSMS(!openSMS)
        if (openMail)
            setOpenMail(!openMail)
        if (openInputCode){
            setOpenInputCode(!inputCode)
            setInputCode(['','','',''])
            setCodeError(false)
        }
    }

    const handleOpenEmail = () => {
        setOpenMail(!openMail)
        if (openSMS)
            setOpenSMS(!openSMS)
        if (openInputCode) {
            setOpenInputCode(!inputCode)
            setInputCode(['','','',''])
            setCodeError(false)
        }
    }
    
    const handleSubmitSMS = () => {
        const codeSend = generateVerificationCode()
        const from = "Snap-Msg App"
        const text = `Your Snap-Msg verification register code is: ${codeSend}`
        const apiKey = "4f84bbb3"
        const apiSecret = "bOeKUVpt7rL1nYeB"
        sendSMS(from, text,phoneNumber,apiKey,apiSecret)
        .then(response => { 
            setOpenSMS(!openSMS)
            setOpenInputCode(!openInputCode)
            setVerificationCode(codeSend)
        })
        .catch(error => { 
            console.error('There was an error sending the messages. With error: ', error.response.status); 
            Alert.alert('Error', 'Message delivery failed')
        });
    }

    const handleSubmitEmail = () => {
        const smtpKey = 'api-F64A07454D614F348BD2343DE1FFDEF2'
        const codeSend = generateVerificationCode()
        if (auth.currentUser.email === email) {
            sendEmail(email, smtpKey, codeSend)
            .then((response) => {
                setOpenMail(!openMail)
                setOpenInputCode(!openInputCode)
                setVerificationCode(codeSend)
            })
            .catch(error => console.error(error.response))
        } else {
            Alert.alert('Error', 'Email delivery failed')
        }
    }

    const handleChange = (index, value) => {
        const newVerificationCode = [...inputCode];
        newVerificationCode[index] = value;
        setInputCode(newVerificationCode);

        // Mueve el enfoque al siguiente input si el valor es no vacío
        if (value !== '' && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }

        // Regresa al input anterior si el valor es vacío
        if (value === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleAcceptCode = () => {
        setCodeError(false)
        if (verificationCode === inputCode.join('')) {
            markRegisterComplete()
        } else {
            setCodeError(true)
        } 
    }

    return (
        <View style={[styleRegister.container, { backgroundColor: theme.backgroundColor}]}>
            <View style={styleRegister.header}>
                <Logo/>
            </View>
            <View style={styleRegister.body}>
                <Text style={styleRegister.title}>
                    Validation register
                </Text>
                <Text style={styleRegister.text}>
                    Choose PIN Verification method
                </Text>
                <TouchableOpacity style={styleRegister.itemContainer} 
                    onPress={handleOpenSMS}>
                        <Octicons name='device-mobile'
                            color={colorText}
                            size={25}/>
                        <Text style={styleRegister.item}>
                            PIN SMS        
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleRegister.itemContainer} 
                    onPress={handleOpenEmail}>
                        <Icon name='envelope'
                            color={colorText}
                            size={25}/>
                        <Text style={styleRegister.item}>
                            PIN Email        
                        </Text>
                </TouchableOpacity>
                {openSMS && 
                    <View style={styleRegister.phoneContainer}>
                        <Input
                            label={'Phone Number: +99 9 9999-9999'}
                            keyboardType={'phone-pad'}
                            icon={
                                <Icon name='phone'
                                    color={colorText}
                                    size={20}/>
                            }
                            data={phoneNumber}
                            setData={setPhoneNumber}
                        />
                        <View style={styleRegister.btnPhone}>
                            <AcceptButton text="Send Message" accept={handleSubmitSMS}/>
                        </View>
                    </View>
                }
                {openMail && 
                    <View style={styleRegister.phoneContainer}>
                        <Input
                            label={'Email'}
                            keyboardType={'email-address'}
                            icon={
                                <Icon name='envelope'
                                    color={colorText}
                                    size={20}/>
                            }
                            data={email}
                            setData={setEmail}
                        />
                        <View style={styleRegister.btnPhone}>
                            <AcceptButton text="Send Email" accept={handleSubmitEmail}/>
                        </View>
                    </View>
                }
                {openInputCode &&
                    <View styles={styleRegister.codeContainer}>
                        <View style={styleRegister.inputContainer}>
                            {inputCode.map((value, index) => (
                                <TextInput
                                    key={index}
                                    ref={inputRefs[index]}
                                    style={styleRegister.input}
                                    value={value}
                                    onChangeText={(text) => handleChange(index, text)}
                                    maxLength={1}
                                    keyboardType="numeric"
                                />
                            ))}
                        </View>
                        {codeError &&
                            <View style={styleRegister.errorContainer}>
                                <Text style={styleRegister.textError}>
                                    Invalid verification code.
                                </Text>
                            </View>
                        }
                        <View style={styleRegister.btnAccept}>
                            <AcceptButton text="Verify Code" accept={handleAcceptCode}/>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}