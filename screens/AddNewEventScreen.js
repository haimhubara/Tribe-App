import React, { useState } from "react";
import { GlobalStyles } from "../constants/styles";
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
import { Picker } from "@react-native-picker/picker";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import HobbiesPicker from "../components/HobbiesPicker";
import Header from "../components/Header";
import GalInput from "../components/GalInput";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PageContainer from "../components/PageContainer";
import DatePicker from "../components/DatePicker";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import InputPicker from "../components/InputPicker";

const AddNewEventScreen = ({navigation,route}) => {
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
  const [x ,setX] = useState('');

  const ifGoBack = route.params?.ifGoBack;

  // const handleDateChange = (event, selectedDate) => {
  //   setDatePickerVisible(false);
  //   if (selectedDate) {
  //     setDate(selectedDate);
  //   }
  // };

  const onInuptChange = (id,text) => {
    if(id==='name'){

    }
    else if(id === 'number_of_partitions'){
      setSelectedNumPartitions(text);
    }else if(id ==='description'){
      setDescription(text);
    }
  }


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
      <SafeAreaView
      edges={['left','right']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {ifGoBack && <Header title={"Create New Event"} onBackPress={()=>{navigation.navigate('Search')}}></Header>}
            {!ifGoBack && <Text style={styles.title}>Create New Event</Text>}
            <PageContainer>
              <GalInput
                label="Name Of The Event:"
                IconPack={MaterialCommunityIcons}
                iconName="party-popper"
                onInuptChange={onInuptChange} 
                id='name'           
              />
    
              <GalInput
                label="Event Description:"
                IconPack={MaterialIcons}
                iconName="description"
                onInuptChange={onInuptChange} 
                styleInputContainer={styles.styleInputContainer}   
                inputOption={{
                  multiline:true,
                  numberOfLines:10,
                  maxLength:200
                }}
                id='description'   
               />
           <DatePicker 
             date={date} 
             setDate={setDate}
             label="Date:"
             iconName='calendar' 
             IconPack={FontAwesome} 
             onInuptChange={onInuptChange}  
          />


            <InputPicker 
              label="Number Of Partitions:" 
              iconName="numeric" 
              IconPack={MaterialCommunityIcons}
              options={Array.from({ length: 100 }, (_, i) => ({
                label: `${i + 1}`,
                value: i + 1
              }))}
              onInuptChange={onInuptChange}
              id="number_of_partitions"
              selectedValue={selectedNumPartitions}
            />


            {isPartitionsVisible && (
            <InputPicker label="Gender" iconName="human-male-female" IconPack={MaterialCommunityIcons}
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              {label: 'Any', value: 'Any'}
            ]}
            onInuptChange={onInuptChange}
            id="gender"
          />
             )}

           
        
            <Text style={styles.label}>Age Range:</Text>
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[ages.values[0], ages.values[1]]}
                sliderLength={280}
                selectedStyle={{ backgroundColor: "#FFCA28" }}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={65}
                step={1}
              />
              <Text style={styles.ageText}>
                {`From ${ages.values[0]} to ${ages.values[1]} years`}
              </Text>
            </View>
            </PageContainer>
            <HobbiesPicker text="Pick Language Of The Partition:" array={["Hebrew","Arabic","English","Russin"]} selectedHobbies={language} setSelectedHobbies={setLanguage}/>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
