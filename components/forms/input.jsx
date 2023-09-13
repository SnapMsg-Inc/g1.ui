import { TextInput, View } from "react-native";
import styleInput,{ colorText }  from "../../styles/forms/input";

const Input = props => {
    return (
        <View>
            <TextInput 
                {...props}
                style={styleInput.input}
                placeholderTextColor={colorText}
            />
        </View>
    )
}

export default Input
