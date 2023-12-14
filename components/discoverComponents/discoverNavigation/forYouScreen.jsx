import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import RecommendedUserCard from '../../common/recommendedUser';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from 'react-native-reanimated-carousel';
import { GetPosts, GetRecommendedPosts, GetUsers } from '../../connectivity/servicesUser';
import SnapMsg from '../../common/SnapMsg';
import styles from '../../../styles/discover/forYouScreen';
import { colorApp, colorBackground } from '../../../styles/appColors/appColors';
import SnapShare from '../../common/snapShare';
import { useTheme } from '../../color/themeContext';
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import { Octicons } from '@expo/vector-icons';

const ForYouScreen = ({searchQuery=null}) => {
	const width = Dimensions.get('window').width;
	const { theme } = useTheme()
	// POSTS:
	const [fullPosts, setFullPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
	const { handleUpdateData } = useContext(LoggedUserContext)
	const [isLoadingError, setIsLoadingError] = useState(false)
    const [messageError, setMessageError] = useState([{message: ''}])

	const extractHashtagsAndWords = (inputText, searchUser) => {
		if (inputText === null)
			return ''
		const hashtagRegex = /#[^\s#]+/g;	
		const extractedHashtags = inputText.match(hashtagRegex) || [];
	
		// Eliminar menciones y hashtags del texto original
		const remainingText = inputText
			.replace(hashtagRegex, '')
			.trim()
			.split(/\s+/); // Dividir el texto restante en un array de palabras
	
		// Utilizar setHashtags y setMentions según sea necesario
		let hashtags = extractedHashtags.map(item => encodeURIComponent(item)).join('&hashtags=');
		let words = remainingText.map(item => encodeURIComponent(item)).join(' ')

		let concat = hashtags.length > 0 ? `hashtags=${hashtags}&text=${words}` : `text=${words}`
		return searchUser ? (remainingText.length === 0 ? '' : remainingText[0]) : concat
	};
	
	const fetchInitialPostsFromApi = async (query=searchQuery) => {
        setIsLoading(true);
		setCurrentPage(0);
        setAllDataLoaded(false)
        setFullPosts([]);
		setIsLoadingError(false)
        try {
			// TODO: USAR end-point adecuado
			//await GetRecommendedPosts...
			let search = extractHashtagsAndWords(query, false)
			let urlWithQueryParams;
			query !== null ? 
				urlWithQueryParams = `https://gateway-api-api-gateway-marioax.cloud.okteto.net/posts?${search}` :
				urlWithQueryParams = `https://gateway-api-api-gateway-marioax.cloud.okteto.net/posts?`

            const newPosts = await GetPosts(urlWithQueryParams, 10, 0);
            if (newPosts && newPosts.length > 0) {
				setFullPosts(newPosts);
                setCurrentPage(1);
            } else {
				setAllDataLoaded(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching initial posts in ForYouScreen:', error.response.status);
			if (error.response.status >= 400 && error.response.status < 500)
                setMessageError([{message: 'An error has ocurred.\nPlease try again later'}])
            if (error.response.status >= 500)
                setMessageError([{message: 'Services not available.\nPlease try again later'}])
            setFullPosts([])
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
			// TODO: USAR end-point adecuado
			//await GetRecommendedPosts(setPosts, userData.uid, 100, 0)
			let urlWithQueryParams;
			let search = extractHashtagsAndWords(searchQuery, false)

			searchQuery !== null ? 
				urlWithQueryParams = `https://gateway-api-api-gateway-marioax.cloud.okteto.net/posts?${search}` :
				// TODO: si search query == null entonces tengo que usar el endp de recommended users
				urlWithQueryParams = `https://gateway-api-api-gateway-marioax.cloud.okteto.net/posts?`

            const newPosts = await GetPosts(urlWithQueryParams, 10, currentPage);
            if (newPosts && newPosts.length > 0) {
                setFullPosts([...fullPosts, ...newPosts]);
                setCurrentPage(currentPage + 1);
            } else {
                setAllDataLoaded(true);
            }
            setIsLoadingMorePosts(false);
        } catch (error) {
            console.error('Error fetching more posts in your screen:', error.response.status);
			if (error.response.status >= 400 && error.response.status < 500)
                setMessageError([{message: 'An error has ocurred.\nPlease try again later'}])
            if (error.response.status >= 500)
                setMessageError([{message: 'Services not available.\nPlease try again later'}])
            setFullPosts([])
			setIsLoading(false)
            setIsLoadingError(true)
        }
    }

    const handleRefresh = async () => {
        if (isRefreshing) {
            return;
        }
		if (isLoadingError)
			handleUpdateData()
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
		let nick
		let urlWithQueryParams;
		if (query !== null) {
		  // Si searchQuery comienza con '#', quita el '#' y usa el resto como nick
		  nick = extractHashtagsAndWords(searchQuery, true)
		//   const nick = searchQuery.startsWith('#') ? searchQuery.slice(1) : searchQuery;
		  urlWithQueryParams = `?nick=${nick}&limit=10&page=0`;
		} else {
		  // TODO: si searchQuery == null entonces tengo que usar el endpoint de recommended users
		  urlWithQueryParams = `?limit=10&page=0`;
		}
		if (nick !== '') {
			GetUsers(setUsers, urlWithQueryParams)
			.then(() => setIsLoading(false)) 
			.catch((error) => {
				console.error('Error fetching followers data in for you Screen:', error.response.status);
				if (error.response.status >= 400 && error.response.status < 500)
					setMessageError([{message: 'An error has ocurred.\nPlease try again later'}])
				if (error.response.status >= 500)
					setMessageError([{message: 'Services not available.\nPlease try again later'}])
				setUsers([])
				setIsLoading(false)
				setIsLoadingError(true)
			});
		} else {
			setUsers([])
		} 
	};
	  
	useEffect(() => {
		fetchUsersFromApi()
		fetchInitialPostsFromApi();
    }, [searchQuery])

	return (
		<>
			{
				isLoading ? (
					<View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
						<ActivityIndicator size={'large'} color={colorApp}/>
					</View>
				) : (
					<View style={[styles.scrollView, { backgroundColor: theme.backgroundColor }]}>
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
							ListHeaderComponent={() => {
								return (
									<>
										{(users.length > 0) ? (
										<View style={{marginVertical: 10}}>
											<Text style={[styles.text, { color: theme.whiteColor }]}>
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
														backgroundColor: theme.backgroundColor,
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
											{fullPosts.length === 0 && 
												<View style={{marginVertical: 10}}>
													<Text style={[styles.text, {color: theme.whiteColor}]}>
														No posts found for {searchQuery}
													</Text>
													<Text style={styles.textAlt}>
														Try searching for something else!
													</Text>
												</View>
											}
										</View>
										) : (fullPosts.length > 0 ? (
												<View style={{marginVertical: 10}}>
													<Text style={[styles.text, {color: theme.whiteColor}]}>
														Not users found for {searchQuery}
													</Text>
													<Text style={styles.textAlt}>
														Try searching for something else!
													</Text>
													<Text style={styles.textRelatedPosts}>
														Related posts:
													</Text>
												</View>
											) :
											(
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
										reposts={item.snapshares}
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
						}
					</View>
				)
			}
		</>
	);
};

export default ForYouScreen;