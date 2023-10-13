import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import stylesSelect from '../../styles/buttons/buttonSelect';

const InterestButton = ({ title, list, setList}) => {
    const [selected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(!selected);
        if (selected) {
            const updatedList = list.filter(item => item !== title.toLowerCase());
            setList(updatedList)
        } else {
            setList([...list, title.toLowerCase()])
        }
    };

    return (
        <TouchableOpacity
        style={[stylesSelect.button, 
                selected ? stylesSelect.selectedButton : null]}
        onPress={handlePress}
        >
            <Text style={selected ? stylesSelect.selectedText : stylesSelect.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default InterestButton;
