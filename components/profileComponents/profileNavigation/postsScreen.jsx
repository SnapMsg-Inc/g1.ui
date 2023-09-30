import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import SnapMsg from '../../SnapMsg';

function generateSnaps(limit) {
  return new Array(limit).fill(0).map((_, index) => {
    const repetitions = Math.floor(Math.random() * 4) + 1;

    return {
      key: index.toString(),
      content: 'Lorem ipsum dolor ametLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus '.repeat(repetitions),
      nickname: 'Nickname',
      username: 'username',
      profilePictureUri: 'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp',
      date: '18/06/2023',
      comments: 4,
      reposts: 18,
      likes: 12,
    };
  });
}

const MOCKED_SNAPS = generateSnaps(30);
  

const PostsScreen = () => {
  return (
    <Tabs.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        {MOCKED_SNAPS.map((item, index) => (
            <SnapMsg
              key={item.key}
              nickname={item.nickname}
              username={item.username}
              content={item.content}
              profilePictureUri={item.profilePictureUri}
              date={item.date}
              comments={item.comments}
              reposts={item.reposts}
              likes={item.likes}
            />
          ))}
        </View>
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
});

export default PostsScreen;