import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

function Loading() {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color="#5637dd" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#5637dd",
    fontSize: 14,
    fontWeight: "bold",
  },
});
