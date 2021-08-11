import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Overlay,
  Icon,
  Rating,
  Input,
  Button,
} from "react-native-elements";

import { useDispatch } from "react-redux";
import { addComment } from "../redux/features/comments/commentsSlice";

const ReviewOverlay = (props) => {
  const dispatch = useDispatch();

  
  const [comment, setComment] = useState({
    campsiteId: props.selectedCampsite,
    rating: "5",
    author: "",
    text: "",
    date: "",
  });

  const handleSubmit = () => {
    dispatch(
      addComment({
        campsiteId: comment.campsiteId,
        rating: comment.rating,
        author: comment.author,
        text: comment.text,
        date: new Date().toISOString(),
      })
    );
    props.toggleOverlay();
  };

  return (
    <View>
      <Icon
        name={"pencil"}
        type="font-awesome"
        color="#5637DD"
        raised
        reverse
        onPress={props.toggleOverlay}
      />

      <Overlay
        isVisible={props.isVisible}
        onBackdropPress={props.toggleOverlay}
        overlayStyle={{ width: "95%" }}
      >
        <View style={styles.overlay}>
          <Rating
            showRating
            startingValue="5"
            onFinishRating={(value) =>
              setComment({
                campsiteId: comment.campsiteId,
                rating: value,
                author: comment.author,
                text: comment.text,
              })
            }
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(value) =>
              setComment({
                campsiteId: comment.campsiteId,
                rating: comment.rating,
                author: value,
                text: comment.text,
              })
            }
          />
          <Input
            placeholder="Review"
            leftIcon={{ type: "font-awesome", name: "comment-o" }}
            onChangeText={(value) =>
              setComment({
                campsiteId: comment.campsiteId,
                rating: comment.rating,
                author: comment.author,
                text: value,
              })
            }
          />
          <Button
            title="SUBMIT"
            onPress={() => {
              //   console.log(comment);
              handleSubmit();
            }}
          />
          <Button title="CANCEL" onPress={props.toggleOverlay} />
        </View>
      </Overlay>
    </View>
  );
};

export default ReviewOverlay;

const styles = StyleSheet.create({
  overlay: {
    margin: 10,
  },
});
