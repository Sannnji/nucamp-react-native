import React, { useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";

import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";

function RenderCampsite(props) {

  if (props.campsite) {
    return (
      <Card>
        <Card.Image source={require("../assets/images/react-lake.jpg")} />
        <Card.Title>{props.campsite.name}</Card.Title>
        <Text style={{ margin: 10 }}>{props.campsite.description}</Text>
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
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
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
  const [data, setData] = useState({
    campsites: CAMPSITES,
    comments: COMMENTS,
    favorite: false,
  });

  function markFavorite() {
    setData({
      campsites: CAMPSITES,
      comments: COMMENTS,
      favorite: true,
    });
  }

  const { campsiteId } = route.params;
  const campsite = data.campsites.filter(
    (campsite) => campsite.id === campsiteId
  )[0];

  const comments = data.comments.filter(
    (comment) => comment.campsiteId === campsiteId
  );

  return (
    <ScrollView>
      <RenderCampsite
        campsite={campsite}
        favorite={data.favorite}
        markFavorite={() => markFavorite()}
      />
      <RenderComments comments={comments} />
    </ScrollView>
  );
}

export default CampsiteInfo;
