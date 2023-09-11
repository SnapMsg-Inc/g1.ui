import React from "react";
import { StatusBar } from "expo-status-bar";
import {View, Text} from "react-native"
import styles from "../styles/inits";

function Inits() {
    return (
        <>
            <View style={styles.statusBar}>
                <StatusBar style="auto" />
            </View>
            <View style={styles.container}>
                <Text style={styles.font}>SnapMsg!</Text>
            </View>
        </>
    )
}

export default Inits
