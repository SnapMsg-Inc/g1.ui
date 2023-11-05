import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import SnapMsg from '../../SnapMsg';
import { GetPosts } from '../../connectivity/servicesUser';
import PostButton from '../../buttons/buttonPost';

const PostsScreen = ({url}) => {
	const [fullPosts, setFullPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchDataFromApi = async () => {
        if (allDataLoaded || isLoading) {
            return;
        }
        setIsLoading(true);
        try {
            const newPosts = await GetPosts(url, 10, currentPage);
            if (newPosts.length > 0) {
                setFullPosts([...fullPosts, ...newPosts]);
                setCurrentPage(currentPage + 1);
            } else {
                setAllDataLoaded(true);
            }
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
        setCurrentPage(0);
        setAllDataLoaded(false)
        setFullPosts([]);
        await fetchDataFromApi();
        setIsRefreshing(false);
    }

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    const renderLoader = () => {
        return (
            isLoading && !isRefreshing ? <ActivityIndicator size={'large'} color={'#1ed760'} /> : <></>
        );
    }

    return (
        <View style={styles.container}>
            <Tabs.FlatList
                data={fullPosts}
                renderItem={({ item }) =>
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
                onEndReached={fetchDataFromApi}
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
            <PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
        </View>
    )
};

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
	},
});

export default PostsScreen;
