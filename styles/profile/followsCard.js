import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp, colorWhite } from "../appColors/appColors";

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 40,
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colorWhite,
	},
	interests: {
		fontSize: 14,
		color: colorWhite,
	},
	nick: {
		color: colorText,
		fontSize: 15,
	}
});

export default styles;
