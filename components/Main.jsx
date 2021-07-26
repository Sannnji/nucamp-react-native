import React, { useState } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";

import Directory from "./Directory";
import CampsiteInfo from "./CampsiteInfo";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";

const DirectoryNavigator = createStackNavigator();

const MyStack = () => {
  return (
    <DirectoryNavigator.Navigator initialRouteName="Directory">
      <DirectoryNavigator.Screen
        name="Directory"
        component={Directory}
        options={{
          headerShown: false,
        }}
      />
      <DirectoryNavigator.Screen
        name="CampsiteInfo"
        component={CampsiteInfo}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#301B3F" },
        }}
      />
    </DirectoryNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerStyle={{ backgroundColor: "#CEC8FF" }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true, headerTitle: "Home" }}
      />
      <Drawer.Screen
        name="Directory"
        component={MyStack}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: true, headerTitle: "Contact" }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{ headerShown: true, headerTitle: "About" }}
      />
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
