import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp } from "../appColors/appColors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    containerLogo: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fontLogo: {
        color: colorApp,
        fontSize: 25,
        marginLeft: 20,
    },
    tab: {
        paddingBottom: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingBottom: 20,
        marginLeft: 10,
    },
    font: {
        color: colorApp,
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

export default styles;
