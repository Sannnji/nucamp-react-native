import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

import { getCampsites } from "../redux/features/campsites/campsitesSlice";
import { getPartners } from "../redux/features/partners/partnersSlice";
import { getPromotions } from "../redux/features/promotions/promotionsSlice";

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
  const dispatch = useDispatch();
  const { campsites } = useSelector((state) => state.campsites);
  const { partners } = useSelector((state) => state.partners);
  const { promotions } = useSelector((state) => state.promotions);

  useEffect(() => {
    dispatch(getCampsites());
    dispatch(getPartners());
    dispatch(getPromotions());
  }, []);

  return (
    <ScrollView>
      <RenderItem item={campsites.filter((campsite) => campsite.featured)[0]} />
      <RenderItem
        item={promotions.filter((promotion) => promotion.featured)[0]}
      />
      <RenderItem item={partners.filter((partner) => partner.featured)[0]} />
    </ScrollView>
  );
};

export default Home;
