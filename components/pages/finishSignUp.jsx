import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import * as Location from 'expo-location';
import { TouchableHighlight } from "react-native";
import Logo from "../logo";
import stylesSetup from "../../styles/forms/setup";
import AcceptButton from "../buttons/buttonAcept";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/forms/input";
import LocationSetup from "./location";
import Preferences from "./preferences";
import { PatchUser } from "../connectivity/servicesUser";
import { CurrentPosition, GeocodeWithLocalityAndCountry, GetPermission, ReverseGeocode } from "../connectivity/location/permissionLocation";
import { AuthenticationContext } from "../connectivity/auth/authenticationContext";

function FinishSignUp({ navigation }) {
    const [country, setCountry] = useState('')
    const [locality, setLocality] = useState('')
    const [step, setStep] = useState(1); 
    const [interestsList, setInterestsList] = useState([])
    const [coordinates, setCoordinates] = useState({ 'latitude': 0, 'longitude': 0})
    const { markRegisterComplete } = useContext(AuthenticationContext)

    const handleAccept = async() => {
        try {
            const success = PatchUser({
                                "zone": coordinates,
                                "interests": interestsList,
                                "pic": '',
                            })
            if (success)
                markRegisterComplete()
        } catch(error) {
            console.log(error)
        }
    }

    const handleNext = () => {
        if (step === 1)
            GeocodeWithLocalityAndCountry(locality, country, setCoordinates)
        setStep(step + 1)
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const setLocation = () => {
        CurrentPosition({
            accuracy: Location.Accuracy.High,
            distanceInterval: 2
        }).then((location) => {
            const { coords } = location
            const { latitude, longitude} = coords
            setCoordinates({'latitude': latitude, 'longitude': longitude})
            console.log(`longitude ${JSON.stringify(coordinates)} `)
            ReverseGeocode(coordinates, setLocality, setCountry)
        })  
    }

    useEffect(() => {
        GetPermission()
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
