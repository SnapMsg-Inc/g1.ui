import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import RecommendedUserCard from '../../recommendedUser';
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from 'react-native-reanimated-carousel';
import { GetRecommendedPosts, GetUserFollowersByUid, GetUsers } from '../../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import SnapMsg from '../../SnapMsg';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const ForYouScreen = ({searchQuery=null}) => {
	const { userData } = useContext(LoggedUserContext)
	const width = Dimensions.get('window').width;

	// const navigation = useNavigation();
	// //const routeName = navigation.dangerouslyGetState().routes.slice(-1)[0].name;
  	// console.log('Navegado desde la pantalla:', navigation);

	// const route = useRoute();
	//  if (route) console.log("route: ", route)

	// const searchQuery = route && route.params && route.params.searchQuery ? route.params.searchQuery : null;
	console.log("SEARCH QUERY en ForYou: " , searchQuery)

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
	const [fullData, setFullData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchDataFromApi = async () => {
        setIsLoading(true)
        // GetUserFollowersByUid(setFullData, userData.uid)
		GetUsers(setFullData, 'https://api-gateway-marioax.cloud.okteto.net/users?limit=100&page=0')
        .then(() => {
            setIsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching followers data:', error);
            setIsLoading(false)
        })
    }

	useFocusEffect(
        React.useCallback(() => {
          	fetchDataFromApi()
        }, [])
    );

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<Text style={styles.text}>
					People
				</Text>
				{
					isLoading ? <></> : (
						<View style={{marginVertical: 20}}>
							<Carousel
								loop={false}
								width={width}
								data={fullData}
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
			 {/* VER ACA -> USAR DATA OBTENIDA DEL ENDPOINT (PREGUNTAR CUAL ES)*/}
			<View style={styles.container}>
				{loading ? <ActivityIndicator size={'large'} color={'#1ed760'} style={{padding: 10}}/> :
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
		marginTop: 10,
	},
	text: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
});

export default ForYouScreen;