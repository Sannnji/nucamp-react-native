import React, { useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

import { CAMPSITES } from "../shared/campsites";

function RenderCampsite({ campsite }) {
  if (campsite) {
    return (
      <Card>
        <Card.Image source={require("../assets/images/react-lake.jpg")} />
        <Card.Title>{campsite.name}</Card.Title>
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
      </Card>
    );
  }
  return <View />;
}

function CampsiteInfo({route}) {
  const [data, setData] = useState({
    campsites: CAMPSITES,
    selectedCampsite: null,
  });

  const navigationOptions = {
    title: "Campsite Information",
  };


  const { campsiteId } = route.params;
  const campsite = data.campsites.filter(
    (campsite) => campsite.id === campsiteId
  )[0];

  return <RenderCampsite campsite={campsite} />;
}

export default CampsiteInfo;
