import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput,
    TouchableHighlight, ScrollView, Alert, ActivityIndicator, Pressable, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { Octicons } from '@expo/vector-icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import BackButton from '../buttons/buttonBack';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import { GetTrendings, GetUserFollowersByUid, createPost } from '../connectivity/servicesUser';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/common/createPost';
import { colorApp, colorBackground, colorText, colorWhite } from '../../styles/appColors/appColors';
import {
    MentionInput,
    Suggestion,
    replaceMentionValues,
    parseValue,
} from 'react-native-controlled-mentions';
import { useTheme } from '../color/themeContext';
import { set } from 'lodash';

const CreatePostScreen = ({ navigation }) => {
    const { userData } = useContext(LoggedUserContext)
    const { theme } = useTheme()
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [hashtags, setHashtags] = useState([]);
    const [mentions, setMentions] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [fullTrendings, setFullTrendings] = useState([]);
    const [followers, setFollowers] = useState([])

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
    
    const extractMentionsAndHashtags = (inputText) => {
        const hashtagRegex = /#[^\s#]+/g;
        const mentionRegex = /@[^\s@]+/g;
    
        let extractedHashtags = inputText.match(hashtagRegex) || [];
        extractedHashtags.map((item, index) => {
            extractedHashtags[index] = replaceMentionValues(item, ({name}) => `#${name}`);
        })

        let extractedMentions = inputText.match(mentionRegex) || [];
        extractedMentions.map((item, index) => {
            extractedMentions[index] = replaceMentionValues(item, ({id}) => `${id}`);
        })

        console.log("HASHTAGS: ", extractedHashtags, "MENTIONS UID: ", extractedMentions)
        setHashtags(extractedHashtags);
        setMentions(extractedMentions);
    };
    
    const handleTextChange = (content) => {
        extractMentionsAndHashtags(content);
        setText(content);
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        const uri = imageUrl ? [imageUrl] : [];
        console.log("CONTENT: ", text)
        let value = replaceMentionValues(text, ({name, trigger}) => `${trigger}${name}`);
        console.log("VALUE: ", value)
        console.log("MENTIONS: ", mentions);
        console.log("MENTIONS filter: ", mentions?.filter(item => !item.startsWith('@')));

        createPost(value, uri, !isPublic, hashtags)
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
            setText('');
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
    
    const renderSuggestions = (suggestions, trigger) => ({ keyword, onSuggestionPress }) => {
        if (keyword == null) {
        return null;
        }
    
        return (
            <View>
                {suggestions
                .filter((one) =>
                    one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
                )
                .map((one) => (
                    <Pressable
                        key={one.id}
                        onPress={() => onSuggestionPress(one)}
                        style={{ padding: 5 }}>
                        <Text style={{color: colorText}}>{trigger}{one.name}</Text>
                    </Pressable>
                ))}
            </View>
        );
    };
    
    const renderMentionSuggestions = renderSuggestions(followers, '@');
    const renderHashtagSuggestions = renderSuggestions(fullTrendings, '#');
    
    const fetchInitialTrendingsFromApi = async () => {
        setFullTrendings([]);
        try {
            const newTrendings = await GetTrendings(100, 0)

            if (newTrendings && newTrendings.length > 0) {
                setFullTrendings(newTrendings.map((item) => ({id: item.topic.slice(1), name: item.topic.slice(1)})));
            }
        } catch (error) {
            setFullTrendings([]);
            console.error('Error fetching initial posts:', error);
        }
    }

    const fetchInitialFollowersFromApi = async () => {
        setFollowers([]);
        try {
            const newFollowers = await GetUserFollowersByUid(userData.uid, 100, 0)
            if (newFollowers && newFollowers.length > 0) {
                setFollowers(newFollowers.map((item) => ({id: item.uid, name: item.nick})));
            }
        } catch (error) {
            setFollowers([]);
            console.error('Error fetching initial posts:', error.response.status);
            if (error.response.status === 502)
                alert('Services not available.\nPlease retry again later')
        }
    }



    useFocusEffect(
        React.useCallback(() => {
            fetchInitialTrendingsFromApi();
            if (followers.length) {
				setFollowers([])
		 	}
          	fetchInitialFollowersFromApi()
        }, [])
    );

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
                        <MentionInput
                            autoFocus
                            value={text}
                            onChange={handleTextChange}
                            
                            partTypes={[
                                {
                                trigger: '@',
                                renderSuggestions: renderMentionSuggestions,
                                textStyle: {color: colorApp},
                                },
                                {
                                trigger: '#',
                                allowedSpacesCount: 0,
                                renderSuggestions: renderHashtagSuggestions,
                                textStyle: {color: colorApp},
                                },
                                {
                                pattern: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
                                textStyle: {color: colorApp},
                                },
                            ]}
                            
                            placeholder="What's happening?"
                            isInsertSpaceAfterMention={false}
                            isBottomMentionSuggestionsRender={false}
                            multiline
                            numberOfLines={10}
                            style={styles.textInput}
                            placeholderTextColor={colorText}
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

export default CreatePostScreen;
