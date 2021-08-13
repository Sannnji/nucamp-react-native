import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import Login from "../../../pages/Login";
import Register from "../../../pages/Register";

const Tab = createBottomTabNavigator();

const MyBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Login") {
            iconName = "sign-in";
          } else if (route.name === "Register") {
            iconName = "user-plus";
          }

          return <Icon name={iconName} type="font-awesome" />;
        },
      })}
    >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
};

export default MyBottomTab;
