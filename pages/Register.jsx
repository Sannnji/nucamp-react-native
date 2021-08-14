import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as SecureStore from "expo-secure-store";
import * as ImageManipulator from "expo-image-manipulator";

import { baseUrl } from "../shared/baseUrl";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

const Register = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    image: baseUrl + "images/logo.png",
  });

  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);

    if (cameraPermission.status === "granted") {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        processImage(capturedImage.uri);
      }
    }
  };

  const getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );

    if (cameraRollPermission.status === "granted") {
      const galleryImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!galleryImage.cancelled) {
        processImage(galleryImage.uri);
      }
    }
  };

  const processImage = async (imageUrl) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      imageUrl,
      [
        { resize: { height: 400, width: 400 } },
        // { crop: { originX: 400, originY: 400, height: 400, width: 400 } },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    console.log(manipResult);
    setData((...prevData) => {
      return {
        ...prevData,
        image: manipResult.uri,
      };
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.image }}
            loadingIndicatorSource={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <Button title="Camera" onPress={getImageFromCamera} />
          <Button title="Gallery" onPress={getImageFromGallery} />
        </View>

        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(value) =>
            setData((prevData) => {
              return { ...prevData, username: value };
            })
          }
          value={data.username}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(value) =>
            setData((prevData) => {
              return { ...prevData, password: value };
            })
          }
          value={data.password}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="First Name"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(value) =>
            setData((prevData) => {
              return { ...prevData, firstname: value };
            })
          }
          value={data.firstname}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Last Name"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(value) =>
            setData((prevData) => {
              return { ...prevData, lastname: value };
            })
          }
          value={data.lastName}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope-o" }}
          onChangeText={(value) =>
            setData((prevData) => {
              return { ...prevData, email: value };
            })
          }
          value={data.email}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />

        <View style={styles.formButton}>
          <Button
            title="Register"
            color="#5637DD"
            onPress={() => {
              handleRegister();
              getValueFor("userRegistrationInfo");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 8,
  },
  formButton: {
    margin: 20,
    marginRight: 40,
    marginLeft: 40,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
});
