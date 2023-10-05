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
            <View style={styleInput.container}>
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
                {error && <Text style={styleInput.inputError}>{error}</Text>}
            </View>
        );
    }

