import React, { useState } from "react";
import {Text,StyleSheet,View,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,TouchableOpacity,ActivityIndicator} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import {PageContainer,LocationPicker,HobbiesPicker,Header,DatePicker,InputPicker,TimePicker} from "../../components";
import { GalInput, ImageGenerator } from "./components";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/styles";
import { createActivity, updateActivity } from "../../util/actions/activityAction";

const AddNewEventScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params?.name || null);
  const [description, setDescription] = useState(route.params?.description || null);
  const [date, setDate] = useState(route.params?.date ? new Date(route.params.date) : null);
  const [selectedNumPartitions, setSelectedNumPartitions] = useState(route.params?.selectedNumPartitions || 1);
  const [selectedGender, setSelectedGender] = useState(route.params?.gender || "Any");
  const [ages, setAges] = useState(route.params?.ages || [18, 35]);
  const [languages, setLanguage] = useState(route.params?.languages || "");
  const [selectedCategories, setSelectedCategories] = useState(route.params?.categories || "");
  const [time, setTime] = useState(route.params?.time ? new Date(route.params.time) : null);
  const [generatedImage, setGeneratedImage] = useState(route.params?.activityImage || null);
  const [location, setLocation] = useState(route.params?.locationObject || null);
  const [imageChanged, setImageChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const ifGoBack = route.params?.ifGoBack;

  const onInuptChange = (id, text) => {
    switch (id) {
      case "name":
        setName(text);
        break;
      case "description":
        setDescription(text);
        break;
      case "date":
        const selectedDate = new Date(text);
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          alert("The selected date has already passed.");
          setDate(null);
          return;
        }
        setDate(selectedDate);
        break;
      case "time":
        const now = new Date();
        const [hours, minutes] = text.split(":").map(Number);
        setTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes));
        break;
      case "languages":
        setLanguage(text);
        break;
      case "categories":
        setSelectedCategories(text);
        break;
      case "image":
        setGeneratedImage(text);
        setImageChanged(true);
        break;
      case "location":
        setLocation(text);
        break;
      case "gender":
        setSelectedGender(text);
        break;
      case "number_of_partitions":
        setSelectedNumPartitions(text);
        break;
      default:
        break;
    }
  };

  const multiSliderValuesChange = (values) => {
    const [newMin, newMax] = values;
    const [prevMin, prevMax] = ages;

    if (Math.abs(newMin - prevMin) === 1 || Math.abs(newMax - prevMax) === 1) {
      Haptics.selectionAsync();
    }
    setAges(values);
  };

  const resetForm = () => {
    setName(null);
    setDescription(null);
    setDate(null);
    setTime(null);
    setSelectedNumPartitions(1);
    setSelectedGender("Any");
    setAges([18, 35]);
    setLanguage("");
    setSelectedCategories("");
    setLocation(null);
    setGeneratedImage(null);
  };

  const handleSubmit = async () => {
    if (!name || !description || !date || !time || !selectedCategories || !languages || !location || !generatedImage) {
      alert("You missed something.");
      return;
    }

    const activityData = {
      name,
      description,
      date,
      time,
      selectedNumPartitions,
      selectedGender,
      ages,
      languages,
      selectedCategories,
      generatedImage,
      location,
      imageChanged,
    };

    try {
      setIsLoading(true);

      if (ifGoBack && route.params?.activityId && route.params?.chatId) {
        await updateActivity(route.params.activityId, activityData, userData.userId, route.params.chatId);
        alert("Event updated successfully!");
      } else {
        await createActivity(activityData, userData.userId);
        alert("Event created successfully!");
        resetForm();
      }

      navigation.popToTop();
    } catch (error) {
      console.error("Error handling event:", error);
      alert("An error occurred while saving the event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flexContainer} behavior="padding">
      <SafeAreaView edges={["left", "right"]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              {ifGoBack && (
                <Header
                  title={"Create New Event"}
                  onBackPress={() => {
                    navigation.goBack()
                  }}
                ></Header>
              )}
              {!ifGoBack && (
                <Text style={styles.title}>Create New Event</Text>
              )}
              <PageContainer>
                <GalInput
                  label="Name Of The Event:"
                  IconPack={MaterialCommunityIcons}
                  iconName="party-popper"
                  onInuptChange={onInuptChange}
                  value={name}
                  id="name"
                />
                <ImageGenerator 
                  selectedImage={generatedImage} 
                  onInputChange={onInuptChange} 
                />

                <GalInput
                  label="Event Description:"
                  IconPack={MaterialIcons}
                  iconName="description"
                  onInuptChange={onInuptChange}
                  styleInputContainer={styles.styleInputContainer}
                  inputOption={{
                    multiline: true,
                    numberOfLines: 10,
                    maxLength: 200,
                  }}
                  value={description}
                  id="description"
                />
                <DatePicker
                  date={date}
                  setDate={setDate}
                  label="Date:"
                  iconName="calendar"
                  IconPack={FontAwesome}
                  onInputChange={onInuptChange}
                  id="date"
                />
                
                <TimePicker
                  id="time"
                  time={time}
                  setTime={setTime}
                  label="Time:"
                  iconName="clock-circle"
                  IconPack={AntDesign}
                  onInuptChange={onInuptChange}
                />
                <LocationPicker 
                  inputChangeHandler={onInuptChange} 
                  initialLocation={location}
                />

                <InputPicker
                  label="Number Of Partitions:"
                  iconName="numeric"
                  IconPack={MaterialCommunityIcons}
                  options={Array.from({ length: 100 }, (_, i) => ({
                    label: `${i + 1}`,
                    value: i + 1,
                  }))}
                  onInuptChange={onInuptChange}
                  id="number_of_partitions"
                  selectedValue={selectedNumPartitions}
                />

                
                  <InputPicker
                    label="Gender"
                    iconName="human-male-female"
                    IconPack={MaterialCommunityIcons}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Any", value: "Any" },
                    ]}
                    onInuptChange={onInuptChange}
                    id="gender"
                    selectedValue={selectedGender}
                  />
                
                
                <Text style={styles.label}>Age Range:</Text>
                </PageContainer>
                <View style={styles.sliderContainer}>
                <Text style={styles.ageText}>
                    {`From ${ages[0]} to ${ages[1]} years`}
                  </Text>
                  <MultiSlider
                    values={[ages[0], ages[1]]}
                    sliderLength={300}
                    selectedStyle={{ backgroundColor: "#FFCA28" }}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={65}
                    step={1}
                  />
                 
                </View>
              
              
              <HobbiesPicker
                text="Pick Language Of The Partition:"
                array={[
                  "English",
                  "Spanish",
                  "French",
                  "German",
                  "Italian",
                  "Portuguese",
                  "Russian",
                  "Chinese",
                  "Japanese",
                  "Arabic",
                  "Hebrew"
                ]
                }
                selectedHobbies={languages}
                setSelectedHobbies={setLanguage}
                id="languages"
                onInuptChange={onInuptChange}
              />

              <HobbiesPicker
                selectedHobbies={selectedCategories}
                setSelectedHobbies={setSelectedCategories}
                text="Select Categories"
                array={[
                  "Reading",
                  "Traveling",
                  "Cooking",
                  "Sports",
                  "Music",
                  "Gaming",
                  "Photography",
                  "Art",
                ]}
                id="categories"
                onInuptChange={onInuptChange}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isLoading} // כדי שלא ילחצו שוב בזמן טעינה
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>

            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: { flex: 1, marginTop:16},
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
  container: { flex: 1, justifyContent: "center" },
  label: { marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: GlobalStyles.colors.textColor},
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
  ageText: { marginTop: 10, fontSize: 16, color: "#333", marginLeft:-20 },
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
  title: {
      fontSize: 32,
      textAlign: "center",
      justifyContent:'center',
      fontFamily:'bold',
      marginBottom:20,
      marginTop:20,
      letterSpacing:0.3,
      color:GlobalStyles.colors.textColor,
      flex: 1, 
    },
    styleInputContainer:{
        paddingBottom:60,
        alignItems:'flex-start'
    }
});

export default AddNewEventScreen;

