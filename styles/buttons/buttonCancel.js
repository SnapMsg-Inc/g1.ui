import { StyleSheet } from "react-native";
import { colorApp, colorWhite } from "../appColors/appColors";

const stylesCancel = StyleSheet.create({
    container: {
        backgroundColor: colorApp,
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
    },
    font: {
        color: colorWhite,
        fontSize: 22,
    }
})

export default stylesCancel
