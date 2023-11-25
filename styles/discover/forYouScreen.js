import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp, colorWhite } from "../appColors/appColors";

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: colorBackground
	},
	container: {
		flex:1,
		backgroundColor: colorBackground,
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		color: colorWhite,
		fontWeight: 'bold',
		marginHorizontal: 10,
	},
	textAlt: {
		fontSize: 16,
		color: colorText,
		marginHorizontal: 10,
	}
});

export default styles;
