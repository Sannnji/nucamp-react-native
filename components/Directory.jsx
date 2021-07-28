import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

import { getCampsites } from "../redux/features/campsites/campsitesSlice";

function Directory(props) {
  const dispatch = useDispatch();
  const { campsites } = useSelector((state) => state.campsites);

  useEffect(() => {
    dispatch(getCampsites());
  });

  const [data, setData] = useState({
    selectedCampsite: null,
  });

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
      data={campsites}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default Directory;
