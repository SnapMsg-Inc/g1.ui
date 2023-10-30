import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Octicons } from '@expo/vector-icons';
import { FlatList, ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { GetFeedPosts, GetPosts, GetUserData } from '../connectivity/servicesUser';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import PostButton from '../buttons/buttonPost';

export default function Feed({ navigation }) {
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState([])

    const fetchDataFromApi = async () => {
        try {
            // TODO: USAR GET_FEED (PREGUNTAR POR QUE NO ANDA BIEN)
            await GetPosts(setData, '', '', 100, 0)
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
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={({item}) => 
                                <SnapMsg
                                    key={item.pid}
                                    uid={item.uid}
                                    pid={item.pid}
                                    username={item.nick}
                                    content={item.text}
                                    date={item.timestamp}
                                    likes={item.likes}
                                    picUri={item.media_uri}
                                />
                }
            />
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
        </View>
    )
}

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 10,
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