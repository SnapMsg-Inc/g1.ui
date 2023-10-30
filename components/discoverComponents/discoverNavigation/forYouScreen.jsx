import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RecommendedUserCard from '../../recommendedUser';
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import { Tabs } from 'react-native-collapsible-tab-view';
import Carousel from 'react-native-reanimated-carousel';
import { GetUserFollowersByUid } from '../../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import SnapMsg from '../../SnapMsg';


function generateSnaps(limit) {
	return new Array(limit).fill(0).map((_, index) => {
	  const repetitions = Math.floor(Math.random() * 4) + 1;

	  return {
		  key: index.toString(),
		  content: 'Lorem ipsum dolor ametLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus '.repeat(repetitions),
		  nickname: 'Nickname',
		  username: 'username',
		  profilePictureUri: '',
		  date: '18/06/2023',
		  comments: 4,
		  reposts: 18,
		  likes: 12,
		  picUri: 'https://firebasestorage.googleapis.com/v0/b/snap-msg.appspot.com/o/photos%2F534ba2ce-2d68-422d-9e5f-46e1b7a607cb1698507950786.jpg?alt=media&token=b76bf434-99cb-4e4a-aec7-724296f45f85&_gl=1*icc097*_ga*MTczNDg3OTg0NC4xNjk3MzEwODIy*_ga_CW55HF8NVT*MTY5ODYyNzU5NC4xNS4xLjE2OTg2Mjg3MjYuNDUuMC4w'
	  };
});
}

const MOCKED_SNAPS = generateSnaps(30);

const ForYouScreen = () => {
	const { userData, isLoadingUserData, fetchUserDataFromApi } = useContext(LoggedUserContext)
	const width = Dimensions.get('window').width;

	// TODO: USAR ENDP ......
	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		setTimeout(() => {setLoading(false)}, 1000 )
	},[])

	// TODO: CONECTAR CON SEARCH / USAR END POINT ADECUADO
	const [fullData, setFullData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchDataFromApi = async () => {
        setIsLoading(true)
        GetUserFollowersByUid(setFullData, userData.uid)
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
				{loading ? <></> :
					MOCKED_SNAPS.map((item, index) => (
						<SnapMsg
							key={item.key}
							nickname={userData.alias}
							username={userData.nick}
							content={item.content}
							profilePictureUri={userData.pic}
							date={item.date}
							comments={item.comments}
							reposts={item.reposts}
							likes={item.likes}
							picUri={item.picUri}
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