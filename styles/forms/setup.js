import { StyleSheet } from "react-native";
import { colorText, colorApp, colorBackground } from "../appColors/appColors";

const stylesSetup = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground,
    },
    header: {
        paddingBottom: 10,
        flexDirection:'column',
        paddingVertical:10,
        paddingBottom: 20,
    },
    bodyLocation: {
        flex: .9,
        flexDirection: 'column',
    },
    bodyInterests: {
        flex:.9,
        alignItems: 'flex-start',
        marginHorizontal: 30,
    },
    buttonsContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textTitle: {
        alignContent: 'flex-start',
        color: colorApp,
        fontSize: 32,
        marginHorizontal: 25,
        paddingBottom: 20,
    },
    footer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    footerFirst: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-end'
    },
    buttonBack:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 8,
    },
    text: {
        color: colorText,
        fontSize: 20,
        marginLeft: 5
    },
    textSuggestion: {
        color: colorText,
        fontSize: 16,
        marginHorizontal: 30,
        justifyContent: 'flex-end'
    }
})

export default stylesSetup
