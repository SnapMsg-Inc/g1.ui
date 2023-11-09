import { StyleSheet } from "react-native";
import { colorText, colorApp } from "../appColors/appColors";

const stylesAccept = StyleSheet.create({
    container: {
        backgroundColor: colorText,
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
    },
    font: {
        color: colorApp,
        fontSize: 22,
    }
})

export default stylesAccept
