import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from 'expo-location';
import { TouchableHighlight } from "react-native";
import Logo from "../common/logo";
import stylesSetup from "../../styles/forms/setup";
import AcceptButton from "../buttons/buttonAcept";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/appColors/appColors";
import LocationSetup from "./location";
import Preferences from "./preferences";
import { GetToken, PatchUser } from "../connectivity/servicesUser";
import { CurrentPosition, GeocodeWithLocalityAndCountry, GetPermission, ReverseGeocode } from "../connectivity/location/permissionLocation";
import { useTheme } from "../color/themeContext";
import { sendMetricsDD } from "../connectivity/ddMetrics";

function FinishSignUp({ navigation }) {
    const [countryLocate, setCountryLocate] = useState('')
    const [locality, setLocality] = useState('')
    const [step, setStep] = useState(1); 
    const [interestsList, setInterestsList] = useState([])
    const [coordinates, setCoordinates] = useState({ 'latitude': 0, 'longitude': 0})
    const { theme } = useTheme()

    const handleAccept = async() => {
        GetToken()
        .then((token) => {
            PatchUser({"zone": coordinates,
                        "interests": interestsList}, token)
            .then((response) => {
                sendMetricsDD('users.zone', 'incr', '1', [`location:${locality}`])
                navigation.navigate('Register')
            })
            .catch((error) => {
                console.error(error)
            }) 
        })
    }

    const handleNext = () => {
        if (step === 1)
            GeocodeWithLocalityAndCountry(locality, countryLocate, setCoordinates)
            .then((geocodeLocation)=> {
                if (geocodeLocation.length === 0)
                    setCoordinates({ 'latitude': 0, 'longitude': 0})
                else {
                    setCoordinates({'latitude': geocodeLocation[0].latitude,
                                    'longitude': geocodeLocation[0].longitude})
                }
            })
            .catch((error) => {
                console.error(error)
            })
        setStep(step + 1)
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    
    const setData = () => {
        ReverseGeocode(coordinates)
        .then((address)=> {
            const { city, country } = address[0]
            setLocality(city)
            setCountryLocate(country)
        }).catch((error) => {
            console.error(error)
        })
    }
    
    useEffect(() => {
        const setLocation = () => {
            CurrentPosition({
                accuracy: Location.Accuracy.High,
                distanceInterval: 2
            }).then((location) => {
                const { coords } = location
                const { latitude, longitude} = coords
                setCoordinates({'latitude': latitude, 'longitude': longitude})
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
                setLocation()
        })
    },[GetPermission])

    return(
        <View style={[stylesSetup.container, {backgroundColor: theme.backgroundColor}]}>
            <View style={stylesSetup.header}>
                <Logo/>
            </View>
            {step === 1 ? 
                (<LocationSetup country={countryLocate}
                                setCountry={setCountryLocate}
                                locality={locality}
                                setLocality={setLocality}
                                getPermission={() => setData()}
                />) :
                (<Preferences list={interestsList} setList={setInterestsList}/>) 
            }
            <View style={[stylesSetup.footer, step === 1 ? stylesSetup.footerFirst : null]}>
                {step === 2 ? <TouchableHighlight onPress={handleBack} underlayColor={'transparent'}>
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
