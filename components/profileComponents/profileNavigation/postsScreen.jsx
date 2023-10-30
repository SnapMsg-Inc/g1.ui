import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
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
  

const PostsScreen = ({data}) => {
  	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		setTimeout(() => {setLoading(false)}, 1000 )
	},[])

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<Text>BOOOOOOOOOOOOCA BOCAAAAA</Text>
			<View style={styles.container}>
				{loading ? <></> :
					MOCKED_SNAPS.map((item, index) => (
						<SnapMsg
							key={item.key}
							nickname={data.alias}
							username={data.nick}
							content={item.content}
							profilePictureUri={data.pic}
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

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: 'black'
	},
	container: {
		flex: 1,
	},
	text: {
		color: 'white',
	},
});

export default PostsScreen;