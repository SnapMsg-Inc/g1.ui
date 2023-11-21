import React, { useEffect, useState, useContext }from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { colorBackground, colorText, colorWhite, colorApp } from '../../../styles/appColors/appColors';
import { CurrentPosition, GeocodeWithLocalityAndCountry, GetPermission, ReverseGeocode } from '../../connectivity/location/permissionLocation';
import * as Location from 'expo-location'
import { LoggedUserContext } from '../../connectivity/auth/loggedUserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { CommonActions, useNavigation } from '@react-navigation/native';

const MOCK_TRENDIG = [ "#boca", "messi", "roman", "argentina", "#politica"]

const TrendingScreen = () => {
	const navigation = useNavigation();
	const { userData } = useContext(LoggedUserContext)
	const [coordinates, setCoordinates] = useState(userData.zone)
	const [locality, setLocality] = useState('')
    const [countryLocate, setCountryLocate] = useState('')

	useEffect(()=>{
        const setData = () => {
            ReverseGeocode(coordinates)
            .then((address) => {
                const { city, country } = address[0]
                console.log(`city ${city} country ${country}`)
                setLocality(city)
                setCountryLocate(country)
            }).catch((error) => {
                console.log(error)
            })
        }
        GetPermission()
        .then((location) => {
            if (location.status !== 'granted')
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            else
                setData()
        })
    }, [GetPermission])

	const [fullTrendings, setFullTrendings] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoadingMoreTrendings, setIsLoadingMoreTrendings] = useState(false);

	const fetchInitialTrendingsFromApi = async () => {
        // setIsLoading(true);
		// setCurrentPage(0);
        // setAllDataLoaded(false)
        // setFullTrendings([]);
        // try {
        //     const newTrendings = await GetTrendings(url, 10, 0)
		// 	setFullTrendings(newTrendings);
        //     if (newTrendings.length > 0) {
        //         setCurrentPage(1);
        //     } else {
        //         setAllDataLoaded(true);
        //     }
        //     setIsLoading(false);
        // } catch (error) {
        //     console.error('Error fetching initial posts:', error);
        // }
    }

    const fetchMoreTrendingsFromApi = async () => {
        // if (allDataLoaded || isLoading || isRefreshing) {
        //     return;
        // }
        // setIsLoadingMoreTrendings(true);

        // try {
        //     const newTrendings = await GetTrendings(url, 10, currentPage)
        //     if (newTrendings.length > 0) {
        //         setFullTrendings([...fullTrendings, ...newTrendings]);
        //         setCurrentPage(currentPage + 1);
        //     } else {
        //         setAllDataLoaded(true);
        //     }
        //     setIsLoadingMoreTrendings(false);
        // } catch (error) {
        //     console.error('Error fetching more trending:', error);
        // }
    }

    const handleRefresh = async () => {
        // if (isRefreshing) {
        //     return;
        // }
        // setIsRefreshing(true);
        // await fetchInitialTrendingsFromApi(null);

        // setIsRefreshing(false);
    }

    const renderLoader = () => {
        return (
            isLoadingMoreTrendings && !isRefreshing ? <ActivityIndicator size={'large'} color={colorApp} /> : <></>
        );
    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         fetchInitialTrendingsFromApi();
    //     }, [])
    // );

	const handleItemPress = (searchQuery) => {
		navigation.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [
			{
				name: 'DiscoverScreen',
				params: { searchQuery },
			},
			],
		})
		);
	};
	
	return (
		<View style={styles.container}>
			<Tabs.FlatList
                data={MOCK_TRENDIG}
				ListHeaderComponent={
					<View style={{flexDirection: 'row', paddingVertical: 10}}>
						<Text style={{color: colorWhite, fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
							{`${countryLocate} trends`}
						</Text>
					</View>	
				}
                renderItem={({ item, index }) => (
					<TouchableOpacity onPress={() => handleItemPress(item)}>
						<View style={{ marginLeft: 10, padding: 5 }}>
							<Text style={{ color: colorWhite, fontSize: 16 }}>
								{index + 1} - Trending
							</Text>
							<Text style={{ color: colorApp, fontSize: 18 }}>
								{item}
							</Text>
						</View>
					</TouchableOpacity>
				)}
                onEndReached={fetchMoreTrendingsFromApi}
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorBackground,
	},
	text: {
		fontSize: 20,
		color: colorWhite
	},
});

export default TrendingScreen;