import { Dimensions, StyleSheet } from "react-native";
import { colorApp, colorText, colorWhite } from "../appColors/appColors";

const stylesSelect = StyleSheet.create({
    button: {
        backgroundColor: colorText,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        height: 70,
        width: Dimensions.get('window').width * .39,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    selectedButton: {
        backgroundColor: colorApp, 
    },
    text: {
        fontSize: 18,
        color: colorApp,
    },
    selectedText: {
        fontSize: 18,
        color: colorWhite,
    },
})

export default stylesSelect
