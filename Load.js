import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import { StatusBar } from "expo-status-bar";

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#BB2CD9" />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
