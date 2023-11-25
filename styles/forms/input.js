import { StyleSheet } from "react-native";
import { colorApp, colorText } from "../appColors/appColors";

const styleInput = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom:15,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        color: colorText,
        borderBottomColor: colorText,
        borderBottomWidth: 1,
        marginBottom: 5,
        marginTop: 20,
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingHorizontal: 3,
    },
    inputError: {
        color: colorApp,
        marginHorizontal: 30,
    },
    textInput: {
        fontSize: 20,
        flex: 1, 
        paddingVertical: 0,
        color: colorText,
    }
})

export default styleInput
