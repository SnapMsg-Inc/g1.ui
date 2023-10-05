import styleInput,{ colorText }  from "../../styles/forms/input";
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function Input({
        label,
        icon,
        inputType,
        keyboardType,
        fieldButtonLabel,
        fieldButtonFunction,
        data,
        setData,
        error
    }) {
        return (
            <View style={styleInput.input}>
                <TextInput
                    value={data}
                    onChangeText={setData}
                    placeholder={label}
                    placeholderTextColor={colorText}  
                    keyboardType={keyboardType}
                    style={styleInput.textInput}
                    secureTextEntry={inputType}
                />
                {icon}
                {/* Renderizar el mensaje de error debajo del TextInput */}
                {error && <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>}
            </View>
        );
    }

