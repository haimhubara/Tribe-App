import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { GlobalStyles } from "../constants/styles";

const DatePicker = ({ label, iconName, IconPack, iconSize, error, date, setDate, id, onInuptChange }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setDate(selectedDate);
      onInuptChange(id, dayjs(selectedDate).format("YYYY-MM-DD"), true); 
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {IconPack && <IconPack style={styles.icon} name={iconName} size={iconSize || 24} />}
        <Pressable style={styles.input} onPress={() => setDatePickerVisible(true)}>
        {dayjs(date).format("YYYY-MM-DD") === dayjs(new Date()).format("YYYY-MM-DD") ? (
        <Text style={styles.inputText}>Select Date</Text>
      ) : (
        <Text style={styles.inputText}>{dayjs(date).format("YYYY-MM-DD")}</Text>
      )}


        </Pressable>

        {isDatePickerVisible && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onInuptChange? handleDateChange :
               ()=> {
                setDatePickerVisible(false); 
                setDate(date);
              }}
          />
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    color: GlobalStyles.colors.textColor,
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: GlobalStyles.colors.textColor,
  },
  input: {
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  inputText: {
    color: GlobalStyles.colors.textColor,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});

export default DatePicker;
