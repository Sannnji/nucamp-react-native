import React, { useEffect } from "react";
import { View, Platform, ToastAndroid, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";

import MyDrawer from "./navigators/drawer/MyDrawer";

const Main = () => {
  useEffect(() => {
    showNetInfo();

    NetInfo.addEventListener((connectionInfo) => {
      handleConnectivityChange(connectionInfo);
    });
  }, []);

  async function showNetInfo() {
    await NetInfo.fetch().then((connectionInfo) => {
      Platform.OS === "ios"
        ? Alert.alert("Initial Network Connectivity Type:", connectionInfo.type)
        : ToastAndroid.show(
            "Initial Network Connectivity Type: " + connectionInfo.type,
            ToastAndroid.LONG
          );
    });
  }

  const handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = "You are now connected to an active network.";
    switch (connectionInfo.type) {
      case "none":
        connectionMsg = "No network connection is active.";
        break;
      case "unknown":
        connectionMsg = "The network connection state is now unknown.";
        break;
      case "cellular":
        connectionMsg = "You are now connected to a cellular network.";
        break;
      case "wifi":
        connectionMsg = "You are now connected to a WiFi network.";
        break;
    }
    Platform.OS === "ios"
      ? Alert.alert("Connection change:", connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </View>
  );
};

export default Main;
