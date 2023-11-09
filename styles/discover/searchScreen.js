import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
		alignItems: 'center'
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchBox: {
		flex: 1,
		justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginTop: 10,
	},
	text: {
		color: colorText,
		paddingVertical: 10,
	},
	textInput: {
		flex: 1,
		color: 'white',
	},
	cancelButton: {
		color: colorText,
		marginRight: 10,
        marginTop: 10,
		paddingVertical:10,
		fontSize: 16,
	}
});

export default styles;