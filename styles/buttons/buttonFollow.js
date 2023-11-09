import { StyleSheet } from "react-native";
import { colorApp, colorBackground, colorWhite } from "../appColors/appColors";

const stylesFollow = StyleSheet.create({
	followButton: {
		marginHorizontal: 10,
		marginTop: 20,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		width: 110,
		height: 30,
		paddingHorizontal: 15,
	},
	card: {
		paddingVertical: 5,
		borderRadius: 10,
		paddingHorizontal: 15,
		width: 110,
		backgroundColor: colorApp,
		alignItems: 'center',
		justifyContent: 'center'
	},
	followingButton: {
		backgroundColor: colorBackground,
		borderWidth: 0.8,
		borderColor: colorApp
	},
	notFollowingButton: {
		backgroundColor: colorApp,
		borderWith: 0.8,
		borderColor: colorApp
	},
	followButtonText: {
		color: colorWhite,
		fontWeight: 'bold',
	},
	followingButtonText: {
		color: colorApp,
		fontWeight: 'bold',
	},
});

export default stylesFollow