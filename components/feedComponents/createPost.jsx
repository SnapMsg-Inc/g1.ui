import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { Octicons } from '@expo/vector-icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const CreatePostScreen = ({ navigation }) => {
    const takePhotoFromCamera = () => {
        console.log("take photo from camera")
    };
    
    const choosePhotoFromGalery = () => {
        console.log("choose photo from galery")
    };
    
    const actions = [
        {
          text: "Take Photo",
          icon: <Icon name="camera" size={25} color="white" />,
          color: colorApp,
          name: "bt_take_photo",
          onPress:{takePhotoFromCamera},
          position: 1,
        },
        {
          text: "Choose Photo",
          icon: <SimpleLineIcons name="picture" size={25} color="white" />,
          color: colorApp,
          name: "bt_choose_photo",
          onPress: {choosePhotoFromGalery},
          position: 2
        },
    ];
	return (
		<View style={styles.container}>
			<Text style={styles.text}> CREATE POST </Text>
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                console.log(`selected button: ${name}`);
                }}
                color={colorApp}
                overlayColor= 'rgba(68, 68, 68, 0.3)'
                iconHeight={30}
                iconWidth={30} 
                floatingIcon={(
                    <SimpleLineIcons name="paper-clip" size={28} color="white" />
                )}
            />
		</View>
	);
};

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
        justifyContent: 'center',
	},
    text: {
		color: colorText,
		paddingVertical: 10,
	},
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
});

export default CreatePostScreen;