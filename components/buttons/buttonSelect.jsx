import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import stylesSelect from '../../styles/buttons/buttonSelect';

const InterestButton = ({ title, list, setList}) => {
    const [isSelected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(!isSelected);
        setList([...list, title.toLowerCase()])
    };

    return (
        <TouchableOpacity
        style={[stylesSelect.button, 
                isSelected ? stylesSelect.selectedButton : null]}
        onPress={handlePress}
        >
            <Text style={isSelected ? stylesSelect.selectedText : stylesSelect.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default InterestButton;
