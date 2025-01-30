import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

const DatePicker = ({ date, setDate, title }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{title}:</Text>
      <Pressable style={styles.input} onPress={() => setDatePickerVisible(true)}>
        <Text style={styles.inputText}>{dayjs(date).format("YYYY-MM-DD")}</Text>
      </Pressable>

      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
});

export default DatePicker;