import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from 'expo-location';
import { TouchableHighlight } from "react-native";
import Input from "../forms/input";
import Logo from "../logo";
import stylesSetup from "../../styles/forms/setup";
import AcceptButton from "../buttons/buttonAcept";
import InterestButton from '../buttons/buttonSelect';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/forms/input";

function SetupProfile({navigation}) {
    const [text,setText] = useState('Waiting..')
    const [country, setCountry] = useState('')
    const [locality, setLocality] = useState('')
    const [next, setNext] = useState(false)
    let coordinates = null

    const onPressBack = () => {
        setNext(false)
    }

    useEffect(() => {
        const getPermission = async () => {
            console.log('Probando')
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted'){
                alert('Permision to access location was denied')
                return
            } 
            await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                distanceInterval: 2
            }).then((location) => {
                console.log(`location: ${location}`)
                const {coords} = location
                const {latitude, longitude} = coords
                coordinates = {'latitude': latitude, 'longitude': longitude}
                console.log(`longitude ${JSON.stringify(coordinates)} `)
                reverseGeocode()
            })
            
        }
        getPermission()
    }, [])

    const geocode = async () => {
        if (locality !== '') {
            const geocodeLocation = await Location.geocodeAsync(locality)
            console.log(`geoLocation ${JSON.stringify(geocodeLocation)}`)
            setNext(true)
        } else {
            alert('Complete los datos')
        }
    }

    const reverseGeocode = async () => {
        const adress = await Location.reverseGeocodeAsync({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        })
        console.log(adress)
        console.log(`adress ${JSON.stringify(adress, null, 2)}`)
        setLocality(adress[0].city)
        setCountry(adress[0].country)
    }
     
    return(
        <View style={stylesSetup.container}>
            <View style={stylesSetup.header}>
                <Logo/>
            </View>
                {next ? 
                (<View style={stylesSetup.bodyInterests}>
                    <Text style={stylesSetup.textTitle}>
                        {"What do you want to see?"}
                    </Text>
                    <View style={stylesSetup.buttonsContainer}>
                        <InterestButton title="Sports" />
                        <InterestButton title="Gaming" />
                        <InterestButton title="Travel" />
                        <InterestButton title="Technology" />
                        <InterestButton title="Entertainment" />
                        <InterestButton title="Music" />
                        <InterestButton title="Arts & culture" />
                        <InterestButton title="Fitness" />
                        <InterestButton title="Outdoors" />
                        <InterestButton title="Bussines & finance" />
                    </View>
                </View>) : 
                (<View style={stylesSetup.bodyLocation}>
                    <Input
                        label={'Country'}
                        data={country}
                        setData={setCountry}
                    />
                    <Input
                        label={'Locality'}
                        data={locality}
                        setData={setLocality}
                    />
                </View>)
                }
            <View style={stylesSetup.footer}>
                <TouchableHighlight onPress={onPressBack}>
                    <View style={stylesSetup.buttonBack}>
                        <Icon name="chevron-left" color={colorText} size={20}/>
                        <Text style={stylesSetup.text}>Back</Text>
                    </View>
                </TouchableHighlight>
                <AcceptButton accept={geocode} text="Next"/>
            </View>
        </View>
    )
}

export default SetupProfile
