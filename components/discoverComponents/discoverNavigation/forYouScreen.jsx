import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import RecommendedUserCard from '../../recommendedUser';
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from 'react-native-reanimated-carousel';
import { GetPosts, GetRecommendedPosts, GetUsers } from '../../connectivity/servicesUser';
import SnapMsg from '../../SnapMsg';
import PostButton from '../../buttons/buttonPost';

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

            const newPosts = await GetPosts(urlWithQueryParams, 5, 0);
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
			let urlWithQueryParams;
			searchQuery !== null ? 
				urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/posts?text=${searchQuery}` :
				// TODO: si search query == null entonces tengo que usar el endp de recommended users
				urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/posts?`

            const newPosts = await GetPosts(urlWithQueryParams, 5, currentPage);
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
		await fetchUsersFromApi(null);
        setIsRefreshing(false);
    }

    const renderLoader = () => {
        return (
            isLoadingMorePosts && !isRefreshing ? <ActivityIndicator size={'large'} color={'#1ed760'} /> : <></>
        );
    }
	
	// USERS:
	const fetchUsersFromApi = async (query=searchQuery) => {
		setIsLoading(true);
		let urlWithQueryParams;
		console.log(query)
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
						<ActivityIndicator size={'large'} color={'#1ed760'}/>
					</View>
				) : (
					<View style={styles.scrollView}>
						<Tabs.FlatList
							data={fullPosts}
							ListHeaderComponent={() => {
								return (
									<View>
										{
											searchQuery ? (
												users.length > 0 ? (
													<Text style={styles.text}>
														People
													</Text>
												) : <></>
											) : (
												users.length > 0 ? (
													<Text style={styles.text}>
														Who to follow
													</Text>
												) : <></>
											)
										}
										{
											users.length === 0 ? (
												fullPosts.length === 0 ? (
													<View style={{marginVertical: 10}}>
														<View>
															<Text style={styles.text}>
																No results for {searchQuery}
															</Text>
															<Text style={styles.textAlt}>
																Try searching for something else!
															</Text>
														</View>	
													</View>
												) : <></>
											) : (
												<View style={{marginVertical: 10}}>
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
																backgroundColor:'black',
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
											)
										}
									</View>
								)
							}}
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
						<PostButton onPress={() => navigation.navigate('CreatePostScreen')} />
					</View>
				)
			}
		</>
	);
};

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'


const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: 'black'
	},
	container: {
		flex:1,
		backgroundColor: colorBackground,
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
		marginHorizontal: 10,
	},
	textAlt: {
		fontSize: 16,
		color: colorText,
		marginHorizontal: 10,
	}
});

export default ForYouScreen;