import React from "react";
import { View, Text, TouchableHighlight, StatusBar, SafeAreaView } from "react-native"
import styles from "../styles/inits";
import ButtonFederate from "./buttons/buttonFederate";

function Inits() {
    return (
        <>         
            <View style={styles.containerLogo}>
                <Text style={styles.fontLogo}>SnapMsg</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.font}>
                    Welcome back! 
                    Log in to see
                    the latest
                </Text>
            </View>
            <View style={styles.containerBtn}>
                <ButtonFederate name="Google"/>
                <ButtonFederate name="Github"/>
                <View style={styles.lineContainer}>
                    <View style={styles.dash} />
                    <Text style={styles.text}>or</Text>
                    <View style={styles.dash} />
                </View>
                <TouchableHighlight>
                    <View style={styles.btnSignUp}>
                        <Text style={styles.fontSignUp}>
                            Sign up
                        </Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.fontSugestion}>
                    Have an account already?
                </Text>
                <TouchableHighlight>
                    <View style={styles.btnSignIn}>
                        <Text style={styles.fontSignIn}>
                            Sign in
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </>
    )
}

export default Inits
