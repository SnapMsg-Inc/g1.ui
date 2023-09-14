import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AcceptButton from '../buttons/buttonAcept';
import InterestButton from '../buttons/buttonSelect';
import Logo from '../logo';
import stylesPreferences from '../../styles/forms/preferences';

function Preferences({navigation}) {
    const [accept, setAccept] = useState(false)

    const handlePreferences = (isAccepted) => {
        setAccept(isAccepted)
    };  

return (
    <View style={stylesPreferences.container}>
        <View style={stylesPreferences.header}>
            <Logo/>
        </View>
        <View style={stylesPreferences.body}>
            <Text style={stylesPreferences.textTitle}>
                {"What do yo want to see?"}
            </Text>
            <Text style={stylesPreferences.text}>
                {"Select at least 3 interests to personalize your "}
                {"SnapMsg experience. They will be visible on your profile."}
            </Text>
            <View style={stylesPreferences.buttonsContainer}>
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
        </View>
        <View style={stylesPreferences.footer}>
            <AcceptButton accept={handlePreferences}/>
        </View>
    </View>
);
};

export default Preferences;
