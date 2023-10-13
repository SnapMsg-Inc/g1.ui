import { StyleSheet } from "react-native";

const colorBackground = '#000000'
const colorApp = '#1ed760'

const stylesSetUpProfile = StyleSheet.create({
    container: {
        backgroundColor: colorBackground,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginHorizontal: -10,
        marginTop: 15,
        alignItems: 'center',
        borderColor: colorApp,
        borderWidth: 0.8,
    },
    font: {
        color: colorApp,
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default stylesSetUpProfile
