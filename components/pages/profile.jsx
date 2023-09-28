import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileTabs from '../profileComponents/profileNavigation/profileTabs';
import ProfileHeader from '../profileComponents/profileHeader';
import ProfileInfo from '../profileComponents/profileInfo';

const HEADER_HEIGHT_EXPANDED = 75;
const HEADER_HEIGHT_NARROWED = 50;

export default function Profile({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
        <View style={styles.container}>   
            {/*Header */}
            <ProfileHeader scrollY={scrollY} navigation={navigation}/>

            {/* Profile Info / Nav Bar */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                [
                    {
                    nativeEvent: {
                        contentOffset: { y: scrollY },
                    },
                    },
                ],
                { useNativeDriver: true }
                )}
                style={{
                zIndex: 3,
                marginTop: HEADER_HEIGHT_NARROWED,
                paddingTop: HEADER_HEIGHT_EXPANDED,
                }}
            >
                <ProfileInfo scrollY={scrollY}/>
                <ProfileTabs/>
            </Animated.ScrollView>
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
});