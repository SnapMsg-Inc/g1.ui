import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp, colorWhite } from "../appColors/appColors";

const styles = StyleSheet.create({
    scrollView: {
      	backgroundColor: colorBackground,
    },
    headerContainer: {
		padding: 20,
		alignItems: 'flex-start',
    },
    profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 10,
    },
    nickname: {
		color: colorWhite,
		fontSize: 16,
		fontWeight: 'bold',
    },
    username: {
		color: colorText,
		fontSize: 16,
		fontWeight: 'normal',
    },
    followersContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		marginTop: 10,
    },
    followersCount: {
		color: colorWhite,
		fontWeight: 'bold',
    },
    followingCount: {
		color: colorWhite,
		fontWeight: 'bold',
    },
    signOutButton: {
		width: '50%',
		paddingVertical: 15,
    },
});

export default styles;
