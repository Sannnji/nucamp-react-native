import React, { useState } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";

import Directory from "./Directory";
import CampsiteInfo from "./CampsiteInfo";
import Home from "./Home";

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
      <DirectoryNavigator.Screen name="CampsiteInfo" component={CampsiteInfo} />
    </DirectoryNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerStyle={{ backgroundColor: "#CEC8FF" }}>
      <Drawer.Screen name="MyStack" component={MyStack} />
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
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
        <MyDrawer />
      </NavigationContainer>
    </View>
  );
};

export default Main;
