import { StyleSheet } from "react-native";
import { colorText, colorApp, colorBackground } from "./appColors/appColors";

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
