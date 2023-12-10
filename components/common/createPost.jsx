import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput,
    TouchableHighlight, ScrollView, Alert, ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { Octicons } from '@expo/vector-icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import BackButton from '../buttons/buttonBack';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { createPost } from '../connectivity/servicesUser';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/common/createPost';
import { colorApp, colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';

const CreatePostScreen = ({ navigation }) => {
    const { userData } = useContext(LoggedUserContext)
    const { theme } = useTheme()
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
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
        const imageUrl = await uploadImage();
        const uri = imageUrl ? [imageUrl] : [];
        createPost(text, uri, !isPublic, hashtags)
        .then(() => {
            Alert.alert(
                'Post published!',
                'Your post has been published Successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            
                            navigation.navigate('FeedScreen');
                        },
                    },
                ]
            );
            setText(null);
        })
        .catch((error) => {
            console.error(error)
        })
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

    const defaultImage = require('../../assets/default_user_pic.png')
    
    const handleToggleIsPublic = () => {
        isPublic ? setIsPublic(false) : setIsPublic(true);
    }

	return (
		<View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <View style={[styles.header, {backgroundColor: theme.backgroundColor}]}>
                {/* Back button */}
                <BackButton onPress={() => {navigation.goBack()}}/>
                <TouchableHighlight
                        style={styles.cancelButton}
                        onPress={() => { 
                            navigation.goBack()
                        }}
                    >
                        <Text style={[styles.cancelButtonLabel, {color: theme.whiteColor}]}>Cancel</Text>
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
                        <Text style={styles.postButtonLabel}>Post</Text>
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
                                        <Text style={{color: colorApp, marginRight: 10, fontSize: 16, fontWeight: 'bold'}}>Public</Text>
                                        <FontAwesome5 name="lock-open" color={colorApp} size={16} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleToggleIsPublic}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: 'red', marginRight: 10, fontSize: 16, fontWeight: 'bold'}}>Private</Text>
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
                            maxLength={300}
                        />
                        <Text style={{color: colorApp, alignSelf: 'flex-end', paddingHorizontal: 10, fontSize: 18}}>{text.length} / 300</Text>
                    </View>
                </View>
                <View style={styles.hashtagsContainer}>
                    {hashtags.map((hashtag, index) => (
                        <Text key={index} style={styles.hashtagText}>{hashtag}</Text>
                    ))}
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

export default CreatePostScreen;
