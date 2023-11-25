import { StyleSheet } from "react-native";
import { colorApp, colorText, colorBackground } from "../appColors/appColors";

const stylesCalendar = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 15,
    },
    calendarContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginBottom: 5,
        marginTop: 20,
        color: colorText,
        borderBottomColor: colorText,
        borderBottomWidth: 1,
        paddingHorizontal: 3,
    },
    text: {
        fontSize: 20,
        paddingVertical: 0,
        color: colorText,
    },
    textError: {
        color: colorApp,
        marginHorizontal: 30,
    },
    calendar: {
        backgroundColor: colorBackground,
    }
})

export default stylesCalendar