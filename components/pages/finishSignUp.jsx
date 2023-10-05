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
import { PatchUser } from "../connectivity/servicesUser";

function FinishSignUp({navigation}) {
    const [country, setCountry] = useState('')
    const [locality, setLocality] = useState('')
    const [step, setStep] = useState(1); 
    const [interestsList, setInterestsList] = useState([])
    const [coordinates, setCoordinates] = useState({ 'latitude': 0, 'longitude': 0})

    const handleAccept = async() => {
        console.log(coordinates)
        console.log(interestsList)
        try {
            const success = PatchUser({
                                "zone": coordinates,
                                "interests": interestsList,
                            })
            if (success) {
                setTimeout(() => navigation.navigate('Home'), 1000)
            } else {
                alert('error')
            }  
        } catch(error) {
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

    const handleNext = () => {
        if (step === 1)
            geocode()
        setStep(step + 1)
    };

    const handleBack = () => {
        setStep(step - 1);
    };

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
    
    const getPermission = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted'){
            return
        }
    }

    useEffect(() => {
        setTimeout(()=>{getPermission()}, 1000)
    },[])

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
                                getPermission={setLocation}
                />) :
                (<Preferences list={interestsList} setList={setInterestsList}/>) 
            }
            <View style={[stylesSetup.footer, step === 1 ? stylesSetup.footerFirst : null]}>
                {step === 2 ? <TouchableHighlight onPress={handleBack}>
                    <View style={stylesSetup.buttonBack}>
                        <Icon name="chevron-left" color={colorText} size={20}/>
                        <Text style={stylesSetup.text}>Back</Text>
                    </View>
                </TouchableHighlight> : <></>}
                <AcceptButton   accept={step === 2 ? handleAccept : handleNext} 
                                text={step === 2 ? 'Accept' : 'Next'}/>
            </View>
        </View>
    )
}

export default FinishSignUp
