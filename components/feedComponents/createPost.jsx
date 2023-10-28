import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { Octicons } from '@expo/vector-icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import BackButton from '../buttons/buttonBack';
import ImagePicker from 'react-native-image-crop-picker';

const CreatePostScreen = ({ navigation }) => {
    const { userData } = useContext(LoggedUserContext)
    
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const takePhotoFromCamera = () => {
        console.log("entro a choose foto from cam")
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };
    
    const choosePhotoFromGalery = () => {
        console.log("entro a choose foto from gale")
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };
    
    const actions = [
        {
          text: "Take Photo",
          icon: <Icon name="camera" size={25} color="white" />,
          color: colorApp,
          name: "bt_take_photo",
          position: 1,
        },
        {
          text: "Choose Photo",
          icon: <SimpleLineIcons name="picture" size={25} color="white" />,
          color: colorApp,
          name: "bt_choose_photo",
          position: 2
        },
    ];
	return (
		<View style={styles.container}>
            <View style={styles.header}>
                {/* Back button */}
                <BackButton onPress={() => {navigation.goBack()}}/>
                <TouchableHighlight
                        style={styles.cancelButton}
                        onPress={() => { 
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.cancelButtonLabel}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.postButton}
                    onPress={() => { }}>
                    <Text style={styles.postButtonLabel}>Post</Text>
                </TouchableHighlight>
            </View>

            <View style={styles.inputContainer}>
                <Image source={{uri: userData.pic}} style={styles.image} />
                <TextInput
                    value={text}
                    onChangeText={(content) => setText(content)}
                    placeholder="What's happening?"
                    multiline
                    numberOfLines={5}
                    style={styles.textInput}
                    placeholderTextColor={colorText}
                    autoFocus
                />
            </View>
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                    if (name === "bt_take_photo") {
                        takePhotoFromCamera();
                    } else if (name === "bt_choose_photo") {
                        choosePhotoFromGalery();
                    }
                }}
                color={colorApp}
                overlayColor= 'rgba(68, 68, 68, 0.0)'
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
        padding: 10,
	},
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'black',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        height: 50,
    },
    text: {
		color: colorText,
		paddingVertical: 10,
	},
    inputContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    postButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		width: 110,
		height: 30,
		paddingHorizontal: 15,
    },
    postButtonLabel: {
        color: colorApp,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        color: 'white',
        height: 50,
    },
	cancelButton: {
		position: 'absolute',
        left: 50,
        top: 12,
	},
    cancelButtonLabel: {
        color: 'white',
		fontSize: 16,
    }
});

export default CreatePostScreen;