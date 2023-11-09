import { StyleSheet } from "react-native";
import { colorBackground, colorText, colorApp } from "../appColors/appColors";

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 0.5,
        borderColor: colorText,
        borderRadius: 10,
        marginBottom: 10,   
    },
	container: {
		flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between'
  },
	profileImage: {
		width: 45,
		height: 45,
		borderRadius: 40,
        marginTop: -35,
        marginLeft: 10,
        marginBottom: -10,
	},
	infoContainer: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
	nick: {
		color: colorText,
		fontSize: 16,
	},
    banner: {
        height: 75,
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    interests: {
        marginHorizontal: 10,
        marginVertical: -5,
        marginBottom: 10,
        color: 'white',
    }
});

export default styles;
