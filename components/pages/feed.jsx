import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Octicons } from '@expo/vector-icons';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { GetUserData } from '../connectivity/servicesUser';
import { DrawerActions, CommonActions } from '@react-navigation/native';

function generateSnaps(limit) {
    return new Array(limit).fill(0).map((_, index) => {
        const repetitions = Math.floor(Math.random() * 4) + 1;
    
        return {
            key: index.toString(),
            content: 'Lorem ipsum dolor ametLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus '.repeat(repetitions),
            nickname: 'Nickname',
            username: 'username',
            profilePictureUri: '',
            date: '18/06/2023',
            comments: 4,
            reposts: 18,
            likes: 12,
        };
    });
  }
  
const MOCKED_SNAPS = generateSnaps(30);

export default function Feed({ navigation }) {
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState({
        "uid": "",
        "alias": "",
        "fullname": "",
        "interests": [],
        "zone": {"latitude": 0,
                "longitude": 0},
        "is_admin": false,
        "ocupation": null,
        "pic": "",
        "email": "",
        "nick": "",
        "birthdate": "",
        "followers": 0,
        "follows": 0,
    })

    const fetchDataFromApi = async () => {
        try {
			await GetUserData(setData);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchDataFromApi()
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight
                    onPress={() => { 
                        navigation.dispatch(DrawerActions.openDrawer())
                    }}
                >
                    <View style={{flexDirection:'row', justifyContent: 'center'}}>
                        <Octicons name="home" size={22} 
                            color={colorApp} 
                        />
                        <Text style={styles.font}>Feed</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.containerLogo}>
                    <Icon name="snapchat-ghost" color={colorApp} size={30}/>
                    <Icon name="envelope" color={colorApp} size={10}/>
                    {/* <Text style={styles.fontLogo}>SnapMsg</Text> */}
                </View>
            </View>
            <View style={styles.tab}>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {loading ? <></> :
                        (MOCKED_SNAPS.map((item, index) => (
                            <SnapMsg
                            key={item.key}
                            nickname={data.alias}
                            username={data.nick}
                            content={item.content}
                            profilePictureUri={data.pic}
                            date={item.date}
                            comments={item.comments}
                            reposts={item.reposts}
                            likes={item.likes}
                            />
                        )))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorBackground,
    },
    header: {
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    containerLogo: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fontLogo: {
        color: colorApp,
        fontSize: 25,
        marginLeft: 20,
    },
    tab: {
        paddingBottom: 10,
        flexDirection:'row',
        paddingVertical:10,
        paddingBottom: 20,
        marginLeft: 10,
    },
    font: {
        color: colorApp,
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold'
    },
})