import React, { useState, useContext, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import EvilIconsI from 'react-native-vector-icons/EvilIcons'
import { useFocusEffect } from '@react-navigation/native';
import { GetUserByUid, deletePost } from '../connectivity/servicesUser';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import TwitterTextView from "react-native-twitter-textview";
import { colorApp, colorText, colorBackground } from '../../styles/appColors/appColors';
import styles from '../../styles/common/snapMsg';

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

	const defaultImage = require('../../assets/default_user_pic.png')

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
			pid: pid,
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
			{
				isLoading ? <></> : (
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
											<Feather name="more-horizontal" size={24} color={colorText} />
										</TouchableOpacity>
									) : <></>
								}
								
							</View>

							{/* <Text style={styles.text}>{content}</Text> */}
							{/* <SnapMsgText text={content}/> */}
							<TwitterTextView
								style={styles.text}
								hashtagStyle={styles.hashtagStyle}
								mentionStyle={styles.mentionStyle}
								linkStyle={styles.linkStyle}
								emailStyle={styles.emailStyle}
							>
								{content}
							</TwitterTextView>
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
									<EvilIconsI name="comment" size={28} color={colorText} />
								</TouchableOpacity>
								<Text style={styles.stats}>{comments}</Text>

								<TouchableOpacity style={styles.actionButton}>
									<EvilIconsI name="retweet" size={28} color={colorText} />
								</TouchableOpacity>
								<Text style={styles.stats}>{reposts}</Text>

								<TouchableOpacity style={styles.actionButton}>
									<EvilIconsI name="heart" size={28} color={colorText} />
								</TouchableOpacity>
								<Text style={styles.stats}>{likes}</Text>

								<TouchableOpacity style={styles.actionButton}>
									<EvilIconsI name="share-apple" size={28} color={colorText} />
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
				)
			}
		</>
	);
};
