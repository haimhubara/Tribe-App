import React, { useState, useRef } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DatePicker from "../components/DatePicker";
import InputPicker from "../components/InputPicker";
import TimePicker from "../components/TimePicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Checkbox } from 'react-native-paper'; 
import { GlobalStyles } from '../constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import LocationPicker from './LocationPicker';
import { useSelector } from "react-redux";


const SIDEBAR_WIDTH = 280;

const Sidebar = ({ applyFilters }) => {
    const userData = useSelector(state => state.auth.userData);

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const sidebarPosition = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [selectedNumPartitions, setSelectedNumPartitions] = useState(1);
    const [selectedGender, setSelectedGender] = useState("Any");
    const [ages, setAges] = useState([18, 35]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages,setSelectedLanguages]=useState([]);
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [isLanguagesExpanded, setIsLanguagesExpanded] = useState(false);
    const [sort,setSort]=useState("Date");
    const [location, setLocation] = useState(userData?.location || null);

    const categories = [
        { title: 'Time Details', items: ['Date', 'Time'] },
        { title: 'Participant Details', items: ['Number of Participants', 'Gender', 'Age Range'] },
    ];

    const categoryOptions = [ 
        { label: "Reading", value: "Reading" },
        { label: "Traveling", value: "Traveling" },
        { label: "Cooking", value: "Cooking" },
        { label: "Sports", value: "Sports" },
        { label: "Music", value: "Music" },
        { label: "Gaming", value: "Gaming" },
        { label: "Photography", value: "Photography" },
        { label: "Art", value: "Art" },
    ];

    const languageOptions = [
      { label: "English", value: "English" },
      { label: "Spanish", value: "Spanish" },
      { label: "French", value: "French" },
      { label: "German", value: "German" },
      { label: "Italian", value: "Italian" },
      { label: "Portuguese", value: "Portuguese" },
      { label: "Russian", value: "Russian" },
      { label: "Chinese", value: "Chinese" },
      { label: "Japanese", value: "Japanese" },
      { label: "Arabic", value: "Arabic" },
      { label: "Hebrew", value: "Hebrew" },
  ];
  

    
    const toggleSidebar = () => {
    if (isSidebarVisible) {
        setIsAnimating(true);
        Animated.timing(sidebarPosition, {
            toValue: -SIDEBAR_WIDTH,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            setIsAnimating(false);
            setIsSidebarVisible(false); // ⬅️ רק אחרי הסיום
        });
    } else {
        setIsSidebarVisible(true); // ⬅️ קודם פותח ואז...
        setIsAnimating(true);
        Animated.timing(sidebarPosition, {
            toValue: 0,
            duration: 170,
            useNativeDriver: false,
        }).start(() => setIsAnimating(false));
    }
};


    const handleCategoryChange = (id,value) => {
      if(id==="categories"){
          if (selectedCategories.includes(value)) {
            setSelectedCategories(selectedCategories.filter(item => item !== value));
        } else {
            setSelectedCategories([...selectedCategories, value]);
        }
      }else if(id==="languages"){
        if (selectedLanguages.includes(value)) {
          setSelectedLanguages(selectedLanguages.filter(item => item !== value));
      } else {
        setSelectedLanguages([...selectedLanguages, value]);
      }
      } 
     
    };

    const parseTimeString = (timeString) => {
      if (!timeString) return null; // Handle empty time string
    
      const [hours, minutes] = timeString.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) return null; // Handle invalid format
    
      const now = new Date();
      now.setHours(hours, minutes, 0, 0); // Set hours and minutes
    
      return now;
    };

    const onInputChange = (id, text) => {
      if (id === "name") {
        setName(text);
      } else if (id === "number_of_partitions") {
        setSelectedNumPartitions(text);
      } else if (id === "description") {
        setDescription(text);
      }else if( id==="dateStart"){
        setDateStart(text);
      }else if( id==="dateEnd"){
        setDateEnd(text);
      }else if(id==="gender"){
        setSelectedGender(text)
      }else if( id==="timeStart"){
        const today = new Date();
        const [hours, minutes] = text.split(":").map(Number);
        const parsedTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
        setTimeStart(parsedTime);
      }else if( id==="timeEnd"){
        const today = new Date();
        const [hours, minutes] = text.split(":").map(Number);
        const parsedTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
        setTimeEnd(parsedTime);
      }else if(id==="numPartitions"){
        setSelectedNumPartitions(text);
      }else if(id==="gender"){
        setSelectedGender(text);
      }else if(id==="sort"){
        setSort(text);
      }else if(id==="location"){
        setLocation(text);
      }
    };

    function handleApplyClick(){
      applyFilters({
        dateStart,
        dateEnd,
        selectedNumPartitions,
        selectedGender,
        selectedCategories,
        selectedLanguages,
        ages,
        timeStart,
        timeEnd,
        sort,
        location
    });
    }
    const handleClearClick = () => {
      setDateStart(null);
      setDateEnd(null);
      setSelectedNumPartitions(1);
      setSelectedGender("Any");
      setSelectedCategories([]);
      setSelectedLanguages([]);
      setAges([18, 35]);
      setTimeStart(null);
      setTimeEnd(null);
  
      applyFilters({
          dateStart: null,
          dateEnd: null,
          selectedNumPartitions: 1,
          selectedGender: "Any",
          selectedCategories: [],
          selectedLanguages: [],
          ages: [18, 35],
          timeStart: null,
          timeEnd: null
      });
  };
  

    const renderCategoryContent = (category) => {
        switch (category.title) {
            case 'Time Details':
                return (                   
                    <View>
                        <InputPicker
                                label="Sort By:"
                                iconName="sort-ascending"
                                IconPack={MaterialCommunityIcons}
                                options={[{ label: "Date", value: "Date" }, { label: "Location", value: "Location" }]}
                                selectedValue={sort}
                                onInuptChange={onInputChange}
                                id="sort"
                                onValueChange={setSort} />
                        <LocationPicker inputChangeHandler={onInputChange}/>
                        <DatePicker label="Start From:" date={dateStart} setDate={setDateStart} iconName="calendar" IconPack={FontAwesome} onInputChange={onInputChange} id="dateStart"/>
                        <DatePicker label="End In:" date={dateEnd} setDate={setDateEnd} iconName="calendar" IconPack={FontAwesome} onInputChange={onInputChange} id="dateEnd" />
                        <View style={styles.components}>
                            <TimePicker label="Start From:" time={timeStart} setTime={setTimeStart} iconName="clockcircleo" IconPack={AntDesign} onInuptChange={onInputChange} id="timeStart"/>
                        </View>
                        <TimePicker label="End In:" time={timeEnd} setTime={setTimeEnd} iconName="clockcircleo" IconPack={AntDesign} onInuptChange={onInputChange} id="timeEnd"/>
                        
                    </View>
                );
            case 'Participant Details':
                return (
                    <View>
                        <View style={styles.components}>
                            <InputPicker
                                label="Number of Participants:"
                                iconName="numeric"
                                IconPack={MaterialCommunityIcons}
                                options={Array.from({ length: 100 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
                                selectedValue={selectedNumPartitions}
                                onInuptChange={onInputChange}
                                id="numPartitions"
                                onValueChange={setSelectedNumPartitions} />
                        </View>
                        <View style={styles.components}>
                            <InputPicker
                                label="Gender:"
                                iconName="human-male-female"
                                IconPack={MaterialCommunityIcons}
                                options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Any", value: "Any" }]}
                                selectedValue={selectedGender}
                                onInuptChange={onInputChange}
                                id="gender"
                                onValueChange={setSelectedGender} />
                        </View>
                        
                        
                        <View style={styles.components} id="categories">
                            <TouchableOpacity onPress={() => setIsCategoriesExpanded(!isCategoriesExpanded)}>
                                <Text style={styles.labelSmall}>Categories {isCategoriesExpanded ? '▲' : '▼'}</Text>
                            </TouchableOpacity>
                            {isCategoriesExpanded && categoryOptions.map(option => (
                                <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox status={selectedCategories.includes(option.value) ? 'checked' : 'unchecked'} onPress={() => handleCategoryChange("categories",option.value)} />
                                    <Text>{option.label}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.components} id="languages">
                            <TouchableOpacity onPress={() => setIsLanguagesExpanded(!isLanguagesExpanded)}>
                                <Text style={styles.labelSmall}>Languages {isLanguagesExpanded ? '▲' : '▼'}</Text>
                            </TouchableOpacity>
                            {isLanguagesExpanded && languageOptions.map(option => (
                                <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox status={selectedLanguages.includes(option.value) ? 'checked' : 'unchecked'} onPress={() => handleCategoryChange("languages",option.value)} />
                                    <Text>{option.label}</Text>
                                </View>
                            ))}
                        </View>
                        
                        <View style={styles.components}>
                            <Text style={styles.labelSmall}>Age Range:</Text>
                            <View style={styles.sliderContainer}>
                                <MultiSlider
                                    values={[ages[0], ages[1]]}
                                    sliderLength={200}
                                    selectedStyle={{ backgroundColor: "#FFCA28" }}
                                    onValuesChange={setAges}
                                    min={0}
                                    max={65}
                                    step={1}
                                />
                                <Text style={styles.labelSmall}>{`From ${ages[0]} to ${ages[1]} years`}</Text>
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
      <View style={styles.container}>


          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
                    <Ionicons name="menu" size={28} color="black" />
                </TouchableOpacity>

          <Modal transparent={true} visible={isSidebarVisible} animationType="none">
              <View style={styles.modalContainer}>
                  <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
                  <Animated.View style={[styles.sidebar, { right: sidebarPosition, width: SIDEBAR_WIDTH }]}>
                      <Text style={styles.title}>Filters</Text>
                      <ScrollView>
                          {categories.map((category, index) => (
                              <View key={index}>
                                  {renderCategoryContent(category)}
                              </View>
                          ))}
                          <TouchableOpacity
                            onPress={() => handleApplyClick("applyButton")}
                            style={[styles.applyButton]}
                        >
                            <MaterialCommunityIcons name="check" style={styles.applyButtonIcon} />
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleClearClick("applyButton")}
                            style={[styles.applyButton]}
                        >
                            <MaterialCommunityIcons name="check" style={styles.applyButtonIcon} />
                            <Text style={styles.applyButtonText}>Clear</Text>
                        </TouchableOpacity>
                      </ScrollView>
                  </Animated.View>
              </View>
          </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
    container: { },
    modalContainer: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
    overlay: { flex: 1 },
    sidebar: { marginTop: 110, height: '76%', backgroundColor: '#f9f9f9', padding: 20, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 0 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, position: 'absolute' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 20, color: '#333' },
    categoryItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    categoryItemText: { fontSize: 16, color: '#555' },
    label: { marginVertical: 10, fontFamily: '600', letterSpacing: 0.3, color: '#333', fontSize:16 },
    sliderContainer: { marginVertical: 20, alignItems: 'center' },
    ageText: { marginTop: 10, fontSize: 16, color: '#333' },
    styleInputContainer: { paddingBottom: 20, alignItems: 'flex-start' },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    components:{marginTop:40},
    labelSmall:{ 
        marginVertical: 8,
        fontFamily: 'bold',
        letterSpacing: 0.3,
        color: GlobalStyles.colors.textColor,
      },
      applyButton: {
        marginTop: 20,
        backgroundColor: "#4A90E2",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row', 
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    applyButtonIcon: {
        color: 'white',
        fontSize: 20,
    },
    menuButton: {
      padding: 10,
      //marginRight: 110,
      justifyContent:"flex-start",
      alignItems:"flex-start",
      
  },
});

export default Sidebar;