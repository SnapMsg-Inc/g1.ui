import { Text, View } from "react-native";
import stylesSeparate from "../../styles/forms/separate";


function Separate() {    
    return (
        <View style={stylesSeparate.lineContainer}>
            <View style={stylesSeparate.dash} />
            <Text style={stylesSeparate.text}>or</Text>
            <View style={stylesSeparate.dash} />
        </View>
    )

}

export default Separate
