import { StyleSheet } from "react-native";
import { colorBackground, colorWhite } from "../appColors/appColors";

const stylesButtonFederate = StyleSheet.create({
    btn: {
        backgroundColor: colorWhite,
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
    },
    btnLight: {
        backgroundColor: colorWhite,
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colorBackground
    },
    fontBtn: {
        fontSize: 16,
    },
})

export default stylesButtonFederate
