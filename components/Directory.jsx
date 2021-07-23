import React, { useState } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { CAMPSITES } from "../shared/campsites";

function Directory(props) {
  const [data, setData] = useState({
    campsites: CAMPSITES,
    selectedCampsite: null,
  });

  const navigationOptions = {
    title: "Directory",
  };

  const { navigate } = props.navigation;
  const renderDirectoryItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
      >
        <Avatar rounded source={require("../assets/images/react-lake.jpg")} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <FlatList
      data={data.campsites}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default Directory;
