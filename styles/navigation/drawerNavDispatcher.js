import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp, colorWhite } from "../appColors/appColors";

const styles = StyleSheet.create({
	text: {
		color: colorWhite,
		marginLeft: 5,
		fontSize: 15,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});

export default styles;
