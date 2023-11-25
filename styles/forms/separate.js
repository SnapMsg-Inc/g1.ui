import { StyleSheet } from "react-native";
import { colorText } from "../appColors/appColors";

const stylesSeparate = StyleSheet.create({
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:30,
        paddingBottom: 10,
    },
    dash: {
        flex: 1,
        height: 1,
        backgroundColor: colorText,
        marginHorizontal: 1,
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
        color: colorText,
    },
})

export default stylesSeparate