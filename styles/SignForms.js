import { StyleSheet, Dimensions } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'
const colorText = '#535353'

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
        flex:1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
    },
    footer: {
        alignItems: 'flex-end',
    },
    footerLogin:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text:{
        marginHorizontal: 30,
        color: colorText,
        alignContent: 'center',
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
