import React, { useState, useEffect } from "react";
import { FlatList, StatusBar } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

import { baseUrl } from "../shared/baseUrl";
import { getCampsites } from "../redux/features/campsites/campsitesSlice";
import { Tile } from "react-native-elements/dist/tile/Tile";
import { SafeAreaView } from "react-native";

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
      <Tile
        featured
        imageSrc={{ uri: baseUrl + item.image }}
        title={item.name}
        caption={item.description}
        onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
        containerStyle={{ marginTop: 20 }}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={campsites}
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

export default Directory;
