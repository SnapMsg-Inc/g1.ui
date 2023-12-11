import { StyleSheet } from "react-native";
import { colorApp, colorBackground, colorWhite } from "../appColors/appColors";

export const styleRegister = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
    },
    header: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        
    },
    title: {
        color: colorApp,
        marginHorizontal: 30,
        fontSize: 32,
        marginTop: 15,
        marginBottom: 15,
    },
    captchaButton: {
        color: colorWhite,
    },
    captcha: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    }
})