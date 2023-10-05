import { Dimensions, StyleSheet } from "react-native";

const colorApp = '#1ed760'

const stylesSelect = StyleSheet.create({
    button: {
        backgroundColor: '#535353',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        height: 70,
        width: Dimensions.get('window').width * .4,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    selectedButton: {
        backgroundColor: colorApp, 
    },
    text: {
        fontSize: 20,
        color: colorApp,
    },
    selectedText: {
        fontSize: 20,
        color: 'white',
    },
})

export default stylesSelect
