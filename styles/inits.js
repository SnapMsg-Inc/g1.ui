import { StyleSheet } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'
const colorWhite = '#fff'
const colorGray = '#535353'

const stylesInit = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
        justifyContent: 'space-around',
    },
    header: {
        padding: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    body: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    font: {
        color: colorWhite,
        fontSize: 42,
        marginHorizontal: 30,
        marginBottom: 10,
    },
    btn :{
        backgroundColor: colorWhite,
        alignItems:'flex-end',
        justifyContent: 'center',
        marginHorizontal: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 20,
    },
    fontBtn: {
        fontSize: 16,
        justifyContent: 'flex-end',
    },
    touchable: {
        paddingVertical: 10,
    },
    btnSignUp: {
        backgroundColor: colorApp,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 20,
    },
    fontSignUp: {
        fontSize: 26,
        fontFamily: 'Roboto',
        justifyContent: 'flex-end',
        color: colorWhite
    },
    btnSignIn: {
        backgroundColor: colorGray,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colorApp,
    },
    fontSignIn: {
        fontSize: 26,
        fontFamily: 'Roboto',
        justifyContent: 'flex-end',
        color: colorApp
    },
    fontSugestion: {
        fontSize: 16,
        fontFamily: 'Roboto',
        marginHorizontal: 10,
        color: colorWhite,
        marginHorizontal: 30,
        marginBottom: 3,
        marginTop: 20,
        paddingBottom: 5,
    },
    footer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerText: {
        color: colorGray,
    }
});
  
export default stylesInit
