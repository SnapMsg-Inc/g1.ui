import { StyleSheet } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'
const colorText = '#535353'

const stylesForms = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
        alignContent: 'center',
    }, 
    header:{
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginHorizontal: 5,
    },
    form: {
        marginHorizontal: 30,
    },
    textTittle: {
        color: colorApp,
        fontSize: 32,
        marginBottom: 20,
        marginTop: 20,
        marginHorizontal: 25,
    },
    text: {
        color: colorText,
    },
    bottomForm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        bottom: -280,
    },
    bottomSignUp: {
        alignItems: 'flex-end',
        marginHorizontal: 30,
        bottom: -150
    }
})

export default stylesForms
