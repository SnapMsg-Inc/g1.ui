import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
        flex:1,
        backgroundColor: colorBackground,
        justifyContent: 'center',
    },
	tabBar: {
		backgroundColor: colorBackground,
	},
	label: {
		fontSize: 16,
		textTransform: 'none',
	},
});

export default styles;