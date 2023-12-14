import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import styles from '../../styles/insights/insights';
import { colorApp, colorText, colorBackground, colorWhite } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-neat-date-picker'

export default function Insights({ navigation }) {
    const { theme } = useTheme()
    const [showDatePickerRange, setShowDatePickerRange] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const openDatePickerRange = () => setShowDatePickerRange(true)

    const onCancelRange = () => {
        setShowDatePickerRange(false)
    }
    
    const onConfirmRange = (output) => {
        console.log(output)
        setShowDatePickerRange(false)
        setStartDate(output.startDateString)
        setEndDate(output.endDateString)
    }

    const onSelectPresetRange = (presetRange) => {
        setStartDate(presetRange.start);
        setEndDate(presetRange.end);
        setShowDatePickerRange(false);
    };

    const presets = [
        { label: 'Last 7 Days', start: '2023-11-01', end: '2023-11-07' },
        { label: 'Last 30 Days', start: '2023-10-01', end: '2023-10-31' },
        { label: 'Last Year', start: '2022-11-01', end: '2023-11-01'}
    ];
     
    const datePickerOptions = {
        backgroundColor: '#ffffff',
        headerColor: colorApp,
        headerTextColor: '#ffffff',
        changeYearModalColor: colorApp,
        weekDaysColor: colorApp,
        dateTextColor: '#000000',
        selectedDateTextColor: '#ffffff',
        selectedDateBackgroundColor: colorApp,
        confirmButtonColor: colorApp
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <View style={styles.header}>
                <TouchableHighlight
                    onPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}
                    underlayColor={'transparent'}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Ionicons name="stats-chart" color={colorApp} size={22} />
                        <Text style={styles.font}>Insights</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.containerLogo}>
                    <Icon name="snapchat-ghost" color={colorApp} size={30} />
                    <Icon name="envelope" color={colorApp} size={10} />
                </View>
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                <TouchableHighlight onPress={openDatePickerRange}>
                    <View style={{backgroundColor: colorApp, borderRadius: 8}}>
                        <Text style={{color: theme.whiteColor, paddingHorizontal: 10, paddingVertical: 3, fontSize: 16}}>Select Range</Text>
                    </View>
                </TouchableHighlight>
                {/* <Button title={'Select Range'} onPress={openDatePickerRange} /> */}
                <DatePicker
                    isVisible={showDatePickerRange}
                    mode={'range'}
                    onCancel={onCancelRange}
                    onConfirm={onConfirmRange}
                    presetButtons
                    colorOptions={datePickerOptions}
                />
                <Text style={{color: theme.whiteColor}}>{startDate && `${startDate} ~ ${endDate}`}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                {presets.map((preset) => (
                    <TouchableHighlight key={preset.label} onPress={() => onSelectPresetRange(preset)}>
                        <Text style={{ color: theme.whiteColor }}>{preset.label}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        </View>
    )
}