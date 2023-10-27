import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import stylesPost from '../../styles/buttons/buttonPost';
import { Pressable } from 'react-native';

function PostButton({ onPress }) {  
    return (
        <Pressable
            style={stylesPost.floatingButton}
            onPress={onPress}
        >
            <Octicons name="plus" size={24} color={"white"} />
        </Pressable>
    );
  }
  
  export default PostButton;