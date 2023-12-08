import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Octicons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { GetFeedPosts, GetPosts, GetUserData } from '../connectivity/servicesUser';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import PostButton from '../buttons/buttonPost';
import styles from '../../styles/feed/feed';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import SnapMsg from '../common/SnapMsg';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import { useTheme } from '../color/themeContext';

export default function Feed({ navigation }) {
    const { userData, isLoadingUserData, fetchUserDataFromApi } = useContext(LoggedUserContext)
    const [fullPosts, setFullPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false)
    const [messageError, setMessageError] = useState([{message: ''}])
    const { theme } = useTheme()

    const fetchInitialPostsFromApi = async () => {
        setIsLoading(true);
		setCurrentPage(0);
        // setAllDataLoaded(false)
        setIsLoadingError(false)
        setFullPosts([]);
        setMessageError([])
        try {
            const newPosts = await GetFeedPosts(10, 0);
            if (newPosts && newPosts.length > 0) {
                setFullPosts(newPosts);
                setCurrentPage(1);
                console.log('feed')
            } 
            // else {
            //     setAllDataLoaded(true);
            // }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setIsLoadingError(true)
            console.error('Error fetching initial posts:', error.response.status);
            if (error.response.status >= 500)
                setMessageError([...messageError, {'message': 'Services not available.\nPlease retry again later'}])
        }
    }

    const fetchDataFromApi = async () => {
        if (!isLoading) {
            return;
        }
        setIsLoading(true);
        try {
            const newPosts = await GetFeedPosts(10, currentPage);
            if (newPosts && newPosts.length > 0) {
                setFullPosts([...fullPosts, ...newPosts]);
                setCurrentPage(currentPage + 1);
            } 
            // else {
            //     setAllDataLoaded(true);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleRefresh = async () => {
        if (isRefreshing) {
            return;
        }
        setIsRefreshing(true);
        await fetchInitialPostsFromApi(null);
        setIsRefreshing(false);
    }

    useEffect(() => {
        fetchInitialPostsFromApi();
        // fetchUserDataFromApi();
    }, [])

    const renderLoader = () => {
        return (
            isLoading && !isRefreshing ? <ActivityIndicator size={'large'} color={colorApp} /> : <></>
        );
    }

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <View style={styles.header}>
                <TouchableHighlight
                    onPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}
                >
                    <View style={{ backgroundColor: theme.backgroundColor, flexDirection: 'row', justifyContent: 'center' }}>
                        <Octicons name="home" size={22}
                            color={colorApp}
                        />
                        <Text style={styles.font}>Feed</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.containerLogo}>
                    <Icon name="snapchat-ghost" color={colorApp} size={30} />
                    <Icon name="envelope" color={colorApp} size={10} />
                </View>
            </View>
            { isLoading ? 
                <ActivityIndicator size={'large'} color={colorApp} style={{alignSelf: 'center', flex: 1}}/>
                :
                isLoadingError ? 
                    <FlatList
                        data={messageError}
                        renderItem={({item}) => 
                            <View style={{ alignItems: 'center', paddingTop: 100}}>
                                <Octicons name="alert" color={colorApp} size={30}/>
                                <Text style={{color: theme.whiteColor }}>{item.message}</Text>
                            </View>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={handleRefresh}
                                progressBackgroundColor={theme.progressColor}
                                colors={[colorApp]}
                                tintColor={colorApp}
                                size={"large"}
                            />
                        }
                    /> 
                    : 
                    <FlatList
                        data={fullPosts}
                        renderItem={({ item }) =>
                            "post" in item ? (
                                <SnapShare 
                                    key={item.pid}
                                    uid={item.uid}
                                    pid={item.pid}
                                    post={item.post}
                                    date={item.timestamp}
                                />
                            ) : (
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
                            )
                        }
                        onEndReached={fetchDataFromApi}
                        onEndReachedThreshold={0.10}
                        ListFooterComponent={renderLoader}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={handleRefresh}
                                progressBackgroundColor={theme.progressColor}
                                colors={[colorApp]}
                                tintColor={colorApp}
                                size={"large"}
                            />
                        }
                    />
            }
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
        </View>
    )
}
