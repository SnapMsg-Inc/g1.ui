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
			profilePictureUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png',
			date: '18/06/2023',
			comments: 4,
			reposts: 18,
			likes: 12,
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