import React, { useState, useContext, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import EvilIconsI from 'react-native-vector-icons/EvilIcons'
import { useFocusEffect } from '@react-navigation/native';
import { GetUserByUid, deletePost } from './connectivity/servicesUser';
import { LoggedUserContext } from './connectivity/auth/loggedUserContext'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const MAX_ALIAS_LENGTH = 12;
const MAX_NICK_LENGTH = 7;

const truncateAlias = (alias) => {
	if (alias.length <= MAX_ALIAS_LENGTH) {
		return alias;
	} else {
		return alias.slice(0, MAX_NICK_LENGTH) + '...';
	}
};

const truncateNick = (nick) => {
	if (nick.length <= MAX_NICK_LENGTH) {
		return nick;
	} else {
		return nick.slice(0, MAX_NICK_LENGTH) + '...';
	}
};


function formatDateToDDMMYYYY(timestamp) {
	const date = new Date(timestamp);

	const day = date.getDate();
	const month = date.getMonth() + 1; // los meses comienzan desde 0
	const year = date.getFullYear();

	const formattedDate = `${day}/${month}/${year}`;

	return formattedDate;
}

export default SnapMsg = ({ uid, pid, username, content, date, comments = 0, reposts = 0, likes = 0, picUri, hashtags}) => {
	const { userData } = useContext(LoggedUserContext)
	const navigation = useNavigation();

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
	});

	const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

	// Agregar una referencia al botón de los tres puntos
	const optionsButtonRef = useRef(null);
	const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });

	const fetchDataFromApi = async () => {
		setIsLoading(true);
		GetUserByUid(setData, uid)
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching other user data:', error);
				setIsLoading(false);
			});
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchDataFromApi();
		}, [])
	);

	const showOptionsMenu = () => {
		// Obtener las coordenadas del botón de los tres puntos
		optionsButtonRef.current.measure((fx, fy, width, height, px, py) => {
			// Calcular la posición del menú de opciones
			const menuX = px;
			const menuY = py + height;
			setOptionsPosition({ x: menuX, y: menuY });
		});
		setIsOptionsMenuVisible(true);
	};

	const hideOptionsMenu = () => {
		setIsOptionsMenuVisible(false);
	};

	const editPost = () => {
		const postData = {
			content: content,
			picUri: picUri,
		}
		navigation.navigate('EditPost', {data:postData})
		hideOptionsMenu();
	};

	const deleteSnap = () => {
		deletePost(pid)
		.then(() => {
			setIsLoading(false);
			hideOptionsMenu();
		})
		.catch((error) => {
			console.error('Error fetching other user data:', error);
			setIsLoading(false);
		});
	};

	return (
		<>
			<View style={styles.snapMsg}>
				<Image
					source={data.pic === '' || data.pic === 'none' ? defaultImage : { uri: data.pic }}
					style={styles.profilePicture}
				/>

				<View style={styles.container}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.nickname}>
								{truncateAlias(data.alias)}{' '}
							</Text>
							<Text style={styles.username}>
								@{truncateNick(data.nick)} · {formatDateToDDMMYYYY(date)}
							</Text>
						</View>

						{
							uid === userData.uid ? (
								<TouchableOpacity
									ref={optionsButtonRef}
									onPress={showOptionsMenu}
								>
									<Feather name="more-horizontal" size={24} color="#535353" />
								</TouchableOpacity>
							) : <></>
						}
						
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

					{/* Botones de acción */}
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

			{/* Menú de opciones */}
			<Modal
				transparent={true}
				visible={isOptionsMenuVisible}
				onRequestClose={hideOptionsMenu}
			>
				<TouchableWithoutFeedback onPress={hideOptionsMenu}>
					<View style={styles.optionsMenuContainer}>
						<View style={[styles.optionsMenu, { top: optionsPosition.y, left: optionsPosition.x - 175 }]}>
							<TouchableOpacity style={styles.optionItem} onPress={deleteSnap}>
								<Text style={[styles.optionText, {color: 'red'}]}>Delete Post</Text>
								<Feather name="trash-2" size={20} color="red" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.optionItem} onPress={editPost}>
								<Text style={styles.optionText}>Edit Post</Text>
								<Feather name="edit" size={20} color="white" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.optionItem} onPress={hideOptionsMenu}>
								<Text style={styles.optionText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
};

const colorApp = '#1ed760'

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
		marginTop: 3,
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
	},
	optionsMenuContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	optionsMenu: {
		position: 'absolute',
		width: 200,
		backgroundColor: 'rgba(0, 0, 0, 1)',
		borderWidth: 1,
		 borderColor:  colorApp,
		borderRadius: 15
	},
	optionItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: colorApp,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	optionText: {
		marginLeft: 10,
		color: 'white',
	},
});
