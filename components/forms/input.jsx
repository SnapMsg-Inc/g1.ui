import styleInput,{ colorText }  from "../../styles/forms/input";
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function Input({
        label,
        icon,
        inputType,
        keyboardType,
        fieldButtonLabel,
        fieldButtonFunction,
    }) {

    return (
        <View style={styleInput.input}>
            <TextInput
                placeholder={label}
                placeholderTextColor={colorText}
                keyboardType={keyboardType}
                style={styleInput.textInput}
                secureTextEntry={inputType}
            />
            {icon}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}

