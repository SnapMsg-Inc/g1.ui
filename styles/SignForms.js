import { StyleSheet, Dimensions } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'
const colorText = '#535353'

const stylesForms = StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: colorBackground,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colorBackground,
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 5,
        marginTop: 10,
        marginBottom: 40,
    },
    footer: {
        flex: 2,
        marginTop: 80,
        alignItems: 'flex-end',
    },
    footerLogin:{
        marginTop: 220,
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
