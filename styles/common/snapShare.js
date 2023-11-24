import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp, colorWhite } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	snapShare: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
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
		color: colorWhite,
	},
	username: {
		color: colorText,
		fontWeight: 'normal',
	},
	text: {
		fontSize: 15,
		color: colorWhite,
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
		justifyContent: 'space-around',
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
		color: colorWhite,
	},
	hashtagStyle: {
		color: colorApp
	},
	mentionStyle: {
		color: colorApp
	},
	snapSharedBy: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
	},
});

export default styles;