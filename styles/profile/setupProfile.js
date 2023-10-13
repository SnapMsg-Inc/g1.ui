import { StyleSheet } from "react-native";
import { colorText } from "../SignForms";

const colorApp = '#1ed760'

const stylesEditProfile = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black' 
    },
    header: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    footer:{
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    body: {
        flexDirection: 'column'
    },
    textTittle: {
        color: colorApp,
        fontSize: 32,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    text:{
        color:colorText,
    }
})

export default stylesEditProfile