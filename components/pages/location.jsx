import stylesSetup from "../../styles/forms/setup"
import { Text, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorText } from "../../styles/forms/input";
import Input from "../forms/input";
import { useState, useEffect } from "react";

function LocationSetup({country, setCountry, locality, setLocality, getPermission}) {
    return (
        <View style={stylesSetup.bodyLocation}>
            <Text style={stylesSetup.textTitle}> Share Your Location </Text>
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
                icon={
                    <Icon   
                        name={'map-marker'} 
                        color={colorText} 
                        size={20} 
                        onPress={getPermission}
                    />
                }
            />
            <Text style={stylesSetup.textSuggestion}>Press icons for autocomplete</Text>
        </View>
    )
}

export default LocationSetup
