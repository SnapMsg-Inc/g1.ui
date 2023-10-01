import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from 'expo-location';
import { TouchableHighlight } from "react-native";
import Config from "react-native-config";
import axios from "axios";
import Input from "../forms/input";
import Logo from "../logo";

function LocationForm({navigation}) {
    const [text,setText] = useState('Waiting..')
    const [country, setCountry] = useState('')
    const [locality, setLocality] = useState('')
    let coordinates = null

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
        const geocodeLocation = await Location.geocodeAsync(locality)
        console.log(`geoLocation ${JSON.stringify(geocodeLocation)}`)
    }

    const reverseGeocode = async () => {
        const adress = await Location.reverseGeocodeAsync({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        })
        console.log(adress)
        console.log(`adress ${JSON.stringify(adress)}`)
        setLocality(adress[0].city)
    }
     
    return(
        <View style={{flex:1, backgroundColor: 'lightblue'}}>
            <View>
                <Logo/>
            </View>
            <Text>Este es el formulario de location {text}</Text>

            <Input
                label={'Locality'}
                data={locality}
                setData={setLocality}
            />
            <TouchableHighlight onPress={geocode}>
                <Text>Este el pais {country} y la ciudad {locality}</Text>
            </TouchableHighlight>

        </View>
    )
}

export default LocationForm
