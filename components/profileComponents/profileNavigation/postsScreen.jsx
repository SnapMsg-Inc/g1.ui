import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import SnapMsg from '../../common/SnapMsg';
import { GetPosts } from '../../connectivity/servicesUser';
import { colorApp, colorText, colorBackground } from '../../../styles/appColors/appColors';

const PostsScreen = ({url}) => {
	const [fullPosts, setFullPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);

	const fetchInitialPostsFromApi = async () => {
        setIsLoading(true);
		setCurrentPage(0);
        setAllDataLoaded(false)
        setFullPosts([]);
        try {
			// TODO: USAR end-point adecuado
			//await GetRecommendedPosts...

            const newPosts = await GetPosts(url, 10, 0)
			setFullPosts(newPosts);
            if (newPosts.length > 0) {
                setCurrentPage(1);
            } else {
                setAllDataLoaded(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching initial posts:', error);
        }
    }

    const fetchMorePostsFromApi = async () => {
        if (allDataLoaded || isLoading || isRefreshing) {
            return;
        }
        setIsLoadingMorePosts(true);

        try {
			// TODO: USAR end-point adecuado
			//await GetRecommendedPosts(setPosts, userData.uid, 100, 0)
            const newPosts = await GetPosts(url, 10, currentPage)
            if (newPosts.length > 0) {
                setFullPosts([...fullPosts, ...newPosts]);
                setCurrentPage(currentPage + 1);
            } else {
                setAllDataLoaded(true);
            }
            setIsLoadingMorePosts(false);
        } catch (error) {
            console.error('Error fetching more posts:', error);
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

    useEffect(() => {
		fetchInitialPostsFromApi();
    }, [])

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
        </View>
    )
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
	},
});

export default PostsScreen;
