import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

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

function CampsiteInfo(props) {
  return <RenderCampsite campsite={props.campsite} />;
}

export default CampsiteInfo;
