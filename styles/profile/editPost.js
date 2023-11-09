import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
        padding: 10,
	},
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'black',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
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
        color: 'white',
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
        color: 'white',
        textAlignVertical: 'top',
    },
	cancelButton: {
		position: 'absolute',
        left: 50,
        top: 12,
	},
    cancelButtonLabel: {
        color: 'white',
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
