import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tabs } from 'react-native-collapsible-tab-view';
import SnapMsg from '../../SnapMsg';
import { GetPosts } from '../../connectivity/servicesUser';

const PostsScreen = ({url}) => {
	const [loading, setLoading] = useState(true)

    const [posts, setPosts] = useState([])

    const fetchDataFromApi = async () => {
        try {
            // TODO: paginacion dependiendo del scroll
            //await GetPosts(setPosts, nick, '', 100, 0)
			await GetPosts(setPosts, url)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchDataFromApi()
        }, [])
    );

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
