import { StyleSheet } from "react-native";
import { colorApp, colorBackground, colorText, colorWhite } from "../appColors/appColors";

export const styleRegister = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
    },
    header: {
        paddingBottom: 10,
        flexDirection:'column',
        paddingVertical:10,
        paddingBottom: 20,
    },
    body: {
        paddingHorizontal: 10, 
    },
    title: {
        color: colorApp,
        paddingHorizontal: 55,
        fontSize: 34,
    },
    text: {
        color: colorText,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    item: {
        color: colorText,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignContent:'center',
        alignItems: 'center'
    },
    itemContainer: {
        paddingHorizontal:30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    phoneContainer: {
        alignContent: 'center'
    },
    btnPhone: {
        paddingHorizontal: 30,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colorBackground,
        backgroundColor: colorWhite,
        width: 50,
        height: 50,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 22,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    codeContainer: {
        flexDirection: 'column'
    },
    btnAccept: {
        paddingHorizontal:30,
        alignItems: 'center'
    },
    errorContainer:{
        paddingHorizontal:30,
        alignItems: 'center',
        paddingBottom: 10,
    },
    textError: {
        color: colorApp,
        fontSize: 18,
        fontWeight: 'bold'
    }
})