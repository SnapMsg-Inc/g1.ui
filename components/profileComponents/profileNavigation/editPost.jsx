import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput,
    TouchableHighlight, ScrollView, Alert, ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { Octicons } from '@expo/vector-icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import BackButton from '../../buttons/buttonBack';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { PatchPostData, createPost } from '../../connectivity/servicesUser';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { colorApp, colorBackground, colorText } from '../../../styles/appColors/appColors';
import styles from '../../../styles/profile/editPost';

const EditPost = ({ navigation }) => {
    const route = useRoute();
	const { data } = route.params;

    const { userData } = useContext(LoggedUserContext)

    const [text, setText] = useState(data.content);
    const [image, setImage] = useState(data.picUri[0]);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [hashtags, setHashtags] = useState([]);
    const [isPublic, setIsPublic] = useState(true);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        })
        .then((image) => {
            if (!image.cancelled) {
                console.log(image);
                const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                setImage(imageUri);
            }
        })
        .catch(error => {
            if (error.message === 'User cancelled image selection') {
            } else {
                console.error(error);
            }
        });
    };
    
    const choosePhotoFromGalery = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        })
        .then((image) => {
            if (!image.cancelled) {
                const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                setImage(imageUri);
            }
        })
        .catch(error => {
            if (error.message === 'User cancelled image selection') {
            } else {
                console.error(error);
            }
        });
    };
    
    const extractHashtags = (inputText) => {
        const hashtagRegex = /#[^\s#]+/g;
        const extractedHashtags = inputText.match(hashtagRegex);
        setHashtags(extractedHashtags || []);
    };

    const handleTextChange = (content) => {
        setText(content);
        extractHashtags(content);
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        const uri = imageUrl ? [imageUrl] : [];
    
        const postData = {
            "text": text,
            "hashtags": hashtags,
            "media_uri": uri,
            "is_private": !isPublic,
        }
        try {
            const success = await PatchPostData(postData, data.pid);
            if (success) {
                setTimeout(() => navigation.goBack(), 500);
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error("Error al realizar la solicitud PATCH:", error);
            alert('Error al realizar la solicitud PATCH');
        }
    }

    const uploadImage = async () => {
        if( image == null ) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
        setUploading(true);
        setTransferred(0);
        console.log("file: ", filename)
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
        console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
    
        setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
        });
    
        try {
        await task;
    
        const url = await storageRef.getDownloadURL();
    
        setUploading(false);
        setImage(null);
    
        // Alert.alert(
        //   'Image uploaded!',
        //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
        // );
        return url;
    
        } catch (e) {
            console.log(e);
        return null;
        }
    
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

    const defaultImage = require('../../../assets/default_user_pic.png')
    
    const handleToggleIsPublic = () => {
        isPublic ? setIsPublic(false) : setIsPublic(true);
    }

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
                {uploading ? (
                    <View style={styles.statusWrapper}>
                        <Text>{transferred} % Completed!</Text>
                        <ActivityIndicator size="large" color={colorApp} />
                    </View>
                    ) : (
                    <TouchableHighlight
                        style={styles.postButton}
                        onPress={submitPost}>
                        <Text style={styles.postButtonLabel}>Confirm edition</Text>
                    </TouchableHighlight>
                )}
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.inputContainer}>
                    <Image source={( userData.pic == 'none') || (userData.pic === '') ? defaultImage : { uri: userData.pic}} style={styles.image} />
                    <View style={{ flex: 1}}>
                        {
                            isPublic ? (
                                <TouchableOpacity onPress={handleToggleIsPublic}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: colorApp, marginRight: 10}}>Public</Text>
                                        <FontAwesome5 name="lock-open" color={colorApp} size={16} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleToggleIsPublic}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: 'red', marginRight: 10}}>Private</Text>
                                        <FontAwesome5 name="lock" color={'red'} size={16} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        <TextInput
                            value={text}
                            onChangeText={handleTextChange}
                            placeholder="What's happening?"
                            multiline
                            numberOfLines={5}
                            style={styles.textInput}
                            placeholderTextColor={colorText}
                            autoFocus
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                {image != null ? <Image source={{uri: image}} style={styles.postImage}/> : null}
            </ScrollView>
            <FloatingAction
                actions={actions}
                onPressItem={name => {
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

export default EditPost;
