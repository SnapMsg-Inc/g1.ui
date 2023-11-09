import { StyleSheet } from "react-native";
import { colorApp } from "../appColors/appColors";

const stylesPost = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: colorApp,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default stylesPost