import React from "react";
import { View, Platform } from "react-native";
import { Icon, Image, Text } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Constants from "expo-constants";

import Directory from "./Directory";
import CampsiteInfo from "./CampsiteInfo";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import { StyleSheet } from "react-native";

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

const customDrawerContent = ({ props, ...rest }) => {
  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>NuCamp</Text>
        </View>
      </View>
      <DrawerItemList {...rest} />
    </DrawerContentScrollView>
  );
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: "#CEC8FF" }}
      drawerContent={customDrawerContent}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: "Home",
          drawerIcon: () => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.drawerIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Directory"
        component={MyStack}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.drawerIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          headerTitle: "About",
          drawerIcon: () => (
            <Icon
              name="info-circle"
              type="font-awesome"
              iconStyle={styles.drawerIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: true,
          headerTitle: "Contact",
          drawerIcon: () => (
            <Icon
              name="address-card"
              type="font-awesome"
              iconStyle={styles.drawerIcon}
            />
          ),
        }}
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

const styles = StyleSheet.create({
  drawerIcon: {
    textAlign: "center",
    fontSize: 20,
    width: 24,
  },
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#5637DD",
    marginTop: -4,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
