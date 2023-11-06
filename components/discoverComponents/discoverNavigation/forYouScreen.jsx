import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import RecommendedUserCard from '../../recommendedUser';
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from 'react-native-reanimated-carousel';
import { GetFeedPosts, GetRecommendedPosts, GetUserFollowersByUid, GetUsers } from '../../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import SnapMsg from '../../SnapMsg';

const ForYouScreen = ({searchQuery=null}) => {
	const { userData } = useContext(LoggedUserContext)
	const width = Dimensions.get('window').width;

	
	const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
	
    const fetchRecommendedPostsFromApi = async () => {
		try {
			// TODO: paginacion dependiendo del scroll
            await GetRecommendedPosts(setPosts, userData.uid, 100, 0)
            setLoading(false)
        } catch (error) {
			console.error('Error fetching data:', error);
        }
    }
	
    useFocusEffect(
		React.useCallback(() => {
			fetchRecommendedPostsFromApi()
        }, [])
	);
	
	// TODO: CONECTAR CON SEARCH / USAR END POINT ADECUADO
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const fetchDataFromApi = async () => {
		setIsLoading(true)
		let urlWithQueryParams;
		searchQuery !== null ? 
			urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/users?nick=${searchQuery}&limit=100&page=0` :
			// TODO: si search query == null entonces tengo que usar el endp de recommended users
			urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/users?limit=100&page=0`

		GetUsers(setUsers, urlWithQueryParams)
        .then(() => {
            setIsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching followers data:', error);
            setIsLoading(false)
        })
    }

	useEffect(() => {
		fetchDataFromApi()
    }, [searchQuery])

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
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
					isLoading ? <></> : (
						users.length === 0 ? (
							<View style={{marginVertical: 10}}>
								{
									posts.length === 0 ? (
										<View>
											<Text style={styles.text}>
												No results for {searchQuery}
											</Text>
											<Text style={styles.textAlt}>
												Try searching for something else!
											</Text>
										</View>
									) : <></>
								}
							</View>
						) :
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
			<View style={styles.container}>
				{loading ? <ActivityIndicator size={'large'} color={'#1ed760'} style={{padding: 10}}/> :
						posts.length === 0 ? <></> : (
							posts.map((item, index) => (
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
							))
						)
					}
			</View>
		</Tabs.ScrollView>
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
		//marginTop: 10,
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