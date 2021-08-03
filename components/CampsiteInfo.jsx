import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { Card, Icon, Rating } from "react-native-elements";

import { useDispatch, useSelector } from "react-redux";

import { getCampsites } from "../redux/features/campsites/campsitesSlice";
import { getComments } from "../redux/features/comments/commentsSlice";
import ReviewForm from "./ReviewForm";

function RenderCampsite(props) {
  if (props.campsite) {
    return (
      <Card>
        <Card.Image source={require("../assets/images/react-lake.jpg")} />
        <Card.Title>{props.campsite.name}</Card.Title>
        <Text style={{ margin: 10 }}>{props.campsite.description}</Text>
        <View style={styles.buttonRow}>
          <Icon
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#F50"
            raised
            reverse
            onPress={() =>
              props.favorite
                ? console.log("Already set as favorite")
                : props.markFavorite()
            }
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
          readOnly
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
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comments);
  const { campsites } = useSelector((state) => state.campsites);

  useEffect(() => {
    dispatch(getComments());
    dispatch(getCampsites());
  }, [dispatch]);

  const [data, setData] = useState({
    favorite: false,
  });

  function markFavorite() {
    setData({
      favorite: true,
    });
  }

  const { campsiteId } = route.params;
  const campsite = campsites.filter(
    (campsite) => campsite.id === campsiteId
  )[0];

  const comment = comments.filter(
    (comment) => comment.campsiteId === campsiteId
  );

  return (
    <ScrollView>
      <RenderCampsite
        campsite={campsite}
        favorite={data.favorite}
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
