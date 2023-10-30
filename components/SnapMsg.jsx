import React, { useState, } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import EvilIconsI from 'react-native-vector-icons/EvilIcons'
import { useFocusEffect } from '@react-navigation/native';
import { GetUserByUid } from './connectivity/servicesUser';

function formatDateToDDMMYYYY(timestamp) {
	const date = new Date(timestamp);
  
	const day = date.getDate();
	const month = date.getMonth() + 1; // los meses comienzan desde 0
	const year = date.getFullYear();
  
	const formattedDate = `${day}/${month}/${year}`;
  
	return formattedDate;
  }

export default SnapMsg = ({ uid, pid, username, content, date, comments=0, reposts=0, likes=0, picUri}) => {
  	const defaultImage = require('../assets/default_user_pic.png')

	  const [isLoading, setIsLoading] = useState(false)
	  const [data, setData] = useState({
		  "uid": "",
		  "alias": "",
		  "interests": [],
		  "pic": "",
		  "nick": "",
		  "followers": 0,
		  "follows": 0,
	  })
  
	  const fetchDataFromApi = async () => {
		  setIsLoading(true)
		  GetUserByUid(setData, uid)
		  .then(() => {
			  setIsLoading(false)
		  })
		  .catch((error) => {
			  console.error('Error fetching other user data:', error);
			  setIsLoading(false)
		  })
	  }
  
	  useFocusEffect(
		  React.useCallback(() => {
				fetchDataFromApi()
		  }, [])
	  );

	return (
		<View style={styles.snapMsg}>
			<Image
				source={data.pic === '' || data.pic === 'none' ? defaultImage : { uri: data.pic }}
				style={styles.profilePicture}
			/>

			<View style={styles.container}>
				<View style={{flexDirection: 'row'}}>
					<Text style={styles.nickname}>
						{data.alias}{' '}
					</Text>
					<Text style={styles.username}>
						@{username} · {formatDateToDDMMYYYY(date)}
					</Text>
				</View>

				<Text style={styles.text}>{content}</Text>

				{
					picUri.length > 0 ? (
						<Image
							source={{ uri: picUri[0] }}
							style={styles.postPic}
						/>
						) : <></>
				}
				
				{/* Botones de acción 
					TODO: onPress () => ..... (hacer la accion y tambien cambiar de color el icono)
				*/}
				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.actionButton}>
						<EvilIconsI name="comment" size={28} color='#535353' />
					</TouchableOpacity>
					<Text style={styles.stats}>{comments}</Text>

					<TouchableOpacity style={styles.actionButton}>
						<EvilIconsI name="retweet" size={28} color='#535353' />
					</TouchableOpacity>
					<Text style={styles.stats}>{reposts}</Text>

					<TouchableOpacity style={styles.actionButton}>
						<EvilIconsI name="heart" size={28} color='#535353' />
					</TouchableOpacity>
					<Text style={styles.stats}>{likes}</Text>

					<TouchableOpacity style={styles.actionButton}>
						<EvilIconsI name="share-apple" size={28} color='#535353' />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	snapMsg: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: '#535353',
	},
	profilePicture: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	nickname: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white',
	},
	username: {
		color: '#535353',
		fontWeight: 'normal',
	},
	text: {
		fontSize: 15,
		color: 'white',
	},
	stats: {
		fontSize: 15,
		color: '#535353',
		marginRight: 35,
		marginLeft: 3,
		marginTop: 3
	},
	actionButtons: {
		flexDirection: 'row',
		marginTop: 10,
	},
	actionButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	postPic: {
		width: '100%',
		aspectRatio: 16 / 9,
		marginVertical: 10,
		borderRadius: 15,
	}
});
