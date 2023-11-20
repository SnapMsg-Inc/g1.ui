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
import styles from '../../styles/messages/searchPeopleScreen';
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import SearchedUserCard from './searchedUserCard';

const SearchUserScreen = () => {
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [fullData, setFullData] = useState([]);
	const [searchQuery, setSearchQuery] = useState(null);
	const [showFlatList, setShowFlatList] = useState(false);

	const fetchDataFromApi = async (query) => {
		setIsLoading(true)
		const urlWithQueryParams = `?nick=${query}&limit=100&page=0`;
		GetUsers(setFullData, urlWithQueryParams)
		.then(() => {
			setIsLoading(false)
		})
		.catch((error) => {
			console.error('Error fetching users data, SearchUserScreen:', error);
			setIsLoading(false)
		})
    }

	const handleSearch = (query) => {
		const text = query.replace(/\s/g, '')
		if (text == '') {
			console.log("text sin espacio")
		}

		setSearchQuery(text);
		setShowFlatList(text.length > 0)

		
		const formattedQuery = text.toLowerCase();
		
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
						onChangeText={(query) => {
								handleSearch(query)}
						}
						autoFocus
						keyboardType='none'
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
                    <View style={styles.infoText}>
                        <Text style={styles.text}>
                            Try searching for people
                        </Text>
                    </View>

				)
			}
			{
				showFlatList ? (
					<View style={{width: '100%'}}>
						<FlatList
							data={data}
							keyExtractor={(item) => item.uid.toString()}
							renderItem={({item}) => (
								<SearchedUserCard data={item}/>
							)}
						/>
					</View>
				) : <></>
			}
			
		</View>
	);
};

export default SearchUserScreen;