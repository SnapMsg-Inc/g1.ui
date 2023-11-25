import { Octicons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import stylesPost from '../../styles/buttons/buttonPost';
import { Pressable } from 'react-native';
import { colorWhite } from '../../styles/appColors/appColors';

function NewMessageButton({ onPress }) {  
    return (
        <Pressable
            style={stylesPost.floatingButton}
            onPress={onPress}
        >
            <Entypo name="new-message" size={24} color={colorWhite}/>
        </Pressable>
    );
  }
  
  export default NewMessageButton;