import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
  } from "react-native";
import React, { useEffect, useState } from 'react';
import Input from "../../forms/input";
import stylesEditProfile from "../../../styles/profile/setupProfile";
import AcceptButton from "../../buttons/buttonAcept";
import CancelButton from "../../buttons/buttonCancel";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../../styles/forms/input";
import { PatchUser } from "../../connectivity/servicesUser";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Octicons } from '@expo/vector-icons';

function EditProfile({navigation}) {
    const route = useRoute();
	const { data } = route.params;

    const [image, setImage] = useState(data.pic)
    const [alias, setAlias] = useState(data.alias)
    const [nick, setNick] = useState(data.nick)
    const [locality, setLocality] = useState('')
    const [country, setCountry] = useState('')
    const [coordinates, setCoordinates] = useState(data.zone)
    const [interestsList, setInterestsList] = useState(data.interests.toString().replace(/,/g, ', '))
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const [isMenuVisible, setIsMenuVisible] = useState(false);

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

            return url;
        } catch (e) {
            console.log(e);
            return null;
        }
    
    };

    const getPermission = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted'){
            return
        }
    }

    const setLocation = async () => {
        try {
            getPermission()
            await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                distanceInterval: 2
            }).then((location) => {
                const {coords} = location
                const {latitude, longitude} = coords
                setCoordinates({'latitude': latitude, 'longitude': longitude})
                console.log(`longitude ${JSON.stringify(coordinates)} `)
                reverseGeocode() 
            })  
        } catch (error) {
            console.log(error)
        }
    }

    const geocode = () => {
        Location.geocodeAsync(`${locality} ${country}`)
        .then((geocodeLocation)=> {
            console.log(`geoLocation ${JSON.stringify(geocodeLocation)}`)
            if (geocodeLocation.length) {
                setCoordinates({'latitude': geocodeLocation[0].latitude,
                                'longitude': geocodeLocation[0].longitude})
                console.log(coordinates)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const reverseGeocode = async () => {
        await Location.reverseGeocodeAsync({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        }).then((address)=> {
            const {city, country} = address[0]
            setLocality(city)
            setCountry(country)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleEdit = async() => {
        const imageUrl = await uploadImage();
        const uri = imageUrl ? imageUrl : data.pic;

        try {
            geocode()
            const data ={
                "alias": alias,
                "nick": nick,
                "zone": coordinates,
                "interests": interestsList.split(','),
                "ocupation": "",
                "pic": uri
            }
            console.log(`data a enviar ${JSON.stringify(data, null, 2)}`)
            const success = await PatchUser(data)
            if (success) {
                setTimeout(() => navigation.goBack(), 500)
            } else {
                alert('error')
            }  
        } catch(error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        setTimeout(()=> {getPermission()}, 1000)
        reverseGeocode()
    },[])

    return (
        <ScrollView style={stylesEditProfile.container}>
            <View style={stylesEditProfile.header}>
                <Image source={{ uri: data.pic}} style={stylesEditProfile.image}/>
                <Pressable
                    onPress={() => {
                        setIsMenuVisible(!isMenuVisible);
                    }}
                >
                    <View style={stylesEditProfile.imageButton}>
                        <Octicons name="plus" size={20} color={"white"} />
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
                <Input
                    label={'Alias'}
                    data={alias}
                    setData={setAlias}
                    icon={
                        <Icon   
                            name={'id-card'} 
                            color={colorText} 
                            size={20} 
                            onPress={getPermission}
                        />
                    }          
                />
                <Input
                    label={'Nick'}
                    data={nick}
                    setData={setNick}
                    icon={
                        <Icon   
                            name={'tag'} 
                            color={colorText} 
                            size={20} 
                            onPress={getPermission}
                        />
                    }          
                />
                <Input
                    label={'Country'}
                    data={country}
                    setData={setCountry}
                    icon={
                        <Icon   
                        name={'flag'} 
                        color={colorText} 
                        size={20} 
                        onPress={getPermission}
                        />
                    }
                />
                <Input
                    label={'Locality'}
                    data={locality}
                    setData={setLocality}
                    icon={<Icon   
                        name={'map-marker'} 
                        color={colorText} 
                        size={20} 
                        onPress={setLocation}
                    />}             
                />
                <Input
                    label={'Interests'}
                    data={interestsList}
                    setData={setInterestsList}
                    style={stylesEditProfile.textInput}
                    icon={<Icon
                        name={'eyedropper'} 
                        color={colorText} 
                        size={20} 
                    />}
                    textAlignVertical="top"
                    multiline={true}
                />
            </View>
            <View style={stylesEditProfile.footer}>
                <CancelButton navigation={navigation}/>
                <AcceptButton accept={handleEdit} text={'Accept'}/>
            </View>
        </ScrollView>   
    );
}

const colorBackground = '#000'
const colorApp = '#1ed760'

export default EditProfile