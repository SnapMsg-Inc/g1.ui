import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight, TouchableWithoutFeedback, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import styles from '../../styles/insights/insights';
import { colorApp, colorText, colorBackground, colorWhite } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-neat-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { GetUserMePostsStats } from '../connectivity/servicesUser';

export default function Insights({ navigation }) {
    const { theme } = useTheme()
    const [showDatePickerRange, setShowDatePickerRange] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [presets, setPresets] = useState([])
    const [selectedRange, setSelectedRange] = useState({});
    const [showMenu, setShowMenu] = useState(false);

    const [rangePublications, setRangePublications] = useState(0);
    const [rangeLikes, setRangeLikes] = useState(0);
    const [rangeShares, setRangeShares] = useState(0);
    const [rangeInteractions, setRangeInteractions] = useState(0);

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const menuOptions = [
        { label: 'Last 7 Days', onPress: () => {
                setSelectedRange(presets[0]) 
                toggleMenu()   
            }
        },
        { label: 'Last 30 Days', onPress: () => {
                setSelectedRange(presets[1])
                toggleMenu()   
            }
        },
        { label: 'Last Year', onPress: () => {
                setSelectedRange(presets[2])
                toggleMenu()   
            }
        },
        { label: 'Custom', onPress: () => {
            openDatePickerRange()
            toggleMenu()   
            }
        },
    ];

    const openDatePickerRange = () => setShowDatePickerRange(true)

    const onCancelRange = () => {
        setShowDatePickerRange(false)
    }
    
    const onConfirmRange = (output) => {
        setShowDatePickerRange(false)
        setStartDate(output.startDateString)
        setEndDate(output.endDateString)
        setSelectedRange({ label: 'Custom', start: output.startDateString, end: output.endDateString })
    }

    const onSelectPresetRange = (presetRange) => {
        setStartDate(presetRange.start);
        setEndDate(presetRange.end);
        setShowDatePickerRange(false);
    };
     
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

    const formatRangeText = (start, end) => {
        const startMonth = new Date(start).toLocaleString('default', { month: 'short' });
        const endMonth = new Date(end).toLocaleString('default', { month: 'short' });
    
        const startDay = new Date(start).getDate();
        const endDay = new Date(end).getDate();
    
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    };
      
    useEffect(() => {
        const today = new Date();
        const last7DaysStart = new Date(today);
        last7DaysStart.setDate(today.getDate() - 6);

        const last30DaysStart = new Date(today);
        last30DaysStart.setDate(today.getDate() - 29);
    
        const lastYearStart = new Date(today);
        lastYearStart.setFullYear(today.getFullYear() - 1);
    
        const calculatedPresets = [
        { label: 'Last 7 Days', start: last7DaysStart.toISOString().split('T')[0], end: today.toISOString().split('T')[0] },
        { label: 'Last 30 Days', start: last30DaysStart.toISOString().split('T')[0], end: today.toISOString().split('T')[0] },
        { label: 'Last Year', start: lastYearStart.toISOString().split('T')[0], end: today.toISOString().split('T')[0] },
        ];
        setPresets(calculatedPresets);
        setSelectedRange(calculatedPresets[0]);
    }, []);

    useEffect(() => {
        if (selectedRange) {
            GetUserMePostsStats(selectedRange.start, selectedRange.end)
                .then((response) => {
                    setRangePublications(response.total_posts);
                    setRangeLikes(response.total_likes);
                    setRangeShares(response.total_snapshares);
                    setRangeInteractions(response.total_snapshares + response.total_likes);
                })
                .catch((error) => {
                    console.error(error.response.data);
                });
        }
    }, [selectedRange]);
      
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 10 }}>    
                <View>
                <TouchableOpacity key={selectedRange.label} onPress={toggleMenu}>
                        <View style={{width: 150, backgroundColor: colorApp, borderRadius: 8, marginVertical: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: colorWhite, paddingHorizontal: 10, paddingVertical: 3, fontSize: 16}}>{selectedRange.label}</Text>
                            <Ionicons name="chevron-down" color={colorWhite} size={22} style={{paddingRight: 8, paddingVertical: 3}} />
                        </View>
                    </TouchableOpacity>
                    {showMenu && (
                            <View style={{marginTop: 5 , backgroundColor: theme.colorBackground, width: 150, borderWidth: 1, borderRadius: 8, borderColor: colorApp }}>
                                {menuOptions.map((option, index) => (
                                    <TouchableOpacity key={index} onPress={option.onPress}>
                                        <View style={{ padding: 10 }}>
                                            <Text style={{color: theme.whiteColor}}>{option.label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                    )}
                </View>
                <Text style={{color: theme.whiteColor, paddingHorizontal: 10, paddingVertical: 5, fontSize: 16, fontWeight: 'bold'}}>{formatRangeText(selectedRange.start, selectedRange.end)}</Text>
            </View>
            
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
                <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>Account insights</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                        <MaterialCommunityIcon name="publish" size={27} color={colorApp} />
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>{rangePublications}</Text>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>Posts</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                        <MaterialCommunityIcon name="heart" size={27} color={colorApp} />
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>{rangeLikes}</Text>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>Likes</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                        <FontAwesome5 name="retweet" size={24} color={colorApp} />
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>{rangeShares}</Text>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>SnapShares</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                        <MaterialCommunityIcon name="transit-detour" size={27} color={colorApp} />
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>{rangeInteractions}</Text>
                            <Text style={{color: theme.whiteColor, fontWeight: 'bold', fontSize: 18}}>Interactions</Text>
                        </View>
                    </View>
                </View>
            </View>
            
                
            <DatePicker
                isVisible={showDatePickerRange}
                mode={'range'}
                onCancel={onCancelRange}
                onConfirm={onConfirmRange}
                presetButtons
                colorOptions={datePickerOptions}
            />
            
            

        </View>
    )
}