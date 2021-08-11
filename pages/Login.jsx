import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleLogin = () => {
    console.log(JSON.stringify(data));

    if (data.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: data.username,
          password: data.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(value) =>
          setData({
            username: value,
            password: data.password,
            remember: data.remember,
          })
        }
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(value) =>
          setData({
            username: data.username,
            password: value,
            remember: data.remember,
          })
        }
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title="Remember Me"
        center
        checked={data.remember}
        onPress={() =>
          setData({
            username: data.username,
            password: data.password,
            remember: !data.remember,
          })
        }
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button
          title="Login"
          color="#5637DD"
          onPress={() => {
            handleLogin();
            getValueFor("userinfo");
          }}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 40,
  },
});
