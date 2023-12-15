import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp, colorWhite } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
        padding: 10,
	},
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: colorBackground,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colorText,
        height: 50,
    },
    text: {
		color: colorText,
		paddingVertical: 10,
	},
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: colorWhite
    },
    postButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		width: 110,
		height: 30,
		paddingHorizontal: 15,
    },
    postButtonLabel: {
        color: colorApp,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        color: colorWhite,
        textAlignVertical: 'top',
        paddingHorizontal: 10,
    },
	cancelButton: {
		position: 'absolute',
        left: 50,
        top: 12,
	},
    cancelButtonLabel: {
        color: colorWhite,
		fontSize: 16,
    },
    postImage: {
        borderRadius: 15,
        width: '%100',
        height: 250,
        marginVertical: 10,
    },
    statusWrapper: {
        position: 'absolute',
        right: 10,
        top: -15,
    }
});

export default styles;

