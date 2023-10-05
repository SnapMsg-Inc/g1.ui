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
        <View>
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
            </View>
                {/* Renderizar el mensaje de error debajo del TextInput */}
            <View>
                {error && <Text style={{ color: 'green', alignItems: "flex-end" }}>{error}</Text>}
            </View>
                {/* Renderizar el botón debajo del TextInput */}
        </View>
        );
    }

