import React, { useState } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Constants from "expo-constants";

import { CAMPSITES } from "../shared/campsites";
import Directory from "./Directory";
import CampsiteInfo from "./CampsiteInfo";

const Main = () => {
  const [data, setData] = useState({
    campsites: CAMPSITES,
    selectedCampsite: null,
  });

  const onCampsiteSelect = (campsiteId) => {
    setData({ campsites: CAMPSITES, selectedCampsite: campsiteId });
  };

  return (
    <View style={{ flex: 1 }}>
      <Directory
        campsites={data.campsites}
        onPress={(campsiteId) => onCampsiteSelect(campsiteId)}
      />
      <CampsiteInfo
        campsite={
          data.campsites.filter(
            (campsite) => campsite.id === data.selectedCampsite
          )[0]
        }
      />
    </View>
  );
};

export default Main;
