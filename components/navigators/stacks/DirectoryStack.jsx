import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Directory from "../../../pages/Directory";
import CampsiteInfo from "../../../pages/CampsiteInfo";

export const DirectoryNavigator = createStackNavigator();

const DirectoryStack = () => {
  return (
    <DirectoryNavigator.Navigator
      initialRouteName="Directory"
      screenOptions={{ gestureEnabled: false }}
    >
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

export default DirectoryStack;
