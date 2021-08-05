import React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

const renderFavorites = ({item}) => {
  return (
    <ListItem>
      <ListItem.Title>{item.Title}</ListItem.Title>
    </ListItem>
  );
};

const Favorites = () => {
  const dispatch = useDispatch();


  return (
    <FlatList
      data={campsites}
      renderItem={renderFavorites}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
