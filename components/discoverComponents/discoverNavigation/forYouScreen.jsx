import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import RecommendedUserCard from '../../common/recommendedUser';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from 'react-native-reanimated-carousel';
import { GetPosts, GetRecommendedPosts, GetUsers } from '../../connectivity/servicesUser';
import SnapMsg from '../../common/SnapMsg';
import styles from '../../../styles/discover/forYouScreen';
import { colorApp, colorBackground } from '../../../styles/appColors/appColors';
import SnapShare from '../../common/snapShare';

const ForYouScreen = ({searchQuery=null}) => {
	const width = Dimensions.get('window').width;

	// POSTS:
	const [fullPosts, setFullPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);

	const fetchInitialPostsFromApi = async (query=searchQuery) => {
        setIsLoading(true);
		setCurrentPage(0);
        setAllDataLoaded(false)
        setFullPosts([]);
        try {
			// TODO: USAR end-point adecuado
			//await GetRecommendedPosts...
			let urlWithQueryParams;
			query !== null ? 
				urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/posts?text=${encodeURIComponent(query)}` :
				urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/posts?`

            const newPosts = await GetPosts(urlWithQueryParams, 10, 0);
            if (newPosts && newPosts.length > 0) {
				setFullPosts(newPosts);
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
			let urlWithQueryParams;
			searchQuery !== null ? 
				urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/posts?text=${encodeURIComponent(searchQuery)}` :
				// TODO: si search query == null entonces tengo que usar el endp de recommended users
				urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/posts?`

            const newPosts = await GetPosts(urlWithQueryParams, 10, currentPage);
            if (newPosts && newPosts.length > 0) {
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
		await fetchUsersFromApi(null);
        setIsRefreshing(false);
    }

    const renderLoader = () => {
        return (
            isLoadingMorePosts && !isRefreshing ? <ActivityIndicator size={'large'} color={colorApp} /> : <></>
        );
    }
	
	// USERS:
	const fetchUsersFromApi = async (query=searchQuery) => {
		setIsLoading(true);
		let urlWithQueryParams;
		if (query !== null) {
		  // Si searchQuery comienza con '#', quita el '#' y usa el resto como nick
		  const nick = searchQuery.startsWith('#') ? searchQuery.slice(1) : searchQuery;
		  urlWithQueryParams = `?nick=${nick}&limit=10&page=0`;
		} else {
		  // TODO: si searchQuery == null entonces tengo que usar el endpoint de recommended users
		  urlWithQueryParams = `?limit=10&page=0`;
		}
	  
		GetUsers(setUsers, urlWithQueryParams)
		  .then(() => {
			setIsLoading(false);
		  })
		  .catch((error) => {
			console.error('Error fetching followers data:', error);
			setIsLoading(false);
		  });
	  };
	  

	useEffect(() => {
		fetchUsersFromApi()
		fetchInitialPostsFromApi();
    }, [searchQuery])

	return (
		<>
			{
				isLoading ? (
					<View style={styles.container}>
						<ActivityIndicator size={'large'} color={colorApp}/>
					</View>
				) : (
					<View style={styles.scrollView}>
						<Tabs.FlatList
							data={fullPosts}
							ListHeaderComponent={() => {
								return (
									<>
										{(users.length > 0) ? (
										<View style={{marginVertical: 10}}>
											<Text style={styles.text}>
												{searchQuery ? 'People' : 'Who to follow'}
											</Text>
											<Carousel
												loop={false}
												width={width}
												data={users}
												height={180}
												sliderWidth={300}
												itemWidth={300}
												scrollAnimationDuration={1000}
												renderItem={({ item }) => (
													<View style={{
														backgroundColor: colorBackground,
														marginLeft: 5,
														marginRight: 5, }}>
														<RecommendedUserCard 
															uid={item.uid}
															alias={item.alias}
															nick={item.nick}
															interests={item.interests}
															pic={item.pic}
														/>
													</View>
												)}
												/>
										</View>
										) : (
											fullPosts.length > 0 ? (
												<View style={{marginVertical: 10}}>
													<Text style={styles.text}>
														Not users found for {searchQuery}
													</Text>
													<Text style={styles.textAlt}>
														Try searching for something else!
													</Text>
													<Text style={styles.textRelatedPosts}>
														Related posts:
													</Text>
												</View>
											) : (
												<View style={{marginVertical: 10}}>
													<Text style={styles.text}>
														No results for {searchQuery}
													</Text>
													<Text style={styles.textAlt}>
														Try searching for something else!
													</Text>
												</View>
											)
										)
										}
									</>									
									)
							}}
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
			}
		</>
	);
};

export default ForYouScreen;