import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import EvilIconsI from 'react-native-vector-icons/EvilIcons'

export default SnapMsg = ({ nickname, username, content, profilePictureUri, date, comments, reposts, likes }) => {
  return (
    <View style={styles.snapMsg}>
      <Image
        source={{ uri: profilePictureUri }}
        style={styles.profilePicture}
      />

      <View style={styles.container}>
        <Text style={styles.nickname}>
          {nickname}{' '}
          <Text style={styles.username}>
            @{username} · {date}
          </Text>
        </Text>

        <Text style={styles.text}>{content}</Text>

        {/* Botones de acción 
            TODO: onPress () => ..... (hacer la accion y tambien cambiar de color el icono)
        */}
        <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
                <EvilIconsI name="comment" size={28} color='#687684' />
            </TouchableOpacity>
            <Text style={styles.stats}>{comments}</Text>

            <TouchableOpacity style={styles.actionButton}>
                <EvilIconsI name="retweet" size={28} color='#687684' />
            </TouchableOpacity>
            <Text style={styles.stats}>{reposts}</Text>

            <TouchableOpacity style={styles.actionButton}>
                <EvilIconsI name="heart" size={28} color='#687684' />
            </TouchableOpacity>
            <Text style={styles.stats}>{likes}</Text>

            <TouchableOpacity style={styles.actionButton}>
                <EvilIconsI name="share-apple" size={28} color='#687684' />
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
    borderTopColor: '#687684',
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
    color: '#687684',
    fontWeight: 'normal',
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
  stats: {
    fontSize: 15,
    color: '#687684',
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
});