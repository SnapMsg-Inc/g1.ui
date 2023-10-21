import { StyleSheet, Dimensions } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const stylesForms = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colorBackground,
    },
    header: {
        paddingBottom: 10,
        flexDirection:'column',
        paddingVertical:10,
        paddingBottom: 20,
    },
    body: {
        alignItems: 'stretch',
        alignContent: 'flex-start',
    },
    bodyButtons:{
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginVertical: 30,
    },
    bodyButtonsLoading:{
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        marginVertical: 30,
    },
    footer: {
        justifyContent: 'space-between',
    },
    footerLogin:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerOption:{
        alignContent: 'space-between',
        justifyContent: 'space-between',
        paddingBottom: 30,
    },  
    footerText: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text:{
        color: colorText,
        paddingRight: 5,
    },
    textSign:{
        color: colorApp,
        alignContent: 'center',
    },
    textSugestion: {
        color: colorText,
        marginHorizontal: 30,
        fontSize: 16,
    },
    containerTextSugestion: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    textTittle: {
        color: colorApp,
        marginHorizontal: 30,
        fontSize: 32,
        marginTop: 15,
        marginBottom: 15,
    }
    
})

export default stylesForms
