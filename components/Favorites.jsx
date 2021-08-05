import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { ListItem, Avatar, Text } from "react-native-elements";
import { SwipeRow } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useSelector, useDispatch } from "react-redux";

import { getCampsites } from "../redux/features/campsites/campsitesSlice";
import { setFavCampsite } from "../redux/features/campsites/campsitesSlice";
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

  const handleDelete = ({ item }) => {
    return dispatch(
      setFavCampsite({
        id: item.id,
        isFavorite: !item.isFavorite,
      })
    );
  };

  const RenderFavorites = ({ item }) => {
    return (
      <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
        <View style={styles.deleteView}>
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() => {
              Alert.alert(
                "Delete Favorite?",
                "Are you sure you wish to delete the favorite campsite " +
                  item.name +
                  "?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log(item.name + "Not Deleted"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => handleDelete({ item }),
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View>
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
        </View>
      </SwipeRow>
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

const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    width: 100,
  },
});
