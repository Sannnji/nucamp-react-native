import React from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

function Directory(props) {
  
  const renderDirectoryItem = ({ item }) => {
    return (
      <ListItem bottomDivider onPress={() => props.onPress(item.id)}>
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
      data={props.campsites}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default Directory;
