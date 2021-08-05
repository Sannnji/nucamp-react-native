import React, { useState, Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Switch, Slider } from "react-native-elements";

import DateTimePickerModal from "react-native-modal-datetime-picker";

class ReservationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible: false,
      campers: 1,
      hikeIn: false,
      showCalendar: false,
    };
  }
        
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  }

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
  };

  handleSubmit = () => {
    console.warn(this.state);
  };
  


  render() {

    return (
      <ScrollView>
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
        <Button onPress={() => this.handleSubmit()} title="Search" style={{width: "50%", alignSelf:"center"}} />
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
