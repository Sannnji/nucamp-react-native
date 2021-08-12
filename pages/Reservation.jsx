import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Text, Switch, Slider } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";

import DateTimePickerModal from "react-native-modal-datetime-picker";

class ReservationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campers: 1,
      hikeIn: false,
      date: "",
      showCalendar: false,
      isDatePickerVisible: false,
    };
  }

  resetForm = () => {
    this.setState({
      campers: 1,
      hikeIn: false,
      date: "",
    });
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", new Date(date).toDateString());
    this.state.date = `${new Date(date).toDateString()}`;
    this.hideDatePicker();
  };

  handleSubmit = () => {
    Alert.alert(
      "Begin Search?",
      `Number of Campers ${this.state.campers} \n Hike-in ${this.state.hikeIn} \n Date: ${this.state.date}`,
      [
        {
          text: "Cancel",
          onPress: () => resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          },
        },
      ]
    );
    console.warn(this.state);
  };

  async presentLocalNotification(date) {
    function sendNotification() {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
        }),
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Campsite Reservation Search",
          body: `Search for ${date} requested`,
        },
        trigger: null,
      });
    }

    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      sendNotification();
    }
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <View
            style={{
              flex: 1,
              alignItems: "stretch",
              justifyContent: "center",
              margin: 20,
            }}
          >
            <Text style={styles.formLabel}>Number of Campers</Text>
            <Slider
              value={this.state.campers}
              onValueChange={(value) => {
                this.setState({ campers: value });
              }}
              maximumValue={5}
              minimumValue={1}
              step={1}
              trackStyle={{ height: 10, backgroundColor: "transparent" }}
              thumbStyle={{ height: 30, width: 30, backgroundColor: "#5637DD" }}
            />
            <Text>Value: {this.state.campers}</Text>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Hike-In?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.hikeIn}
              trackColor={{ true: "#5637DD", false: null }}
              onValueChange={(value) => this.setState({ hikeIn: value })}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date</Text>
            <Button title="Select Date" onPress={this.showDatePicker} />
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
          </View>
          <Button
            onPress={() => this.handleSubmit()}
            title="Search"
            style={{ width: "50%", alignSelf: "center" }}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default ReservationForm;

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});
