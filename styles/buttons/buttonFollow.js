import { StyleSheet } from "react-native";

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
		backgroundColor: '#1ed760',
		alignItems: 'center',
		justifyContent: 'center'
	},
	followingButton: {
		backgroundColor: 'black',
		borderWidth: 0.8,
		borderColor: '#1ed760'
	},
	notFollowingButton: {
		backgroundColor: '#1ed760',
		borderWith: 0.8,
		borderColor: '#1ed760'
	},
	followButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	followingButtonText: {
		color: '#1ed760',
		fontWeight: 'bold',
	},
});

export default stylesFollow