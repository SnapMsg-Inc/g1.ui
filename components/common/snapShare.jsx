import React, { useState, useContext, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import EvilIconsI from 'react-native-vector-icons/EvilIcons'
import { useFocusEffect } from '@react-navigation/native';
import { GetUserByUid, addPostToFav, checkIfUserFaved, checkIfUserLiked, checkIfUserSnapShared, deletePost, deletePostFromFav, deletePostFromSnapshared, likePost, snapSharePost, unlikePost } from '../connectivity/servicesUser';
import { LoggedUserContext } from '../connectivity/auth/loggedUserContext'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import TwitterTextView from "react-native-twitter-textview";
import { colorApp, colorText, colorBackground, colorWhite } from '../../styles/appColors/appColors';
import styles from '../../styles/common/snapShare';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontAwesome5 } from '@expo/vector-icons';

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

export default SnapShare = ({ uid, pid, date, post}) => {
	const { userData } = useContext(LoggedUserContext)
	const navigation = useNavigation();

	const defaultImage = require('../../assets/default_user_pic.png')

    // DATA OF AUTHOR OF SNAPSHARE
    const [sharerData, setSharerData] = useState({
		"uid": "",
		"alias": "",
		"interests": [],
		"pic": "",
		"nick": "",
		"followers": 0,
		"follows": 0,
	});

    // DATA OF AUTHOR OF THE POST
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
		// const postData = {
		// 	pid: pid,
		// 	content: content,
		// 	picUri: picUri,
		// }
		// navigation.navigate('EditPost', {data:postData})
		hideOptionsMenu();
	};

	const deleteSnap = () => {
		// deletePost(pid)
		// .then(() => {
		// 	setIsLoading(false);
		// 	hideOptionsMenu();
		// })
		// .catch((error) => {
		// 	console.error('Error fetching other user data:', error);
		// 	setIsLoading(false);
		// });
        hideOptionsMenu();
	};

	// Actions:

	// FAV
	const [isFav, setIsFav] = useState(false);
	const favIcon = isFav ? (
		<MaterialCommunityIcon name="star-off-outline" size={30} color={colorApp} />
	) : (
		<MaterialCommunityIcon name="star-plus-outline" size={30} color={colorText} />
	);

	const handleToggleFav = () => {
		isFav ? deletePostFromFav(post.pid) : addPostToFav(post.pid);
		setIsFav(!isFav);
	};

	// LIKE
	const [isLiked, setIsLiked] = useState(false);
	const [likesAmount, setLikesAmount] = useState(post.likes);

	const likeIcon = isLiked ? (
		<MaterialCommunityIcon name="heart" size={27} color={colorApp} />
	) : (
		<MaterialCommunityIcon name="heart-outline" size={27} color={colorText} />
	);

	const handleToggleLike = () => {
		isLiked ? unlikePost(post.pid) : likePost(post.pid);
		isLiked ? setLikesAmount(likesAmount - 1) : setLikesAmount(likesAmount + 1);
		setIsLiked(!isLiked);
	};

	// SNAPSHARE
	const [isSnapShared, setIsSnapshared] = useState(false);
	// TODO: BACK - END SUPPORT FOR SNAPSHARE COUNT
	const [snapShareAmount, setSnapShareAmount] = useState(post.snapshares);

	const snapShareIcon = isSnapShared ? (
		<FontAwesome5 name="retweet" size={24} color={colorApp} />
	) : (
		<FontAwesome5 name="retweet" size={24} color={colorText} />
	);

	const handleToggleSnapShare = () => {
		isSnapShared ? deletePostFromSnapshared(post.pid) : snapSharePost(post.pid);
		isSnapShared ? setSnapShareAmount(snapShareAmount - 1) : setSnapShareAmount(snapShareAmount + 1);
		setIsSnapshared(!isSnapShared);
	};

	const fetchDataFromApi = async () => {
		setIsLoading(true);

        // GET DATA OF AUTHOR OF SNAPSHARE
        GetUserByUid(setSharerData, uid)
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching other user data:', error);
				setIsLoading(false);
			});

        // GET DATA OF AUTHOR OF SNAPMSG
		GetUserByUid(setData, post.uid)
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching other user data:', error);
				setIsLoading(false);
			});
		checkIfUserLiked(setIsLiked, post.pid)
		.then(() => {
			setIsLoading(false)
		})
		.catch((error) => {
			console.error('Error fetching data when checking if user liked post:', error);
			setIsLoading(false)
		})
		checkIfUserFaved(setIsFav, post.pid)
		.then(() => {
			setIsLoading(false)
		})
		.catch((error) => {
			console.error('Error fetching data when checking if user faved post:', error);
			setIsLoading(false)
		})
		checkIfUserSnapShared(setIsSnapshared, post.pid)
		.then(() => {
			setIsLoading(false)
		})
		.catch((error) => {
			console.error('Error fetching data when checking if user snapshared post:', error);
			setIsLoading(false)
		})
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchDataFromApi();
		}, [])
	);

	return (
		<>
			{
				isLoading ? <></> : (
					<>
                    <View style={{borderTopWidth: StyleSheet.hairlineWidth,
		                          borderTopColor: colorText,}}>
						<View style={styles.snapSharedBy}>
							<FontAwesome5 name="retweet" size={18} color={colorText} />
                        	<Text style={{color: colorText, fontSize: 15}}> {sharerData.nick} Snapshared</Text>
						</View>
                        <View style={styles.snapShare}>
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
                                    {post.text}
                                </TwitterTextView>
                                {
                                    post.media_uri.length > 0 ? (
                                        <Image
                                            source={{ uri: post.media_uri[0] }}
                                            style={styles.postPic}
                                        />
                                    ) : <></>
                                }

                                {/* Botones de acción */}
                                <View style={styles.actionButtons}>
                                    {/* <TouchableOpacity style={styles.actionButton}>
                                        <MaterialCommunityIcon name="star-off-outline" size={28} color={colorText} />
                                    </TouchableOpacity>
                                    <Text style={styles.stats}>{comments}</Text> */}

                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={styles.actionButton} onPress={handleToggleSnapShare}>
                                            {snapShareIcon}
                                        </TouchableOpacity>
                                        <Text style={styles.stats}>{post.snapshares}</Text>
                                    </View>
                                    
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={styles.actionButton} onPress={handleToggleLike}>
                                            {likeIcon}
                                        </TouchableOpacity>
                                        <Text style={styles.stats}>{likesAmount}</Text>
                                    </View>

                                    <TouchableOpacity style={styles.actionButton} onPress={handleToggleFav}>
                                        {favIcon}
                                    </TouchableOpacity>
                                </View>
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
										<Feather name="edit" size={20} color={colorWhite} />
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
