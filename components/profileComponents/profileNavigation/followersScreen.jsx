import React, { useEffect, useState }  from 'react';
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl,
	FlatList } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowerCard from '../followerCard';
import { GetUserFollowersByUid } from '../../connectivity/servicesUser';
import { useFocusEffect } from '@react-navigation/native';
import { colorApp, colorBackground } from '../../../styles/appColors/appColors';

const FollowersScreen = ({ navigation, uid }) => {

	const [followers, setFollowers] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchInitialFollowersFromApi = async () => {
        setIsLoading(true);
		setCurrentPage(0);
        setAllDataLoaded(false)
        setFollowers([]);
        try {
            const newFollowers = await GetUserFollowersByUid(uid, 3, 0)
			setFollowers(newFollowers);
            if (newFollowers.length > 0) {
                setCurrentPage(1);
            } else {
                console.log("All data loaded")
                setAllDataLoaded(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error.response.status)
            // TODO: CATCHEAR ESTE ERROR (GATEWAY CAIDO) EN TODOS LADOS!!!!!!!
            if (error.response.status === 502)
                alert('Services not available.\nPlease retry again later')

            console.error('Error fetching initial posts:', error);
        }
    }

    const fetchDataFromApi = async () => {
        if (allDataLoaded || isLoading) {
            return;
        }
        setIsLoading(true);
        try {
            const newFollowers = await GetUserFollowersByUid(uid, 10, currentPage)
            if (newFollowers.length > 0) {
                setFollowers([...followers, ...newFollowers]);
                setCurrentPage(currentPage + 1);
            } else {
                setAllDataLoaded(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleRefresh = async () => {
        if (isRefreshing) {
            return;
        }
        setIsRefreshing(true);
        await fetchInitialFollowersFromApi(null);
        setIsRefreshing(false);
    }

    const renderLoader = () => {
        return (
            isLoading && !isRefreshing ? <ActivityIndicator size={'large'} color={colorApp} /> : <></>
        );
    }

	useFocusEffect(
        React.useCallback(() => {
			console.log("entro")
			if (followers.length) {
				console.log("followers: ", followers.length)
				setFollowers([])
		 	}
          	fetchInitialFollowersFromApi()
        }, [])
    );

	return (
		<Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
                {/* TODO: USE FLATLIST (WAITING FOR BACKEND PAGINATION) */}
				{isLoading ? <ActivityIndicator size={'large'} color={colorApp} style={{padding: 10}}/> : 
					followers.map((item) => (
						<FollowerCard
							uid={item.uid}
							alias={item.alias}
							nick={item.nick}
							interests={item.interests}
							pic={item.pic}
							key={item.uid}
						/>
				))}
			</View>
		</Tabs.ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
	},
	text: {
		fontSize: 20,
	},
});

export default FollowersScreen;