import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	snapMsg: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: colorText,
	},
	profilePicture: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	nickname: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white',
	},
	username: {
		color: colorText,
		fontWeight: 'normal',
	},
	text: {
		fontSize: 15,
		color: 'white',
	},
	stats: {
		fontSize: 15,
		color: colorText,
		marginRight: 35,
		marginLeft: 3,
		marginTop: 3,
	},
	actionButtons: {
		flexDirection: 'row',
		marginTop: 10,
	},
	actionButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	postPic: {
		width: '100%',
		aspectRatio: 16 / 9,
		marginVertical: 10,
		borderRadius: 15,
	},
	optionsMenuContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	optionsMenu: {
		position: 'absolute',
		width: 200,
		backgroundColor: 'rgba(0, 0, 0, 1)',
		borderWidth: 1,
		borderColor:  colorApp,
		borderRadius: 15
	},
	optionItem: {
		padding: 10,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	optionText: {
		marginLeft: 10,
		color: 'white',
	},
	hashtagStyle: {
		color: colorApp
	},
	mentionStyle: {
		color: colorApp
	}
});

export default styles;