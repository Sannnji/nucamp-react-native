import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { Card, Icon, Rating } from "react-native-elements";

import { useDispatch, useSelector } from "react-redux";

import { baseUrl } from "../shared/baseUrl";
import { getCampsites } from "../redux/features/campsites/campsitesSlice";
import { getComments } from "../redux/features/comments/commentsSlice";
import { setFavorite } from "../redux/features/favorites/favoriteSlice";
import { getFavorites } from "../redux/features/favorites/favoriteSlice";
import ReviewForm from "./ReviewForm";

function RenderCampsite(props) {
  if (props.campsite && props.favorite) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image
          source={{ uri: baseUrl + props.campsite.image }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Card.FeaturedTitle>{props.campsite.name}</Card.FeaturedTitle>
        </Card.Image>
        <Text style={{ marginTop: 20, textAlign: "center" }}>
          {props.campsite.description}
        </Text>
        <View style={styles.buttonRow}>
          <Icon
            name={props.favorite.isFavorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#F50"
            raised
            reverse
            onPress={() => props.markFavorite()}
          />
          <ReviewForm selectedCampsite={props.campsite.id} />
        </View>
      </Card>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          style={{ alignItems: "left", marginTop: 10, marginBottom: 10 }}
          readonly
          imageSize={10}
          startingValue={item.rating}
        />
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

function CampsiteInfo({ route }) {
  const { campsiteId } = route.params;

  const { comments } = useSelector((state) => state.comments);
  const { campsites } = useSelector((state) => state.campsites);
  const { favorites } = useSelector((state) => state.favorites);

  const campsite = campsites.filter(
    (campsite) => campsite.id === campsiteId
  )[0];

  const comment = comments.filter(
    (comment) => comment.campsiteId === campsiteId
  );

  const favorite = favorites.filter(
    (favorite) => favorite.campsiteId === campsiteId
  )[0];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
    dispatch(getCampsites());
    dispatch(getFavorites());
  }, [dispatch]);

  function markFavorite() {
    dispatch(
      setFavorite({
        id: campsiteId,
        isFavorite: !favorite.isFavorite,
      }),
    );
  }

  return (
    <ScrollView>
      <RenderCampsite
        campsite={campsite}
        favorite={favorite}
        markFavorite={() => markFavorite()}
      />
      <RenderComments comments={comment} />
    </ScrollView>
  );
}

export default CampsiteInfo;

const styles = StyleSheet.create({
  buttonRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
});
