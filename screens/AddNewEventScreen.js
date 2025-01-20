import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const AddNewEventScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [selectedNumPartitions, setSelectedNumPartitions] = useState();
  const [isPartitionsVisible, setPartitionsVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState();
  const [isGenderVisible, setGenderVisible] = useState(false);
  

  // const handleSignUp = async () => { ///////////////////////////////////////API ADD
  //   const apiKey = "YOUR_OPENAI_API_KEY";
  //   const url = "https://api.openai.com/v1/images/generations";

  //   try {
  //     const response = await axios.post(
  //       url,
  //       {
  //         prompt: `${name}: ${description}`,
  //         n: 1,
  //         size: "1024x1024",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${apiKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.data?.data?.[0]?.url) {
  //       setImageURL(response.data.data[0].url);
  //       alert("Image generated successfully!");
  //     } else {
  //       alert("No image generated.");
  //     }
  //   } catch (error) {
  //     console.error("Error generating image:", error.response?.data || error.message);
  //     alert("Failed to generate image. Check the console for details.");
  //   }
  // };///////////////////////////////////////////////////////////////////////API ADD

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePartitionsItemChange = (itemValue) => {
    setSelectedNumPartitions(itemValue);
    setPartitionsVisible(false);
  };

  const handleGenderItemChange = (itemValue) => {
    setSelectedGender(itemValue);
    setGenderVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.flexContainer} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Create New Event</Text>

            <Text style={styles.label}>Name Of The Event:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Event Description:</Text>
            <TextInput
              editable
              multiline
              numberOfLines={10}
              maxLength={200}
              onChangeText={setDescription}
              style={styles.inputMultiline}
              placeholder="Enter Event Description"
              value={description}
            />

            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text>{dayjs(date).format("YYYY-MM-DD")}</Text>
            </TouchableOpacity>

            {isDatePickerVisible && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.label}>Number Of Partitions:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setPartitionsVisible(true)}
            >
              <Text>
                {selectedNumPartitions ? selectedNumPartitions : "Select Number"}
              </Text>
            </TouchableOpacity>

            {isPartitionsVisible && (
              <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={() => setPartitionsVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedNumPartitions}
                      onValueChange={handlePartitionsItemChange}
                    >
                      <Picker.Item label="Any" value="any" />
                      {Array.from({ length: 100 }, (_, i) => (
                        <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                      ))}
                    </Picker>
                    <Button title="Close" onPress={() => setPartitionsVisible(false)} />
                  </View>
                </View>
              </Modal>
              
            )}


<Text style={styles.label}>Select Gender:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setGenderVisible(true)}
            >
              <Text>
                {selectedGender ? selectedGender : "Select Gender"}
              </Text>
            </TouchableOpacity>

            {isGenderVisible && (
              <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={() => setGenderVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedGender}
                      onValueChange={handleGenderItemChange}
                    >
                     <Picker.Item label="Any" value="Any"/>
                     <Picker.Item label="Male" value="Male"/>
                     <Picker.Item label="Female" value="Female"/>
                    </Picker>
                    <Button title="Close" onPress={() => setGenderVisible(false)} />
                  </View>
                </View>
              </Modal>
              
            )}
            
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputMultiline: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
});

export default AddNewEventScreen;
