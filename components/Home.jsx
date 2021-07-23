import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";

import { CAMPSITES } from "../shared/campsites";
import { PROMOTIONS } from "../shared/promotions";
import { PARTNERS } from "../shared/partners";

const RenderItem = ({ item }) => {
  if (item) {
    return (
      <Card>
        <Card.Image source={require(`../assets/images/react-lake.jpg`)} />
        <Card.Title>{item.name}</Card.Title>
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
};

const Home = () => {
  const [data, useData] = useState({
    campsites: CAMPSITES,
    promotions: PROMOTIONS,
    partners: PARTNERS,
  });

  const navigationOptions = {
    title: "Home",
  };

  return (
    <ScrollView>
      <RenderItem
        item={data.campsites.filter((campsite) => campsite.featured)[0]}
      />
         <RenderItem
        item={data.promotions.filter((promotion) => promotion.featured)[0]}
      />
         <RenderItem
        item={data.partners.filter((partner) => partner.featured)[0]}
      />
    </ScrollView>
  );
};

export default Home;
