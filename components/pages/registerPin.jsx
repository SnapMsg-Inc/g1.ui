import { Button, Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../color/themeContext";
import { styleRegister } from "../../styles/register/register";
import Logo from "../common/logo";
import { Octicons } from '@expo/vector-icons';
import { useCallback, useRef, useState } from "react";
import Input from "../forms/input";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/appColors/appColors";
import Recaptcha from 'react-native-recaptcha-that-works';
import { RecaptchaVerifier, getAuth, linkWithPhoneNumber } from "@firebase/auth";
import * as firebase from 'firebase/app'
import { auth } from "../connectivity/firebase";

export default function RegisterPin ({ navigation }) {
    const { theme } = useTheme()
    const [openSMS, setOpenSMS] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState('')
    const $recaptcha = useRef();
    const [keyCaptcha, setKeyCaptcha] = useState('')
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();

    const handleOpenPress = useCallback(() => {
        $recaptcha.current.open();
    }, []);
    
    const handleClosePress = useCallback(() => {
        $recaptcha.current.close();
    }, []);

    const handleOpenSMS = () => {
        setOpenSMS(!openSMS)
    }
    
    const handleSubmit =  async () => {
        console.log('keycaptcha', keyCaptcha )
        // console.log('verifierapp', appVerifier)
        await linkWithPhoneNumber(getAuth().currentUser, phoneNumber, keyCaptcha)
        .then((result) => {
            setVerificationId(result.verificationId)
        })
        .catch((error) => console.log(error))
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
                <Text>
                    Choose PIN Verification method
                </Text>
                <TouchableOpacity onPress={handleOpenSMS}>
                        <Text>
                            <Octicons name='device-mobile'
                                color={colorText}
                                size={25}/>
                            PIN SMS        
                        </Text>
                </TouchableOpacity>
                {openSMS && 
                    <View>
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
                        <TouchableOpacity onPress={handleOpenPress}>
                            <Text>Complete Captcha</Text>
                        </TouchableOpacity>
                        <View>
                            <Recaptcha
                                ref={$recaptcha}
                                siteKey="6Lc2Bi4pAAAAALDs-OoQ_aw5KhpC9PjyBZFPP2Kf"
                                baseUrl="https://backoffice-backoffice-marioax.cloud.okteto.net"
                                footerComponent={
                                    <View style={styleRegister.captcha}>
                                        <TouchableOpacity onPress={handleClosePress}>
                                            <Text style={styleRegister.captchaButton}>
                                                <Octicons name="x-circle" size={30}/>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                onVerify={(token) => setKeyCaptcha(token)}
                                onError={(err) => {
                                    console.warn('error', err);  
                                }}
                                size="normal"
                            />
                        </View>
                        <Button title="Send Message" onPress={handleSubmit}/>
                    </View>
                }
            </View>
        </View>
    )
}