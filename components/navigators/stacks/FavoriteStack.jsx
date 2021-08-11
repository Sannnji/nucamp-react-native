import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { DirectoryNavigator } from "./DirectoryStack";
import CampsiteInfo from "../../../pages/CampsiteInfo";
import Favorites from "../../../pages/Favorites";

const FavoritesNavigator = createStackNavigator();

const FavoriteStack = () => {
  return (
    <FavoritesNavigator.Navigator initialRouteName="Favorites">
      <FavoritesNavigator.Screen
        name="Favorites"
        component={Favorites}
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
    </FavoritesNavigator.Navigator>
  );
};

export default FavoriteStack;
