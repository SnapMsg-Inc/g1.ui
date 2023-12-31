import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { GetSnapSharedPosts } from '../../connectivity/servicesUser';
import { colorApp, colorText, colorBackground } from '../../../styles/appColors/appColors';
import { useFocusEffect } from '@react-navigation/native';
import SnapShare from '../../common/snapShare';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from '../../color/themeContext';

const SnapShareScreen = () => {
    const { theme } = useTheme()
	const [fullPosts, setFullPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false)
    const [messageError, setMessageError] = useState([{message: ''}])

	const fetchInitialPostsFromApi = async () => {
        setIsLoading(true);
		setCurrentPage(0);
        setAllDataLoaded(false)
        setFullPosts([]);
        try {
            const newPosts = await GetSnapSharedPosts(10, 0)
            if (newPosts !== undefined && newPosts.length > 0) {
                setFullPosts(newPosts);
                setCurrentPage(1);
            } else {
                setAllDataLoaded(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching initial posts in Snapshare screen:', error.response.status);
            if (error.response.status >= 400 && error.response.status < 500)
                setMessageError([{message: 'An error has ocurred.\nPlease try again later'}])
            if (error.response.status >= 500)
                setMessageError([{message: 'Services not available.\nPlease try again later'}])
            setIsLoading(false)
            setIsLoadingError(true)
        }
    }

    const fetchMorePostsFromApi = async () => {
        if (allDataLoaded || isLoading || isRefreshing) {
            return;
        }
        setIsLoadingMorePosts(true);

        try {
            const newPosts = await GetSnapSharedPosts(10, currentPage)
            if (newPosts !== undefined && newPosts.length > 0) {
                setFullPosts([...fullPosts, ...newPosts]);
                setCurrentPage(currentPage + 1);
            } else {
                setAllDataLoaded(true);
            }
            setIsLoadingMorePosts(false);
        } catch (error) {
            console.error('Error fetching more posts in Snapshare Screen: ', error.response.status);
            if (error.response.status >= 400 && error.response.status < 500)
                setMessageError([{message: 'An error has ocurred.\nPlease try again later'}])
            if (error.response.status >= 500)
                setMessageError([{message: 'Services not available.\nPlease try again later'}])
            setIsLoading(false)
            setIsLoadingError(true)
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

    const renderLoader = () => {
        return (
            isLoadingMorePosts && !isRefreshing ? <ActivityIndicator size={'large'} color={colorApp} /> : <></>
        );
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchInitialPostsFromApi();
        }, [])
    );

    return (
        <View style={styles.container}>
            {isLoadingError ? 
            <Tabs.FlatList
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
            <Tabs.FlatList
                data={fullPosts}
                renderItem={({ item }) =>
                    <SnapShare
                        key={item.pid}
                        uid={item.uid}
                        pid={item.pid}
                        post={item.post}
                        date={item.timestamp}
                    />
                }
                onEndReached={fetchMorePostsFromApi}
                onEndReachedThreshold={0.10}
                ListFooterComponent={renderLoader}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        progressBackgroundColor={'rgba(0, 0, 0, 0.2)'}
                        colors={[colorApp]}
                        tintColor={colorApp}
                        size={"large"}
                    />
                }
            />
            }
        </View>
    )
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
	},
});

export default SnapShareScreen;
