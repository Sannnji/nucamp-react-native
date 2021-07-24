import React, { useState } from "react";
import { SectionList } from "react-native";
import { ScrollView, FlatList, View } from "react-native";
import { Text, Card, ListItem, Avatar } from "react-native-elements";
import { PARTNERS } from "../shared/partners";

const Mission = () => {
  return (
    <Card wrapperStyle={{ margin: 10 }}>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
};

const renderPartners = ({ item }) => {
  return (
    <ListItem>
      <Avatar rounded source={require("../assets/images/bootstrap-logo.png")} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const About = () => {
  const [data, useData] = useState({
    partners: PARTNERS,
  });

  return (
    <ScrollView>
      <Mission />
      <Card wrapperStyle={{ margin: 10 }}>
        <Card.Title>Community Partners</Card.Title>
        <Card.Divider />
        <FlatList
          data={data.partners}
          renderItem={renderPartners}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </ScrollView>
  );
};

export default About;
