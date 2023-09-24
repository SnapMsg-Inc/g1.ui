import { StyleSheet } from "react-native";

export const colorText = '#535353'

const stylesCalendar = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        color: colorText,
        borderBottomColor: colorText,
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingHorizontal: 3,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        paddingVertical: 0,
        color: colorText,
    },
    calendar: {
        backgroundColor: 'black', // Color de fondo
    }
})

export default stylesCalendar