import { StyleSheet } from "react-native";
import { colorText, colorApp, colorBackground, colorWhite } from "../appColors/appColors";

const stylesEditProfile = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground
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
    },
    textInput: {
        flex: 1,
        color: colorWhite,
        textAlignVertical: 'top',
    },
    imageButtonContainer: {
        flexDirection: 'row',
      },
    imageButton: {
        backgroundColor: colorApp,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        marginLeft: 60,
        marginTop: -25
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    optionButtonContainer: {
        marginLeft: 220,
    },
    optionButton: {
        flexDirection: 'row',
        padding: 5
    },
    optionButtonText: {
        color: colorWhite,
        marginLeft: 5,
    }
})

export default stylesEditProfile