import React, { useState } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import stylesCalendar, { colorText } from '../../styles/forms/calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Calendar({ data, setData, error, setError }) {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [hasSelectedDate, setHasSelectedDate] = useState(false);

    const isAgeValid = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 18;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || data;
        setShow(false);

        if (!isAgeValid(currentDate)) {
            setError('You must be 18 years or older.');
            return;
        }

        setData(currentDate);
        setHasSelectedDate(true);
        setError(null);  // Reset the error if the date is valid
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onPressTouchable = () => {
        setShow(true);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
  
    return (
        <View style={stylesCalendar.container}>
            <TouchableHighlight onPress={onPressTouchable}>
                <Text style={stylesCalendar.text}>
                    {hasSelectedDate ? formatDate(data) : 'Date of Birth'}
                </Text>
            </TouchableHighlight>
            {show && (
                <DateTimePicker
                    value={data}
                    mode={mode}
                    onChange={onChange}
                />
            )}
            <Icon
                name={'calendar'}
                color={colorText}
                size={20}
            />
            {error && <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>}
        </View>
    );
}

 