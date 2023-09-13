import { StyleSheet } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'

const stylesLogo = StyleSheet.create({
    containerLogo: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      fontLogo: {
        color: colorApp,
        fontSize: 46,
        marginLeft: 20,
      },
})

export default stylesLogo
