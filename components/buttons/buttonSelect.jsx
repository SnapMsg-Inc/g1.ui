import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const InterestButton = ({ title }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(!isSelected);
    };

    return (
        <TouchableOpacity
        style={[styles.button, isSelected ? styles.selectedButton : null]}
        onPress={handlePress}
        >
            <Text style={isSelected ? styles.selectedText : styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    selectedButton: {
        backgroundColor: 'blue', // Cambia el color cuando está seleccionado
    },
    text: {
        color: 'black',
    },
    selectedText: {
        color: 'white', // Cambia el color del texto cuando está seleccionado
    },
});

export default InterestButton;
