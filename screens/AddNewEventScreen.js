import React, { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import {Text,StyleSheet,View,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,TouchableOpacity} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import HobbiesPicker from "../components/HobbiesPicker";
import Header from "../components/Header";
import GalInput from "../components/GalInput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PageContainer from "../components/PageContainer";
import DatePicker from "../components/DatePicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputPicker from "../components/InputPicker";
import TimePicker from "../components/TimePicker";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  doc, updateDoc, addDoc,getDoc, collection,arrayUnion } from "firebase/firestore"; 
import firebaseConfig from "../util/firebaseConfig.json";
import ImageGenerator from "../components/imagesAndVideo/ImageGenerator";
import { uploadImageToCloudinary,deleteImageFromCloudinary } from "../components/Cloudinary";
import { useSelector } from "react-redux";





const AddNewEventScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params?.name||null );
  const [description, setDescription] = useState(route.params?.description ||null);
  const [date, setDate] = useState(route.params?.date ? new Date(route.params.date) : null);
  const [selectedNumPartitions, setSelectedNumPartitions] = useState(route.params?.selectedNumPartitions||1);
  const [isPartitionsVisible, setPartitionsVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(route.params?.gender||"Any");
  const [ages, setAges] = useState(route.params?.ages|| [18, 35] );
  const [languages, setLanguage] = useState(route.params?.languages||"");
  const [selectedCategories, setSelectedCategories] = useState(route.params?.categories||"");
  const [time, setTime] = useState(route.params?.time ? new Date(route.params.time) : null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(route.params?.activityImage||null);
  

  const userData = useSelector(state => state.auth.userData);

  const ifGoBack = route.params?.ifGoBack;

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const onInuptChange = (id, text) => {
    if (id === "name") {
      setName(text);
    } else if (id === "number_of_partitions") {
      setSelectedNumPartitions(text);
    } else if (id === "description") {
      setDescription(text);
    }else if( id==="date"){
      
      setDate(text);
      
    }else if(id==="gender"){
      setSelectedGender(text)
    }else if (id === "time") {
      // הוספת תאריך נוכחי כדי למנוע שגיאה
      const today = new Date();
      const [hours, minutes] = text.split(":").map(Number);
      const parsedTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
  
      setTime(parsedTime);
      hideTimePicker();
    }else if(id==="languages"){
      setLanguage(text);
    }else if(id==="categories"){
      setSelectedCategories(text);
    }else if(id==="image"){
      setGeneratedImage(text);
    }
  };

  const parseDateString = (dateString) => {
    if (!dateString) return null; // אם אין תאריך, החזר null

    const [year, month, day] = dateString.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null; // בדיקה אם קיימת שגיאה

    const parsedDate = new Date(year, month - 1, day+1); // המרת מחרוזת לתאריך (חודשים מתחילים מ-0)
    return isNaN(parsedDate.getTime()) ? null : parsedDate; // בדיקה אם התוצאה תקינה
};

  const multiSliderValuesChange = (values) => {
    setAges( values );
  };

  const defaultState = {
    name: null,
    description: null,
    date: null,
    time: null,
    selectedNumPartitions: 1,
    selectedGender: "Any",
    ages: [18, 35],
    languages: "",
    selectedCategories: "",
  };
  
  const resetForm = () => {
    setName(defaultState.name);
    setDescription(defaultState.description);
    setDate(defaultState.date);
    setTime(defaultState.time);
    setSelectedNumPartitions(defaultState.selectedNumPartitions);
    setSelectedGender(defaultState.selectedGender);
    setAges(defaultState.ages);
    setLanguage(defaultState.languages);
    setSelectedCategories(defaultState.selectedCategories);
  };
 

const handleSubmit = async () => {
    if (name == null || description == null || date == null || time == null) {
        alert("You Missed Something");
        return;
    } else if ((selectedCategories == "") || (languages == "")) {
        alert("You Missed Something");
        return;
    }

    try {
        let imageUrl = null;

        if (generatedImage) {
            if (route.params?.activityId) {
                // שליפת ה-URL הישן מה-Firebase
                const docRef = doc(db, "activities", route.params.activityId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const oldImageUrl = docSnap.data().imageUrl;
                    if (oldImageUrl) {
                        // חילוץ ה-public_id מ-Cloudinary (שם הקובץ בלי הקידומת)
                        const publicId = oldImageUrl.split('/').pop().split('.')[0];
                        await deleteImageFromCloudinary(publicId);
                    }
                }
            }

            // העלאת התמונה החדשה
            imageUrl = await uploadImageToCloudinary(generatedImage);
        }

        if (route.params?.ifGoBack) {
            if (route.params?.activityId) {
                const docRef = doc(db, "activities", route.params?.activityId);
                await updateDoc(docRef, {
                    name,
                    description,
                    date: parseDateString(date).toISOString(),
                    time: time instanceof Date ? time.toISOString() : new Date().toISOString(),
                    selectedNumPartitions,
                    gender: selectedGender,
                    ageRange: ages,
                    languages,
                    categories: selectedCategories,
                    imageUrl: imageUrl,
                    userID: userData.userId,
                    
                });
                alert("Event updated successfully!");
                navigation.navigate("SearchScreen");
            } else {
                alert("Error: No activity ID provided.");
            }
        } else {
          const docRef=await addDoc(collection(db, "activities"), {
                name,
                description,
                date: parseDateString(date).toISOString(),
                time: time instanceof Date ? time.toISOString() : new Date().toISOString(),
                selectedNumPartitions,
                gender: selectedGender,
                ages,
                languages,
                categories: selectedCategories,
                imageUrl: imageUrl,
               userID: userData.userId,
               activityRequests: [],
               activityParticipants:[],
            });
            await updateDoc(docRef, {
              activityParticipants: arrayUnion(userData.userId),
            });
            alert("Event created successfully!");
            resetForm();
            navigation.navigate("Search");
        }
    } catch (e) {
        console.error("Error adding document: " + route.params?.activityId, e);
    }
};



  const hideTimePicker = () => {
    setTimePickerVisibility(false);
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
                  iconName="clockcircleo"
                  IconPack={AntDesign}
                  onInuptChange={onInuptChange}
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
                <View style={styles.sliderContainer}>
                  <MultiSlider
                    values={[ages[0], ages[1]]}
                    sliderLength={280}
                    selectedStyle={{ backgroundColor: "#FFCA28" }}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={65}
                    step={1}
                  />
                  <Text style={styles.ageText}>
                    {`From ${ages[0]} to ${ages[1]} years`}
                  </Text>
                </View>
              </PageContainer>
              
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
              >
                <Text style={styles.submitButtonText}>Submit</Text>
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
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

