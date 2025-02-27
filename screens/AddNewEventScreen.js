import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Picker } from "@react-native-picker/picker";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import HobbiesPicker from "../components/HobbiesPicker";

const AddNewEventScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedNumPartitions, setSelectedNumPartitions] = useState();
  const [isPartitionsVisible, setPartitionsVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState();
  const [isGenderVisible, setGenderVisible] = useState(false);
  const [ages, setAges] = useState({ values: [18, 35] });
  const [language, setLanguage]=useState("");

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

  const multiSliderValuesChange = (values) => {
    setAges({ values });
  };

  const handleSubmit = () => {
    const eventData = {
      name,
      description,
      date,
      selectedNumPartitions,
      selectedGender,
      ageRange: ages.values,
    };
    console.log("Event Data:", eventData);
    alert("Event created successfully!");
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
              <Text>{selectedGender ? selectedGender : "Select Gender"}</Text>
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
                      <Picker.Item label="Any" value="Any" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                    <Button title="Close" onPress={() => setGenderVisible(false)} />
                  </View>
                </View>
              </Modal>
            )}

            <Text style={styles.label}>Age Range:</Text>
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[ages.values[0], ages.values[1]]}
                sliderLength={280}
                selectedStyle={{ backgroundColor: "#4285F4" }}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={100}
                step={1}
              />
              <Text style={styles.ageText}>
                {`From ${ages.values[0]} to ${ages.values[1]} years`}
              </Text>
            </View>
            <HobbiesPicker text="Pick Language Of The Partition:" array={["Hebrew","Arabic","English","Russin"]} selectedHobbies={language} setSelectedHobbies={setLanguage}/>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: { flex: 1, marginTop:16},
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
  container: { flex: 1, justifyContent: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, marginBottom: 5, color: "#333", textAlign: "left" },
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
  sliderContainer: { marginVertical: 20, alignItems: "center" },
  ageText: { marginTop: 10, fontSize: 16, color: "#333" },
  submitButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNewEventScreen;
