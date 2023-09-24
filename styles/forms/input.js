import { StyleSheet } from "react-native";

export const colorText = '#535353'

const styleInput = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        color: colorText,
        borderBottomColor: colorText,
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingHorizontal: 3,
    },
    textInput: {
        fontSize: 20,
        flex: 1, 
        paddingVertical: 0,
        color: colorText,
    }
})

export default styleInput
