import { StyleSheet } from "react-native";
import { colorApp, colorBackground, colorText } from "../appColors/appColors";

const stylesPreferences = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colorBackground,
    },
    header: {
        paddingBottom: 10,
        flexDirection:'column',
        paddingVertical:10,
        paddingBottom: 20,
    },
    body: {
        flex:1,
        alignItems: 'flex-start',
        marginHorizontal: 30,
    },
    footer: {
        alignItems: 'flex-end',
    },
    buttonsContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textTitle: {
        alignContent: 'flex-start',
        color: colorApp,
        fontSize: 32,
        marginHorizontal: 10,
        paddingBottom: 20,
    },
    text: {
        fontSize: 16,
        color: colorText,
        alignItems: 'flex-start',
        marginHorizontal: 10,
        marginBottom: 20,
    },
})

export default stylesPreferences
