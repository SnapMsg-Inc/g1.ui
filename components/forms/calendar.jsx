import React, { useState } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import stylesCalendar, { colorText } from '../../styles/forms/calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Calendar() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [hasSelectedDate, setHasSelectedDate] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setHasSelectedDate(true);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onPressTouchable = () => {
        setShow(true)
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
            {hasSelectedDate ? formatDate(date) : 'Selecciona una fecha'}
          </Text>
        </TouchableHighlight>
        {show && (
            <RNDateTimePicker
                value={date}
                mode={mode}
                onChange={onChange}
            />
        )}
        <Icon
          name={'calendar'}
          color={colorText}
          size={20}
        />
      </View>
    );
  }
 