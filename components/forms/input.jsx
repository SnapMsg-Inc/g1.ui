import { TextInput } from "react-native";
import styleInput from "../../styles/forms/input";

function Input({holder, secure, state, value}) {
    return (
        <TextInput
            placeholderTextColor='#535353'
            style={styleInput.input}
            placeholder={holder}
            onChangeText={state}
            value={value}
            secureTextEntry={secure}
        />
    )
}

export default Input
