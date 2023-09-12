import { StyleSheet } from "react-native";

const colorBackground = '#000'
const colorApp = '#1ed760'
const colorWhite = '#fff'
const colorGray = '#535353'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorBackground,
      alignItems:'center',
    },
    containerBtn: {
      flex: 2,
      backgroundColor: colorBackground,
    },
    font: {
      color: colorWhite,
      fontSize: 40,
      justifyContent: 'flex-start',
      marginHorizontal: 40,
    },
    btn :{
      backgroundColor: colorWhite,
      alignItems:'flex-end',
      justifyContent: 'center',
      marginHorizontal: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginBottom: 20,
    },
    fontBtn: {
      fontSize: 16,
      fontFamily: 'Roboto',
      justifyContent: 'flex-end',
    },
    lineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colorBackground,
      paddingHorizontal:30,
      paddingBottom: 10,
      marginTop:-10,
    },
    dash: {
      flex: 1,
      height: 1,
      backgroundColor: colorGray,
      marginHorizontal: 1,
    },
    text: {
      fontSize: 16,
      fontFamily: 'Roboto',
      marginHorizontal: 10,
      color: colorGray,
    },
    btnSignUp: {
      backgroundColor: colorApp,
      alignItems:'center',
      justifyContent: 'center',
      marginHorizontal: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginBottom: 20,
    },
    fontSignUp: {
      fontSize: 24,
      fontFamily: 'Roboto',
      justifyContent: 'flex-end',
      color: colorWhite
    },
    btnSignIn: {
      backgroundColor: colorGray,
      alignItems:'center',
      justifyContent: 'center',
      marginHorizontal: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colorApp,
    },
    fontSignIn: {
      fontSize: 24,
      fontFamily: 'Roboto',
      justifyContent: 'flex-end',
      color: colorApp
    },
    fontSugestion: {
      fontSize: 14,
      fontFamily: 'Roboto',
      marginHorizontal: 10,
      color: colorWhite,
      marginHorizontal: 30,
      marginBottom: 3,
      marginTop: 20
    }
  });
  
export default styles