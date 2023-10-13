import { StyleSheet } from "react-native";

export const colorText = '#535353'
const colorApp = '#1ed760'

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
        backgroundColor: 'black', // Color de fondo
    }
})

export default stylesCalendar