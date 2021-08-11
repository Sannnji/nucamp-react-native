import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Image, Text } from "react-native-elements";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import FavoriteStack from "../stacks/FavoriteStack";
import DirectoryStack from "../stacks/DirectoryStack";
import Home from "../../../pages/Home";
import Contact from "../../../pages/Contact";
import About from "../../../pages/About";
import ReservationForm from "../../../pages/Reservation";

const Drawer = createDrawerNavigator();

const customDrawerContent = ({ props, ...rest }) => {
  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/images/logo.png")}
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
      initialRouteName="Home"
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
        component={DirectoryStack}
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
        name="Reservation"
        component={ReservationForm}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Icon
              name="tree"
              type="font-awesome"
              iconStyle={styles.drawerIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Favorites"
        component={FavoriteStack}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Icon
              name="heart"
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

export default MyDrawer;

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
