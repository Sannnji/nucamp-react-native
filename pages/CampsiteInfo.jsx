import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  PanResponder,
  Alert,
  Share,
} from "react-native";
import { Card, Icon, Rating, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

import { baseUrl } from "../shared/baseUrl";
import {
  getCampsites,
  setFavCampsite,
} from "../redux/features/campsites/campsitesSlice";
import { getComments } from "../redux/features/comments/commentsSlice";
import ReviewForm from "../components/ReviewForm";

const shareCampsite = (title, message, url) => {
  Share.share(
    {
      title: title,
      message: `${title}: ${message} ${url}`,
      url: url,
    },
    {
      dialogTitle: "Share " + title,
    }
  );
};

function RenderCampsite(props) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const { campsite } = props;

  const view = React.createRef();

  const favoriteDrag = ({ dx }) => (dx < -200 ? true : false);
  const reviewDrag = ({ dx }) => (dx > 200 ? true : false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder has ended", gestureState);
      if (reviewDrag(gestureState)) {
        toggleOverlay();
      }
      if (favoriteDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add" + campsite.name + " to favorites?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.isFavorite
                  ? console.log("unSetting favorite")
                  : console.log("setting favorite"),
            },
          ],
          { cancelable: false }
        );
      }
      return true;
    },
  });

  if (props.campsite) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card containerStyle={{ padding: 0 }}>
          <Card.Image
            source={{ uri: baseUrl + campsite.image }}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Card.FeaturedTitle>{campsite.name}</Card.FeaturedTitle>
          </Card.Image>
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            {campsite.description}
          </Text>
          <View style={styles.buttonRow}>
            <Icon
              name={campsite.isFavorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#F50"
              raised
              reverse
              onPress={() => props.markFavorite()}
            />
            <ReviewForm
              selectedCampsite={campsite.id}
              toggleOverlay={toggleOverlay}
              isVisible={visible}
            />
            <Icon
              name="share"
              type="font-awesome"
              color="#5637DD"
              rraised
              reverse
              onPress={() => {
                shareCampsite(
                  campsite.name,
                  campsite.description,
                  baseUrl + campsite.image
                );
              }}
            />
          </View>
        </Card>
      </Animatable.View>
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
    <Animatable.View animation="fadeInDown" duration={2000} delay={2000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

function CampsiteInfo({ route }) {
  const { campsiteId } = route.params;

  const { comments } = useSelector((state) => state.comments);
  const { campsites } = useSelector((state) => state.campsites);

  const campsite = campsites.filter(
    (campsite) => campsite.id === campsiteId
  )[0];

  const comment = comments.filter(
    (comment) => comment.campsiteId === campsiteId
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
    dispatch(getCampsites());
  }, [dispatch]);

  function markFavorite() {
    dispatch(
      setFavCampsite({
        id: campsiteId,
        isFavorite: !campsite.isFavorite,
      })
    );
  }

  return (
    <ScrollView>
      <RenderCampsite campsite={campsite} markFavorite={() => markFavorite()} />
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
