import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import FollowerCard from './followerCard';

function generateFollowers(limit) {
  return new Array(limit).fill(0).map((_, index) => {

    return {
      key: index.toString(),
      uid: '',
      nick: 'Pedro Messi',
      interests: 'Se viene boooooooooca se viene boca boca boca boca boca boca boca boca boca',
      pic: 'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp',
    };
  });
}

const MOCKED_FOLLOWERS = generateFollowers(5);

const FollowersScreen = ({ navigation }) => {
  return (
    <Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
			{MOCKED_FOLLOWERS.map((item, index) => (
				<FollowerCard
					navigation={navigation}
					key={item.key}
					uid={item.uid}
					nick={item.nick}
					interests={item.interests}
					pic={item.pic}
				/>
			))}
        </View>
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: 'black'
  },
  text: {
    fontSize: 20,
  },
});

export default FollowersScreen;