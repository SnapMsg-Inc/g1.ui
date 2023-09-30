import { StyleSheet } from "react-native";

const colorBackground = 'black'
const colorGray = '#535353'

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
        backgroundColor: colorGray,
        marginHorizontal: 1,
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
        color: colorGray,
    },
})

export default stylesSeparate