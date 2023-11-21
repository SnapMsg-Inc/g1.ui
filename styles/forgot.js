import { StyleSheet } from "react-native";
import { colorApp, colorBackground, colorText } from "./appColors/appColors";

export const stylesForgot = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground,
        flexDirection:'column',
    }, 
    header: {
        paddingBottom: 10,
        flexDirection:'column',
        paddingVertical:10,
        paddingBottom: 20,
    },
    body:{
        paddingHorizontal: 10,
    },
    title: {
        color: colorApp,
        fontSize: 32,
        paddingHorizontal: 30
    },
    text: {
        color: colorText,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    btnView: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: "space-between",
        paddingVertical: 30,
    }
})