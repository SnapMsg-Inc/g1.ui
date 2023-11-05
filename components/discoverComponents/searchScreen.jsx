import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import FollowerCard from '../profileComponents/followerCard';
import { useFocusEffect } from '@react-navigation/native';
import { GetUserFollowersByUid, GetUsers } from '../connectivity/servicesUser';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext';
import filter from 'lodash.filter';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
	const navigation = useNavigation();
	const { userData } = useContext(LoggedUserContext)

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [fullData, setFullData] = useState([]);
	const [searchQuery, setSearchQuery] = useState(null);
	const [showFlatList, setShowFlatList] = useState(false);

	const fetchDataFromApi = async (query) => {
        setIsLoading(true)
		const urlWithQueryParams = `https://api-gateway-marioax.cloud.okteto.net/users?nick=${query}&limit=100&page=0`;
		GetUsers(setFullData, urlWithQueryParams)
        .then(() => {
            setIsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching followers data:', error);
            setIsLoading(false)
        })
    }

	const handleSearch = (query) => {
		setSearchQuery(query);
		setShowFlatList(query.length > 0)

		
		const formattedQuery = query.toLowerCase();
		
		if (formattedQuery.length == 1) {
			fetchDataFromApi(formattedQuery);
		}
		
		const filteredData = filter(fullData, (user) => {
			return contains(user.alias, user.nick, formattedQuery)
		})
		setData(filteredData)
	};

	const contains = (alias, nick, query) => {
		const aliasParts = alias.split(' ');

		return aliasParts.some((part) => part.toLowerCase().includes(query))
		 	|| nick.includes(query) ? true : false
	}

	const handleSearchPress = () => {
		// Realiza la búsqueda y pasa el valor de búsqueda
		console.log("Query enviada: ", searchQuery)
		// navigation.navigate('DiscoverScreen', { searchQuery:searchQuery });
		navigation.navigate('DiscoverScreen', {
			screen: 'ForYouScreen',
			searchQuery: searchQuery
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.searchBox}>
					<Octicons name="search" size={22} 
						color={colorText} style={{marginHorizontal: 8}}
					/>
					<TextInput
						placeholder='Search'
						clearButtonMode='always'
						style={styles.textInput}
						placeholderTextColor={colorText}
						autoCorrect={false}
						value={searchQuery}
						onChangeText={(query) => handleSearch(query)}
						autoFocus
						keyboardType='twitter'
						onSubmitEditing={handleSearchPress}
					/>
				</View>
				<TouchableHighlight
                        onPress={() => { 
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableHighlight>
			</View>
			{
				showFlatList ? <></> : (
					<Text style={styles.text}>
						Try searching for people, topics, or keywords
					</Text>
				)
			}
			{
				showFlatList ? (
					<View style={{width: '100%'}}>
						<FlatList
							data={data}
							keyExtractor={(item) => item.uid.toString()}
							renderItem={({item}) => (
								<FollowerCard
									uid={item.uid}
									alias={item.alias}
									nick={item.nick}
									interests={item.interests}
									pic={item.pic}
									key={item.uid}
								/>
							)}
						/>
					</View>
				) : <></>
			}
			
		</View>
	);
};

const colorBackground = '#000'
const colorApp = '#1ed760'
export const colorText = '#535353'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center'
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchBox: {
		flex: 1,
		justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:10,
        borderWidth: 1,
        borderColor: colorApp,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginTop: 10,
	},
	text: {
		color: colorText,
		paddingVertical: 10,
	},
	textInput: {
		flex: 1,
		color: 'white',
	},
	cancelButton: {
		color: colorText,
		marginRight: 10,
        marginTop: 10,
		paddingVertical:10,
		fontSize: 16,
	}
});

export default SearchScreen;