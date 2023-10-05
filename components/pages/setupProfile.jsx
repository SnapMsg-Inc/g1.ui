import { Animated, View } from "react-native";
import React, { useRef, useState } from 'react';
import Input from "../forms/input";
import ProfileImage from '../profileComponents/profileImage';
import stylesEditProfile from "../../styles/profile/setupProfile";
import AcceptButton from "../buttons/buttonAcept";

function SetUpProfile() {
    const [pic, setPic] = useState('')
    const [nick, setNick] = useState('')
    const [locality, setLocality] = useState('')
    const [country, setCountry] = useState('')
    const [interestsList, setInterestsList] = useState([])

    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={stylesEditProfile.container}>
            <View>
                <ProfileImage scrollY={scrollY} uri={pic}/>
                <Input
                    label={'Foto'}
                />
                <Input
                    label={'Nick'}
                    data={nick}
                    setData={setNick}            
                />

                <Input
                    label={'Locality'}
                    data={locality}
                    setData={setLocality}                
                />

                <Input
                    label={'Country'}
                    data={country}
                    setData={setCountry}
                />
                <Input
                    label={'Interests'}
                />
            </View>
            <View>
                <AcceptButton text={'Accept'}/>
            </View>
        </View>   
    );
}
export default SetUpProfile