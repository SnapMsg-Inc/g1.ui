import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostsScreen from './postsScreen';
import RepliesScreen from './repliesScreen';
import LikesScreen from './likesScreen';

const Tab = createMaterialTopTabNavigator();

export default ProfileTabs = () => {
  return (
    <Tab.Navigator 
        style={{minHeight:'100%'}}
        
        screenOptions={() => ({
          tabBarStyle: {
            backgroundColor: '#000000',
          },
          tabBarLabelStyle: {
            fontSize: 16,
            textTransform: 'none',
          },
          tabBarInactiveTintColor: '#687684',
          tabBarActiveTintColor: '#1ed760',
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: '#1ed760',
          },
        })}
    >
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Replies" component={RepliesScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
    </Tab.Navigator>
  );
};
