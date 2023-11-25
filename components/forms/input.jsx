import styleInput from "../../styles/forms/input";
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { colorText } from "../../styles/appColors/appColors";

export default function Input({
        label,
        icon,
        inputType,
        keyboardType,
        data,
        setData,
        error,
        numberOfLines=1,
        multiline=false
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
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                    />
                    {icon}
                </View>
                {error && <Text style={styleInput.inputError}>{error}</Text>}
            </View>
        );
    }

