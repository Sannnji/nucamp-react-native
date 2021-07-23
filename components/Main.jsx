import React, { useState } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";

import Directory from "./Directory";
import CampsiteInfo from "./CampsiteInfo";

const DirectoryNavigator = createStackNavigator();

const MyStack = () => {
  return (
    <DirectoryNavigator.Navigator initialRouteName="Directory">
      <DirectoryNavigator.Screen
        name="Directory"
        component={Directory}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
      />
      <DirectoryNavigator.Screen
        name="CampsiteInfo"
        component={CampsiteInfo}
      />
    </DirectoryNavigator.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </View>
  );
};

export default Main;
