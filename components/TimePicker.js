import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { GlobalStyles } from "../constants/styles";

const TimePicker = ({ label, iconName, IconPack, iconSize, error, time, setTime, id, onInuptChange }) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setTimePickerVisible(false);
    if (selectedTime) {
      setTime(selectedTime);
      onInuptChange(id, dayjs(selectedTime).format("HH:mm"), true); 
    }
  };

  // אם `time` לא מוגדר, נוודא שמחזור הזמן הוא עכשיו (שימוש ב-dayjs).
  const timeToShow = time ? new Date(time) : new Date();

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {IconPack && <IconPack style={styles.icon} name={iconName} size={iconSize || 24} />}
        <Pressable style={styles.input} onPress={() => setTimePickerVisible(true)}>
          {dayjs(timeToShow).format("HH:mm") === dayjs(new Date()).format("HH:mm") ? (
            <Text style={styles.inputText}>Select Time</Text>
          ) : (
            <Text style={styles.inputText}>{dayjs(timeToShow).format("HH:mm")}</Text>
          )}
        </Pressable>

        {isTimePickerVisible && (
          <DateTimePicker
            value={timeToShow}  // יש להעביר את הזמן כערך תקני
            mode="time"
            display="default"
            onChange={handleTimeChange}
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

export default TimePicker;
