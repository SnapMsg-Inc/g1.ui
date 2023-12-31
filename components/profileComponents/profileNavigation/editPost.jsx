import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput,
    TouchableHighlight, ScrollView, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
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
import { useRoute } from '@react-navigation/native';
import { colorApp, colorBackground, colorText, colorWhite } from '../../../styles/appColors/appColors';
import styles from '../../../styles/profile/editPost';
import { useTheme } from '../../color/themeContext';

const EditPost = ({ navigation }) => {
    const route = useRoute();
	const { data } = route.params;
    const { theme } = useTheme()
    const { userData } = useContext(LoggedUserContext)

    const [originalText, setOriginalText] = useState(data.content);
    const [originalImage, setOriginalImage] = useState(data.picUri[0]);

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
        const textChanged = text !== originalText;
        const imageChanged = image !== originalImage;

        if (!textChanged && !imageChanged) {
            // Ningún cambio, no es necesario enviar una solicitud PATCH.
            navigation.goBack();
            return;
        }

        const imageUrl = imageChanged ? await uploadImage() : null;
        const uri = imageUrl ? [imageUrl] : [];

        let postData = {};

        if (textChanged && !imageChanged) {
            postData = {
                text: text,
                hashtags: hashtags
            };
        }

        if (!textChanged && imageChanged) {
            postData = {
                media_uri: uri
            };
        }

        if (textChanged && imageChanged) {
            postData = {
                text: text,
                hashtags: hashtags,
                media_uri: uri
            };
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

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
    
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
            console.error(e);
        return null;
        }
    
    };

    const actions = [
        {
          text: "Take Photo",
          icon: <Icon name="camera" size={25} color={colorWhite} />,
          color: colorApp,
          name: "bt_take_photo",
          position: 1,
        },
        {
          text: "Choose Photo",
          icon: <SimpleLineIcons name="picture" size={25} color={colorWhite} />,
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
		<View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={[styles.header, { backgroundColor: theme.backgroundColor}]}>
                {/* Back button */}
                <BackButton onPress={() => {navigation.goBack()}}/>
                <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => { 
                            navigation.goBack()
                        }}
                    >
                        <Text style={[styles.cancelButtonLabel, { color: theme.whiteColor}]}>Cancel</Text>
                </TouchableOpacity>
                {uploading ? (
                    <View style={styles.statusWrapper}>
                        <Text>{transferred} % Completed!</Text>
                        <ActivityIndicator size="large" color={colorApp} />
                    </View>
                    ) : (
                    <TouchableOpacity
                        style={styles.postButton}
                        onPress={submitPost}>
                        <Text style={styles.postButtonLabel}>Confirm edition</Text>
                    </TouchableOpacity>
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
                                        <Text style={{color: colorApp, marginRight: 10, fontSize: 16, fontWeight: 'bold'}}>Public</Text>
                                        <FontAwesome5 name="lock-open" color={colorApp} size={16} style={{paddingVertical: 2}}/>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleToggleIsPublic}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: 'red', marginRight: 10, fontSize: 16, fontWeight: 'bold'}}>Private</Text>
                                        <FontAwesome5 name="lock" color={'red'} size={16} style={{paddingVertical: 2}}/>
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
                            style={[styles.textInput, { color: theme.whiteColor}]}
                            placeholderTextColor={colorText}
                            autoFocus
                            textAlignVertical="top"
                            maxLength={300}
                        />
                        <Text style={{color: colorApp, alignSelf: 'flex-end', paddingHorizontal: 10}}>{text.length} / 300</Text>
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
                    <SimpleLineIcons name="paper-clip" size={28} color={colorWhite} />
                )}
            />
		</View>
	);
};

export default EditPost;
