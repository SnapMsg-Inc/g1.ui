import {React, useState} from "react";
import { StatusBar } from "expo-status-bar";
import {View, Text, TouchableHighlight, Button} from "react-native"
import styles from "../styles/inits";

function Inits() {
    const [hidden, setHidden] = useState(false)
    const Separator = () => <View style={styles.separator} />;

    return (
        <>
            <View style={styles.containerLogo}>
                <Text style={styles.fontLogo}>SnapMsg</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.font}>
                    Welcome back! 
                    Log in to see
                    the latest.
                </Text>
            </View>
            <View style={styles.containerBtn}>
                <TouchableHighlight>
                    <View style={styles.btn}>
                        <Text style={styles.fontBtn}>
                            Sign in with Google
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.btn}>
                        <Text style={styles.fontBtn}>
                            Sign in with Github
                        </Text>
                    </View>
                </TouchableHighlight>
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
                <View>
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
            </View>
        </>
    )
}

export default Inits
