import React, { useState } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Constants from "expo-constants";

import Directory from "./Directory";
import CampsiteInfo from "./CampsiteInfo";

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    initialRouteName: "Directory",
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#5637DD" },
      headerTintColor: "#FFF",
      headerTitleStyle: { color: "#FFF" },
    },
  }
);

const AppNavigator = createAppContainer(DirectoryNavigator);

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <AppNavigator />
    </View>
  );
};

export default Main;
