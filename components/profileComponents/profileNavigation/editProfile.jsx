import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
    Alert,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity
  } from "react-native";
import React, { useEffect, useState } from 'react';
import Input from "../../forms/input";
import stylesEditProfile from "../../../styles/profile/setupProfile";
import AcceptButton from "../../buttons/buttonAcept";
import CancelButton from "../../buttons/buttonCancel";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetToken, PatchUser } from "../../connectivity/servicesUser";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Octicons } from '@expo/vector-icons';
import { CurrentPosition, GeocodeWithLocalityAndCountry, GetPermission, ReverseGeocode } from "../../connectivity/location/permissionLocation";
import { ValidateEdit } from "../../forms/validations";
import { colorApp, colorBackground, colorText, colorWhite } from "../../../styles/appColors/appColors";
import { TouchableHighlight } from "react-native-gesture-handler";
import Preferences from "../../pages/preferences";
import { useTheme } from "../../color/themeContext";

function EditProfile({navigation}) {
    const route = useRoute();
	const { data } = route.params;
    const { theme } = useTheme()
    const [image, setImage] = useState(data.pic)
    const [alias, setAlias] = useState(data.alias)
    const [aliasError, setAliasError] = useState(null)
    const [nick, setNick] = useState(data.nick)
    const [nickError, setNickError] = useState(null)
    const [locality, setLocality] = useState('')
    const [countryLocate, setCountryLocate] = useState('')
    const [coordinates, setCoordinates] = useState(data.zone)
    const [interestsList, setInterestsList] = useState(data.interests.map(item => item.trim()))
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isEditInterests, setIsEditInterests] = useState(false)

    const handleInterests = () =>
        setIsEditInterests(!isEditInterests)

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

    const uploadImage = async () => {
        if( image == null || image === data.pic) {
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

            return url;
        } catch (e) {
            return null;
        }
    
    };

    const handleEdit = async() => {
        const imageUrl = await uploadImage();
        const uri = imageUrl ? imageUrl : data.pic;
        GetToken()
        .then((token) => {
            GeocodeWithLocalityAndCountry(locality, countryLocate)
            .then((geocodeLocation)=> {
                const data ={
                    "alias": alias,
                    "nick": nick,
                    "zone": geocodeLocation.length !== 0 ? 
                            { 'latitude':geocodeLocation[0].latitude,
                            'longitude':geocodeLocation[0].longitude} : coordinates,
                    "interests": interestsList,
                    "ocupation": "",
                    "pic": uri
                }
                if (ValidateEdit(alias, setAliasError, nick, setNickError)) {
                    PatchUser(data, token)
                    .then((response) => {
                        setTimeout(() => navigation.goBack(), 500)
                    })
                    .catch(() => {
                        Alert('Error in edit profile')
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    const setLocation = () => {
        CurrentPosition({
            accuracy: Location.Accuracy.High,
            distanceInterval: 2
        }).then((location) => {
            const { coords } = location
            const { latitude, longitude} = coords

            ReverseGeocode({'latitude': latitude, 'longitude': longitude})
            .then((address) => {
                const { city, country } = address[0]

                setLocality(city)
                setCountryLocate(country)
            }).catch((error) => {
                console.error(error)
            })
        })  
    }
    
    useEffect(()=>{
        const setData = () => {
            ReverseGeocode(coordinates)
            .then((address) => {
                const { city, country } = address[0]

                setLocality(city)
                setCountryLocate(country)
            }).catch((error) => {
                console.error(error)
            })
        }
        GetPermission()
        .then((location) => {
            if (location.status !== 'granted')
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            else
                setData()
        })
    }, [GetPermission])

    return (
        <ScrollView style={[stylesEditProfile.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={stylesEditProfile.header}>
                <Image source={{ uri: image }} style={stylesEditProfile.image}/>
                <Pressable
                    onPress={() => {
                        setIsMenuVisible(!isMenuVisible);
                    }}
                >
                    <View style={stylesEditProfile.imageButton}>
                        <Octicons name="plus" size={20} color={colorWhite} />
                    </View>
                </Pressable>
                {
                    isMenuVisible ? (
                        <View style={stylesEditProfile.optionButtonContainer}>
                            <Pressable
                                onPress={() => {
                                    takePhotoFromCamera();
                                }}
                            >
                                <View style={stylesEditProfile.optionButton}>
                                    <Icon name="camera" size={20} color={colorApp} />
                                    <Text style={stylesEditProfile.optionButtonText}>Take Photo</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    choosePhotoFromGalery()
                                }}
                            >
                                <View style={stylesEditProfile.optionButton}>
                                    <SimpleLineIcons name="picture" size={20} color={colorApp} />
                                    <Text style={stylesEditProfile.optionButtonText}>Choose Photo</Text>
                                </View>
                            </Pressable>
                        </View>
                    ) : <></>
                }
            </View>
            <View style={stylesEditProfile.body}>
                <Text style={stylesEditProfile.textTittle}>
                    Edit Your Profile
                </Text>
                <Text style={stylesEditProfile.fieldText}>
                    Alias
                </Text>
                <Input
                    label={'Alias'}
                    textColor={colorWhite}
                    data={alias}
                    setData={setAlias}
                    icon={
                        <Icon   
                            name={'id-card'} 
                            color={colorText} 
                            size={20} 
                        />
                    }
                    error={aliasError}
                />
                <Text style={stylesEditProfile.fieldText}>
                    Nick
                </Text>
                <Input
                    label={'Nick'}
                    data={nick}
                    setData={setNick}
                    icon={
                        <Icon   
                            name={'tag'} 
                            color={colorText} 
                            size={20} 
                        />
                    }
                    error={nickError}          
                />
                <Text style={stylesEditProfile.fieldText}>
                    Country
                </Text>
                <Input
                    label={'Country'}
                    data={countryLocate}
                    setData={setCountryLocate}
                    icon={
                        <Icon   
                        name={'flag'} 
                        color={colorText} 
                        size={20} 
                        onPress={() => setLocation()}
                        />
                    }
                />
                <Text style={stylesEditProfile.fieldText}>
                    Locality
                </Text>
                <Input
                    label={'Locality'}
                    data={locality}
                    setData={setLocality}
                    icon={<Icon   
                        name={'map-marker'} 
                        color={colorText} 
                        size={20} 
                        onPress={() => setLocation()}
                    />}             
                />
                <Text style={stylesEditProfile.fieldText}>
                    Interests
                </Text>
                <TouchableHighlight onPress={() => handleInterests()}>
                    <View style={stylesEditProfile.interestsButton}>
                        <Text style={stylesEditProfile.text}>
                            Edit interests
                        </Text>
                        <Icon
                            name={'eyedropper'} 
                            color={colorText} 
                            size={20} 
                        />
                    </View>
                </TouchableHighlight>
            </View>

            <View style={stylesEditProfile.footer}>
                <CancelButton navigation={navigation}/>
                <AcceptButton accept={handleEdit} text={'Accept'}/>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isEditInterests}
                onReqestClose={() => setIsEditInterests(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsEditInterests(false)}>
                    <View style={[stylesEditProfile.preferencesContainer, { backgroundColor: theme.backgroundColor }]}>
                        <Preferences list={interestsList} setList={setInterestsList}/>
                        <View style={stylesEditProfile.footer}>
                            <AcceptButton onPress={() => setIsEditInterests(false)} text={'Accept'}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>   
    );
}

export default EditProfile
