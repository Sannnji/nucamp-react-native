import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

import { getCampsites } from "../redux/features/campsites/campsitesSlice";
import { baseUrl } from "../shared/baseUrl";

const Favorites = (props) => {
  const { navigate } = props.navigation;
  const dispatch = useDispatch();

  const { campsites } = useSelector((state) => state.campsites);

  const favCampsites = campsites.filter(
    (campsite) => campsite.isFavorite == true
  );

  useEffect(() => {
    dispatch(getCampsites());
  });

  const RenderFavorites = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
      >
        <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      data={favCampsites}
      renderItem={RenderFavorites}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default Favorites;
