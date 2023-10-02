import { StyleSheet } from "react-native";
import { colorText } from "./input";

const colorApp = '#1ed760'

const stylesSetup = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
        marginHorizontal: 10,
        paddingBottom: 20,
    },
    footer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
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
    }
})

export default stylesSetup
