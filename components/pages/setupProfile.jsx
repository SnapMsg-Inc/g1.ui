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
import LocationSetup from "./location";
import Preferences from "./preferences";

function SetupProfile({navigation}) {
    const [country, setCountry] = useState('')
    const [locality, setLocality] = useState('')
    const [step, setStep] = useState(1); 
    const [interestsList, setInterestsList] = useState([])
    let coordinates = null

    const handleAccept = () => {
        console.log(coordinates)
        console.log(interestsList)
    }

    const handleNext = () => {
        setStep(step + 1); 
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const getPermission = async () => {
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

    useEffect(() => {  
        setTimeout(()=> {getPermission()}, 1000)
    }, [])

    const geocode = async () => {
        if (locality !== '' ) {
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
        console.log(`adress ${JSON.stringify(adress, null, 2)}`)
        setLocality(adress[0].city)
        setCountry(adress[0].country)
    }
     
    return(
        <View style={stylesSetup.container}>
            <View style={stylesSetup.header}>
                <Logo/>
            </View>
            {step === 1 ? 
                (<LocationSetup country={country}
                                setCountry={setCountry}
                                locality={locality}
                                setLocality={setLocality}
                                getPermission={getPermission}
                />) :
                (<Preferences list={interestsList} setList={setInterestsList}/>) 
            }
            <View style={stylesSetup.footer}>
                <TouchableHighlight onPress={handleBack}>
                    <View style={stylesSetup.buttonBack}>
                        <Icon name="chevron-left" color={colorText} size={20}/>
                        <Text style={stylesSetup.text}>Back</Text>
                    </View>
                </TouchableHighlight>
                <AcceptButton   accept={step === 2 ? handleAccept : handleNext} 
                                text={step === 2 ? 'Accept' : 'Next'}/>
            </View>
        </View>
    )
}

export default SetupProfile
