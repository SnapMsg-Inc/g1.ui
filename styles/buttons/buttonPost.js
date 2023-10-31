import { StyleSheet } from "react-native";

const colorBackground = '#535353'
const colorApp = '#1ed760'

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