import { Animated, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Input from "../forms/input";
import ProfileImage from '../profileComponents/profileImage';
import stylesEditProfile from "../../styles/profile/setupProfile";
import AcceptButton from "../buttons/buttonAcept";
import CancelButton from "../buttons/buttonCancel";
import { TouchableHighlight } from "react-native";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/forms/input";
import { PatchUser } from "../connectivity/servicesUser";

function EditProfile({navigation}) {
    const route = useRoute();
	const { data } = route.params;
    const [pic, setPic] = useState(data.pic)
    const [alias, setAlias] = useState(data.alias)
    const [nick, setNick] = useState(data.nick)
    const [locality, setLocality] = useState('')
    const [country, setCountry] = useState('')
    const [coordinates, setCoordinates] = useState(data.zone)
    const [interestsList, setInterestsList] = useState(data.interests.toString().replace(/,/g, ', '))

    const scrollY = useRef(new Animated.Value(0)).current;

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

    const geocode = async () => {
        if (Location.PermissionStatus === 'denied')
            return
        await Location.geocodeAsync(`${locality} ${country}`)
        .then((geocodeLocation)=> {
            console.log(`geoLocation ${JSON.stringify(geocodeLocation)}`)
            if (!geocodeLocation.length)
                setCoordinates({ 'latitude': 0, 'longitude': 0})
            else {
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
        try {
            geocode()
            const data ={
                "alias": alias,
                "nick": nick,
                "zone": coordinates,
                "interests": interestsList.split(','),
                "ocupation": "",
                "pic": pic
            }
            console.log(`data a enviar ${JSON.stringify(data, null, 2)}`)
            const success = await PatchUser(data)
            if (success) {
                setTimeout(() => navigation.goBack(), 1000)
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
        <View style={stylesEditProfile.container}>
            <View style={stylesEditProfile.header}>
                <ProfileImage scrollY={scrollY} uri={pic}/>
            </View>
            <View style={stylesEditProfile.body}>
                <Text style={stylesEditProfile.textTittle}>
                    Edit Your Profile
                </Text>
                <Input
                    label={'Foto'}
                    data={pic}
                    setData={setPic}
                    icon={
                        <Icon   
                            name={'image'} 
                            color={colorText} 
                            size={20} 
                            onPress={getPermission}
                        />
                    }
                />
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
                    label={'Interests'}
                    data={interestsList}
                    setData={setInterestsList}
                    icon={<Icon   
                        name={'map-marker'} 
                        color={colorText} 
                        size={20} 
                    />}
                />
            </View>
            <View style={stylesEditProfile.footer}>
                <CancelButton navigation={navigation}/>
                <AcceptButton accept={handleEdit} text={'Accept'}/>
            </View>
        </View>   
    );
}
export default EditProfile